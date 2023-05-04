import * as bcrypt from 'bcryptjs';
import { PasswordHash } from './password-hash';
describe('Password', () => {
  it('should be able to create a password hash', () => {
    const password = 'senha123';
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    const hashPassword = new PasswordHash(hash);
    expect(hashPassword).toBeTruthy();
  });

  it('should not be able to create a password hash invalid', () => {
    const password = 'senha123';
    expect(() => {
      new PasswordHash(password);
    }).toThrow();
  });
});
