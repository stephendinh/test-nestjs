import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Environments } from '../constants/enviroments';
export const swaggerConfigs = (
  app: INestApplication,
  configService: ConfigService,
): void => {
  const environment = configService.get<string>('ENVIRONMENT');
  if (environment !== Environments.PRODUCTION) {
    const config = new DocumentBuilder()
      .setTitle('Api document')
      .setDescription('This is a nestjs base with mongoose')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
};
