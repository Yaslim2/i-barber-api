import { User } from '@application/entities/user/user';
import { UserRepository } from '@application/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(userId: string): Promise<User | null> {
    const user: User | undefined = this.users.find((item) => {
      return item.id === userId;
    });
    return user ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user: User | undefined = this.users.find((item) => {
      return item.email.value === email;
    });
    return user ?? null;
  }

  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex((item) => item.id === user.id);

    if (userIndex !== -1) {
      this.users[userIndex] = user;
    }
  }
}
