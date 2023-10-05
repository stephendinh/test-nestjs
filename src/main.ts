import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfigs } from '@core/configs/swagger.config';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  swaggerConfigs(app, configService);

  app.useLogger(app.get(Logger));

  await app.listen(port);
}
bootstrap();
