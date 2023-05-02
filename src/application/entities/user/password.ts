import { passwordValidation } from '@helpers/password-validation';

export class Password {
  private readonly password: string;

  constructor(password: string) {
    const isPasswordValid = passwordValidation(password);

    if (!isPasswordValid) {
      throw new Error('Password Invalid');
    }
    this.password = password;
  }

  get value(): string {
    return this.password;
  }
}
