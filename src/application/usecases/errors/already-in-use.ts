import { formatField } from '@helpers/format-field';
import { UnprocessableEntityException } from '@nestjs/common';

export class AlreadyInUse extends UnprocessableEntityException {
  constructor(field: string) {
    super(`${formatField(field)} already in use`);
  }
}
