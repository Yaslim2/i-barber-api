import { randomUUID } from 'crypto';
import { Replace } from '@helpers/Replace';
import { Email } from './email';
import { Password } from './password';
import { Fullname } from './fullname';
import { Url } from '../url/url';
import { PasswordHash } from './password-hash';

export interface UserProps {
  email: Email;
  fullname: Fullname;
  password?: Password;
  hashPassword?: PasswordHash;
  imageUrl?: Url;
  socialId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(
    props: Replace<UserProps, { createdAt?: Date; updatedAt?: Date }>,
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

  public set email(email: Email) {
    this.props.email = email;
  }

  public get email(): Email {
    return this.props.email;
  }

  public get fullname(): Fullname {
    return this.props.fullname;
  }

  public set fullname(fullname: Fullname) {
    this.props.fullname = fullname;
  }

  public get imageUrl(): Url {
    return this.props.imageUrl;
  }

  public set imageUrl(imageUrl: Url) {
    this.props.imageUrl = imageUrl;
  }

  public get password(): Password {
    return this.props.password;
  }

  public set password(password: Password) {
    this.props.password = password;
  }

  public get socialId(): string {
    return this.props.socialId;
  }

  public set socialId(socialId: string) {
    this.props.socialId = socialId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public get hashPassword(): PasswordHash {
    return this.props.hashPassword;
  }
}
