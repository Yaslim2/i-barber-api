import { PhoneNumber } from './phone-number';

describe('Password', () => {
  it('should be able to create a phone number', () => {
    const password = new PhoneNumber('+5585992537717');
    expect(password).toBeTruthy();
  });

  it('should not be able to create a phone number from a country that is not from Brazil', () => {
    expect(() => {
      new PhoneNumber('+12543234489');
    }).toThrow();
  });

  it('should not be able to create a phone number with invalid content', () => {
    expect(() => {
      new PhoneNumber('12345');
    }).toThrow();
  });
});
