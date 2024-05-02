import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot(), // add PrismaModule.forRoot() to the imports array
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
