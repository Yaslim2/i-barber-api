import { PasswordValidation } from '@helpers/password-validation';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordBody {
  @PasswordValidation('', {
    message:
      'Mínimo 8 caracteres, máximo de 30 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número, 1 caractere especial',
  })
  @IsNotEmpty({ message: 'O campo | senha | não deve estar vazio' })
  @IsString({
    message: 'Preencha o campo | senha | apenas com texto',
  })
  password: string;

  @IsNotEmpty({ message: 'O campo | tipo de validação | não deve estar vazio' })
  @IsString({
    message: 'Preencha o campo | tipo de validação | apenas com texto',
  })
  typeValidation: string;
}
