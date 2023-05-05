import { randomUUID } from 'crypto';
import { Replace } from '@helpers/Replace';

export interface RefreshTokenProps {
  token: string;
  expiresAt: Date;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class RefreshToken {
  private _id: string;
  private props: RefreshTokenProps;

  constructor(
    props: Replace<RefreshTokenProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get token(): string {
    return this.props.token;
  }

  public get expiresAt(): Date {
    return this.expiresAt;
  }

  public get userId(): number {
    return this.userId;
  }

  public get createdAt(): Date {
    return this.createdAt;
  }

  public get updatedAt(): Date {
    return this.updatedAt;
  }
}
