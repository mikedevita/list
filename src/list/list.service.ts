import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'nestjs-prisma';
import { List, Prisma } from '@prisma/client';

@Injectable()
export class ListService {
  constructor(private $prisma: PrismaService) {}

  async create(createListDto: CreateListDto) {
    return await this.$prisma.list.create({
      data: {
        title: createListDto.title,
      },
    });
  }

  async findAll(): Promise<List[]> {
    return await this.$prisma.list.findMany();
  }

  // create new async methods for find one, update, and remove
  async findOne(id: string): Promise<List> {
    return await this.$prisma.list.findUnique({
      where: { id },
    });
  }

  // create a new async method for findManyByIds
  async findManyByIds(ids: string[]): Promise<List[]> {
    return await this.$prisma.list.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async update(id: string, updateListDto: UpdateListDto): Promise<List> {
    return await this.$prisma.list.update({
      where: { id },
      data: updateListDto,
    });
  }

  async remove(id: string): Promise<List> {
    return await this.$prisma.list.delete({
      where: { id },
    });
  }

  // create a new async method for removeAll
  async removeAll(): Promise<Prisma.BatchPayload> {
    return await this.$prisma.list.deleteMany();
  }
}
