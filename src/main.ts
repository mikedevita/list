import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new LoggerService('Bootstrap');
  const app = await NestFactory.create(AppModule, { logger });

  const config = app.get(ConfigService);

  const apiHost: string = config.get<string>('API_HOST') || 'localhost';
  const apiPort: number = config.get<number>('API_PORT') || 3000;
  const apiPrefix: string = config.get<string>('API_PREFIX');

  app.setGlobalPrefix(apiPrefix);

  await app.listen(apiPort, apiHost);

  logger.debug(
    `API is accessible via http://${apiHost}:${apiPort}/${apiPrefix}`,
  );
}
bootstrap();
