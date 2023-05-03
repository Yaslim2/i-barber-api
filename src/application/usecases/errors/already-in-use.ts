import { formatField } from '@helpers/format-field';

export class AlreadyInUse extends Error {
  constructor(field: string) {
    super(`${formatField(field)} already in use`);
  }
}
