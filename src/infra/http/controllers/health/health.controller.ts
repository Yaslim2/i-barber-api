import { Controller, Get, Request, Response } from '@nestjs/common';
import {
  Request as RequestExpress,
  Response as ResponseExpress,
} from 'express';
@Controller()
export class HealthController {
  @Get('/health')
  health(@Request() req: RequestExpress, @Response() res: ResponseExpress) {
    return res.json({ hello: 'world' });
  }
}
