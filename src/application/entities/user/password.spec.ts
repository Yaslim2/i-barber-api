import { Password } from './password';

describe('Password', () => {
  it('should be able to create a password', () => {
    const password = new Password('Senha123@');
    expect(password).toBeTruthy();
  });

  it('should not be able to create a password without special characters', () => {
    expect(() => {
      new Password('Senha123');
    }).toThrow();
  });

  it('should not be able to create a password without numbers', () => {
    expect(() => {
      new Password('Senha@');
    }).toThrow();
  });

  it('should not be able to create a password without at least one capital letter', () => {
    expect(() => {
      new Password('senha123@');
    }).toThrow();
  });

  it('should not be able to create a password with less than 8 characters', () => {
    expect(() => {
      new Password('senha123@');
    }).toThrow();
  });

  it('should not be able to create a password with more than 30 characters', () => {
    expect(() => {
      new Password('Senha12345@'.repeat(3));
    }).toThrow();
  });
});
