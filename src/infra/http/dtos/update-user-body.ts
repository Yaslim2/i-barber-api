import { FullnameValidation } from '@helpers/fullname-validation';
import { UrlValidation } from '@helpers/url-validation';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserBody {
  @IsNotEmpty({ message: 'O campo | nome completo | não deve estar vazio' })
  @IsString({
    message: 'Preencha o campo | nome completo | apenas com texto',
  })
  @FullnameValidation('', {
    message: 'Preencha o campo | nome completo | corretamente',
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
