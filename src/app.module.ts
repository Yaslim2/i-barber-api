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
      )
      .forRoutes('*');
  }
}
