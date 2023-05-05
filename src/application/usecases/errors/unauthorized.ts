import { UnauthorizedException } from '@nestjs/common';

export class Unauthorized extends UnauthorizedException {
  constructor() {
    super(`Unauthorized Access`);
  }
}
