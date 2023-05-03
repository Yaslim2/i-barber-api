import * as bcrypt from 'bcryptjs';
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, bcrypt.genSaltSync());
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
