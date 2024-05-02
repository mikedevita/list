import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot(), // add PrismaModule.forRoot() to the imports array
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
