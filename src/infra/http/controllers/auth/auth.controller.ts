import {
  Body,
  Controller,
  HttpCode,
  Post,
  Response,
  Get,
  Request,
  Param,
} from '@nestjs/common';
import { UserViewModel } from '@infra/http/view-models/user-view-model';
import { Login } from '@application/usecases/auth/login';
import { LoginUserBody } from '@infra/http/dtos/login-user-body';
import {
  Response as ResponseExpress,
  Request as RequestExpress,
} from 'express';
import { SendSms } from '@application/usecases/sms/send-sms';
import { randomVerificationCode } from '@helpers/random-verification-code';
// import { smsVerificationText } from '@helpers/sms-verification-text';
import { SmsVerificationBody } from '@infra/http/dtos/sms-verification-body';
import { Unauthorized } from '@application/usecases/errors/unauthorized';
import { SendMail } from '@application/usecases/email/send-email';
import { EmailVerificationBody } from '@infra/http/dtos/email-verification-body';
import * as momentTimezone from 'moment-timezone';
import { checkCode } from '@helpers/check-verification-code';
import { expirationCodeTimestamp } from '@helpers/expiration-code-timestamp';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly login: Login,
    private readonly sendSms: SendSms,
    private readonly sendEmail: SendMail,
  ) {}

  @Post('/login')
  async loginUser(
    @Body() { email, password }: LoginUserBody,
    @Response() res: ResponseExpress,
  ) {
    const { user, accessToken, refreshToken } = await this.login.execute({
      email,
      password,
    });
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });
    return res.status(201).send({
      user: UserViewModel.toHTTP(user),
    });
  }

  @HttpCode(204)
  @Post('/logout')
  async logoutUser(@Response() res: ResponseExpress) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.status(204).send();
  }

  @Post('send-sms-verification')
  async sendSmsVerification(
    @Response() res: ResponseExpress,
    @Body() { phoneNumber }: SmsVerificationBody,
  ) {
    const verificationCode = randomVerificationCode();
    // await this.sendSms.execute(
    //   process.env.TWILIO_PHONE_NUMBER_AUTHENTICATED,
    //   smsVerificationText(verificationCode),
    // );
    console.warn('The sms should have been sent to that number', phoneNumber, {
      verificationCode,
    });
    res.clearCookie('verification_sms_code');
    res.clearCookie('verification_sms_code_expiration');
    res.cookie('verification_sms_code', verificationCode, { httpOnly: true });
    res.cookie('verification_sms_code_expiration', expirationCodeTimestamp);
    return res.status(204).send();
  }

  @Post('send-email-verification')
  async sendEmailVerification(
    @Response() res: ResponseExpress,
    @Body() { email }: EmailVerificationBody,
  ) {
    const verificationCode = randomVerificationCode();
    await this.sendEmail.execute({
      to: email,
      context: { verificationCode },
      subject: 'Confirmação de E-mail | iBarber',
      template: 'verification-email',
    });
    res.clearCookie('verification_email_code');
    res.clearCookie('verification_email_code_expiration');
    res.cookie('verification_email_code', verificationCode, { httpOnly: true });
    res.cookie('verification_email_code_expiration', expirationCodeTimestamp);
    return res.status(204).send();
  }

  @Post('send-forgot-password-email')
  async sendForgotPasswordEmail(
    @Response() res: ResponseExpress,
    @Body() { email }: EmailVerificationBody,
  ) {
    const verificationCode = randomVerificationCode();
    const date = momentTimezone().tz('America/Sao_Paulo').format('DD/MM/YYYY');
    const time = momentTimezone().tz('America/Sao_Paulo').format('HH:mm:ss');
    await this.sendEmail.execute({
      to: email,
      context: { verificationCode, date, time },
      subject: 'Redefinição de Senha | iBarber',
      template: 'forgot-password',
    });
    res.clearCookie('forgot_password_email_code');
    res.clearCookie('forgot_password_email_code_expiration');
    res.cookie('forgot_password_email_code', verificationCode, {
      httpOnly: true,
    });
    res.cookie(
      'forgot_password_email_code_expiration',
      expirationCodeTimestamp,
    );
    return res.status(204).send();
  }

  @Post('send-redefine-phone-number-email')
  async sendRedefinePhoneNumberEmail(
    @Response() res: ResponseExpress,
    @Body() { email }: EmailVerificationBody,
  ) {
    const verificationCode = randomVerificationCode();
    const date = momentTimezone().tz('America/Sao_Paulo').format('DD/MM/YYYY');
    const time = momentTimezone().tz('America/Sao_Paulo').format('HH:mm:ss');
    await this.sendEmail.execute({
      to: email,
      context: { verificationCode, date, time },
      subject: 'Redefinição de Número de Telefone | iBarber',
      template: 'redefine-phone-number',
    });
    res.clearCookie('redefine-phone-number_code');
    res.clearCookie('redefine-phone-number_code_expiration');
    res.cookie('redefine-phone-number_code', verificationCode, {
      httpOnly: true,
    });
    res.cookie(
      'redefine-phone-number_code_expiration',
      expirationCodeTimestamp,
    );
    return res.status(204).send();
  }

  @Post('send-forgot-password-sms')
  async sendForgotPasswordSms(
    @Response() res: ResponseExpress,
    @Body() { phoneNumber }: SmsVerificationBody,
  ) {
    const verificationCode = randomVerificationCode();
    // await this.sendSms.execute(
    //   process.env.TWILIO_PHONE_NUMBER_AUTHENTICATED,
    //   smsForgotPasswordText(verificationCode),
    // );
    console.warn('The sms should have been sent to that number', phoneNumber, {
      verificationCode,
    });
    res.clearCookie('forgot_password_sms_code');
    res.clearCookie('forgot_password_sms_code_expiration');
    res.cookie('forgot_password_sms_code', verificationCode, {
      httpOnly: true,
    });
    res.cookie('forgot_password_sms_code_expiration', expirationCodeTimestamp);
    return res.status(204).send();
  }

  @Get('check-verification-sms-code/:code')
  async checkVerificationCode(
    @Response() res: ResponseExpress,
    @Request() req: RequestExpress,
    @Param('code') code: string,
  ) {
    const isCodeValid = await checkCode({
      req,
      receivedCode: code,
      codeToCheck: 'verification_sms_code',
      res,
    });
    if (isCodeValid) {
      return res
        .status(200)
        .send({ message: 'Verification complete successfully' });
    } else {
      throw new Unauthorized();
    }
  }

  @Get('check-verification-email-code/:code')
  async checkVerificationEmailCode(
    @Response() res: ResponseExpress,
    @Request() req: RequestExpress,
    @Param('code') code: string,
  ) {
    const isCodeValid = await checkCode({
      req,
      receivedCode: code,
      codeToCheck: 'verification_email_code',
      res,
    });
    if (isCodeValid) {
      return res
        .status(200)
        .send({ message: 'Verification complete successfully' });
    } else {
      throw new Unauthorized();
    }
  }
}
