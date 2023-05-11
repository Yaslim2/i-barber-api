import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class UpdatePhoneNumberBody {
  @IsNotEmpty({
    message: 'O campo | número de telefone | não deve estar vazio',
  })
  @IsMobilePhone('pt-BR', { strictMode: true })
  phoneNumber: string;
}
