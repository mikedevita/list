import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot(), // add PrismaModule.forRoot() to the imports array
  ],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
