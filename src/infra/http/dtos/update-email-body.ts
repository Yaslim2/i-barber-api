import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateEmailBody {
  @IsNotEmpty({ message: 'O campo | email | não deve estar vazio' })
  @IsEmail({}, { message: 'Preencha o campo | email | com um email válido' })
  email: string;
}
