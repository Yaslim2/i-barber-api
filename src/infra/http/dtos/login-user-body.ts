import { PasswordValidation } from '@helpers/password-validation';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserBody {
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
}
