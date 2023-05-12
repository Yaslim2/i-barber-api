import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { JwtMiddleware } from '@infra/http/middlewares/jwt-middleware';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: '/user/create', method: RequestMethod.POST },
        { path: '/health', method: RequestMethod.GET },
        { path: '/auth/send-sms-verification', method: RequestMethod.POST },
        { path: '/auth/send-email-verification', method: RequestMethod.POST },
        {
          path: '/auth/send-forgot-password-email',
          method: RequestMethod.POST,
        },
        {
          path: '/auth/send-forgot-password-sms',
          method: RequestMethod.POST,
        },
        {
          path: '/auth/send-redefine-phone-number-email',
          method: RequestMethod.POST,
        },
        {
          path: '/auth/check-verification-code/:code',
          method: RequestMethod.GET,
        },
        {
          path: '/auth/check-verification-email-code/:code',
          method: RequestMethod.GET,
        },
      )
      .forRoutes('*');
  }
}
