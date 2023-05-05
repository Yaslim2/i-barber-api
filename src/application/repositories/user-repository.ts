import { User } from '@application/entities/user/user';
import { User as RawUser } from '@prisma/client';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findById(userId: string): Promise<User | null>;
  abstract findByIdRawUser(userId: string): Promise<RawUser | null>;
  abstract findByEmail(email: string): Promise<RawUser | null>;
  abstract findAll(): Promise<User[]>;
  abstract save(user: User): Promise<void>;
}
