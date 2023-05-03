import { formatField } from '@helpers/format-field';

export class NotFound extends Error {
  constructor(field: string) {
    super(`${formatField(field)} not found.`);
  }
}
