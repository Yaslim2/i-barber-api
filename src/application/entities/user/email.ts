import { isEmail } from 'class-validator';
export class Email {
  private readonly email: string;

  constructor(email: string) {
    const isEmailValid = isEmail(email);

    if (!isEmailValid) {
      throw new Error('Invalid Email');
    }
    this.email = email;
  }

  get value(): string {
    return this.email;
  }
}
