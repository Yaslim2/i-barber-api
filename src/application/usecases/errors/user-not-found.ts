import { formatField } from '@helpers/format-field';
import { NotFoundException } from '@nestjs/common';

export class NotFound extends NotFoundException {
  constructor(field: string) {
    super(`${formatField(field)} not found.`);
  }
}
