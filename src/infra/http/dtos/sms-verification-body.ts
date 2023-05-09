import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class SmsVerificationBody {
  @IsNotEmpty({
    message: 'O campo | número de telefone | não deve estar vazio',
  })
  @IsMobilePhone('pt-BR', { strictMode: true })
  phoneNumber: string;
}
