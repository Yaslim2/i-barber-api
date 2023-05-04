import { CreateUserBody } from '@infra/http/dtos/create-user-body';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUser } from '@application/usecases/user/create-user';
import { GetAllUsers } from '@application/usecases/user/get-all-users';
import { GetUser } from '@application/usecases/user/get-user';
import { UpdateUser } from '@application/usecases/user/update-user';
import { UserViewModel } from '@infra/http/view-models/user-view-model';
import { UpdateUserBody } from '@infra/http/dtos/update-user-body';
import { ValidationIdParamsPipe } from '@infra/pipes/validation-params-id.pipe';

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
    @Body() { email, fullname, imageUrl, password }: CreateUserBody,
  ) {
    const { user } = await this.createUser.execute({
      email,
      fullname,
      password,
      imageUrl,
    });
    return { user: UserViewModel.toHTTP(user) };
  }

  @Get('/all')
  async getAll() {
    const { users } = await this.getAllUsers.execute();

    return { users: users.map((item) => UserViewModel.toHTTP(item)) };
  }

  @Get('/:id')
  async getUserById(@Param('id', ValidationIdParamsPipe) id: string) {
    const { user } = await this.getUser.execute({ userId: id });

    return { user: UserViewModel.toHTTP(user) };
  }

  @HttpCode(201)
  @Patch('/:id')
  async update(
    @Param('id', ValidationIdParamsPipe) id: string,
    @Body() { fullname, imageUrl }: UpdateUserBody,
  ) {
    const { user } = await this.updateUser.execute({
      fullname,
      imageUrl,
      userId: id,
    });

    return { user: UserViewModel.toHTTP(user) };
  }
}
