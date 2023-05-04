export class PasswordHash {
  private readonly passwordHash: string;

  constructor(hash: string) {
    const isHashValid = this.isBcryptHash(hash);

    if (!isHashValid) {
      throw new Error('Hash Invalid');
    }
    this.passwordHash = hash;
  }

  isBcryptHash(hash: string): boolean {
    const bcryptRegex = /^\$2[ayb]\$.{56}$/; // Regex para hash bcrypt válido
    return bcryptRegex.test(hash);
  }

  get value(): string {
    return this.passwordHash;
  }
}
