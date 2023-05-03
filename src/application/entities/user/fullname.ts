import { fullnameValidation } from '@helpers/fullname-validation';

export class Fullname {
  private readonly fullname: string;

  constructor(fullname: string) {
    const isFullnameValid = fullnameValidation(fullname);

    if (!isFullnameValid || fullname.length > 50) {
      throw new Error('Invalid Fullname');
    }
    this.fullname = fullname;
  }

  get value(): string {
    return this.fullname;
  }
}
