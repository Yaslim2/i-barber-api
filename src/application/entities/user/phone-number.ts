import { isMobilePhone } from 'class-validator';

export class PhoneNumber {
  private readonly phoneNumber: string;

  constructor(phoneNumber: string) {
    const isPhoneNumberValid = isMobilePhone(phoneNumber, 'pt-BR');

    if (!isPhoneNumberValid) {
      throw new Error('Phone number invalid');
    }
    this.phoneNumber = phoneNumber;
  }

  get value(): string {
    return this.phoneNumber;
  }
}
