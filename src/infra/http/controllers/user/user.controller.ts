import { CreateUserBody } from '@infra/http/dtos/create-user-body';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { CreateUser } from '@application/usecases/user/create-user';
import { GetAllUsers } from '@application/usecases/user/get-all-users';
import { GetUser } from '@application/usecases/user/get-user';
import { UpdateUser } from '@application/usecases/user/update-user';
import { UserViewModel } from '@infra/http/view-models/user-view-model';
import { UpdateUserBody } from '@infra/http/dtos/update-user-body';
import { UpdatePasswordBody } from '@infra/http/dtos/update-password-body';
import {
  Request as RequestExpress,
  Response as ResponseExpress,
} from 'express';
import { User } from '@application/entities/user/user';
import { checkCode } from '@helpers/check-verification-code';
import { Unauthorized } from '@application/usecases/errors/unauthorized';
import { UpdateEmailBody } from '@infra/http/dtos/update-email-body';
import { UpdatePhoneNumberBody } from '@infra/http/dtos/update-phone-number-body';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly getAllUsers: GetAllUsers,
    private readonly getUser: GetUser,
    private readonly updateUser: UpdateUser,
  ) {}

  @HttpCode(201)
  @Post('/create')
  async create(
    @Body()
    { email, fullname, imageUrl, password, phoneNumber }: CreateUserBody,
  ) {
    const { user } = await this.createUser.execute({
      email,
      fullname,
      password,
      imageUrl,
      phoneNumber,
    });
    return { user: UserViewModel.toHTTP(user) };
  }

  @Get('/all')
  async getAll() {
    const { users } = await this.getAllUsers.execute();

    return { users: users.map((item) => UserViewModel.toHTTP(item)) };
  }

  @Get()
  async getOwnUser(@Request() req: RequestExpress) {
    const user = req.user as User;
    return { user: UserViewModel.toHTTP(user) };
  }

  @HttpCode(201)
  @Patch('/update')
  async update(
    @Body() { fullname, imageUrl }: UpdateUserBody,
    @Request() req: RequestExpress,
  ) {
    const userLogged = req.user as User;
    const { user } = await this.updateUser.execute({
      fullname,
      imageUrl,
      userId: userLogged.id,
    });

    return { user: UserViewModel.toHTTP(user) };
  }

  @HttpCode(201)
  @Patch('/update-password/:code')
  async updatePassword(
    @Body() { password, typeValidation }: UpdatePasswordBody,
    @Request() req: RequestExpress,
    @Response() res: ResponseExpress,
    @Param('code') code: string,
  ) {
    const isCodeValid = checkCode({
      codeToCheck: `forgot_password_${typeValidation}_code`,
      receivedCode: code,
      req,
      res,
    });
    if (isCodeValid) {
      const userLogged = req.user as User;
      const { user } = await this.updateUser.execute({
        fullname: userLogged.fullname.value,
        imageUrl: userLogged.imageUrl.value,
        password,
        userId: userLogged.id,
      });

      return res.json({ user: UserViewModel.toHTTP(user) });
    } else {
      throw new Unauthorized();
    }
  }

  @HttpCode(201)
  @Patch('/update-email/:code')
  async updateEmail(
    @Body() { email }: UpdateEmailBody,
    @Request() req: RequestExpress,
    @Response() res: ResponseExpress,
    @Param('code') code: string,
  ) {
    const isCodeValid = checkCode({
      codeToCheck: `verification_sms_code`,
      receivedCode: code,
      req,
      res,
    });
    if (isCodeValid) {
      const userLogged = req.user as User;
      const { user } = await this.updateUser.execute({
        fullname: userLogged.fullname.value,
        imageUrl: userLogged.imageUrl.value,
        email,
        userId: userLogged.id,
      });

      return res.json({ user: UserViewModel.toHTTP(user) });
    } else {
      throw new Unauthorized();
    }
  }

  @HttpCode(201)
  @Patch('/update-phone-number/:code')
  async updatePhoneNumber(
    @Body() { phoneNumber }: UpdatePhoneNumberBody,
    @Request() req: RequestExpress,
    @Response() res: ResponseExpress,
    @Param('code') code: string,
  ) {
    const isCodeValid = checkCode({
      codeToCheck: `redefine_phone_number_code`,
      receivedCode: code,
      req,
      res,
    });
    if (isCodeValid) {
      const userLogged = req.user as User;
      const { user } = await this.updateUser.execute({
        fullname: userLogged.fullname.value,
        imageUrl: userLogged.imageUrl.value,
        phoneNumber,
        userId: userLogged.id,
      });

      return res.json({ user: UserViewModel.toHTTP(user) });
    } else {
      throw new Unauthorized();
    }
  }
}
