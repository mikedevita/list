import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ListModule } from './list/list.module';
import { LoggerService } from './logger/logger.service';
import { ItemModule } from './item/item.module';
import { StoreModule } from './store/store.module';

const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
};

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    PrismaModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'), // path to the folder with static files to serve
      serveRoot: '/public', // path where the files will be available in the browser
    }),
    ListModule,
    ItemModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
