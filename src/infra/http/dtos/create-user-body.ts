import { FullnameValidation } from '@helpers/fullname-validation';
import { PasswordValidation } from '@helpers/password-validation';
import { UrlValidation } from '@helpers/url-validation';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty({ message: 'O campo | email | não deve estar vazio' })
  @IsEmail({}, { message: 'Preencha o campo | email | com um email válido' })
  email: string;

  @PasswordValidation('', {
    message:
      'Mínimo 8 caracteres, máximo de 30 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número, 1 caractere especial',
  })
  @IsNotEmpty({ message: 'O campo | senha | não deve estar vazio' })
  @IsString({
    message: 'Preencha o campo | senha | apenas com texto',
  })
  password: string;

  @PasswordValidation('', {
    message:
      'Mínimo 8 caracteres, máximo de 30 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número, 1 caractere especial',
  })
  @IsNotEmpty({
    message: 'O campo | confirmação de senha | não deve estar vazio',
  })
  @IsString({
    message: 'Preencha o campo | confirmação de senha | apenas com texto',
  })
  passwordConfirmation: string;

  @FullnameValidation('', {
    message: 'Preencha o campo | nome completo | corretamente',
  })
  @IsNotEmpty({ message: 'O campo | nome completo | não deve estar vazio' })
  @IsString({
    message: 'Preencha o campo | nome completo | apenas com texto',
  })
  @Length(1, 50, {
    message: 'O campo | nome completo | deve estar entre 1 e 50 caracteres',
  })
  fullname: string;

  @UrlValidation('', {
    message: 'Preencha o campo | url | com uma url válida',
  })
  @IsString({ message: 'Preencha o campo | url | apenas com texto' })
  @IsOptional()
  imageUrl: string;
}
