import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'nestjs-prisma';
import { Item, Prisma } from '@prisma/client';

@Injectable()
export class ItemService {
  constructor(private $prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    const query: Prisma.ItemCreateArgs = {
      data: {
        name: createItemDto.name,
        estimatedPrice: createItemDto.estimatedPrice,
        actualPrice: createItemDto.actualPrice,
        lastChecked: createItemDto.lastChecked,
        list: {
          connect: {
            id: createItemDto.listId,
          },
        },
        stores: (createItemDto.storeId || createItemDto.store) && {
          connectOrCreate: {
            where: {
              id: createItemDto.storeId,
            },
            create: {
              name: createItemDto.store?.name,
            },
          },
        },
      },
    };

    return await this.$prisma.item.create(query);
  }

  async findAll(): Promise<Item[]> {
    return await this.$prisma.item.findMany({
      include: {
        stores: true,
      },
    });
  }

  // create new async methods for find one, update, and remove
  async findOne(id: string): Promise<Item> {
    return await this.$prisma.item.findUnique({
      where: { id },
    });
  }

  // create a new async method for findManyByIds
  async findManyByIds(ids: string[]): Promise<Item[]> {
    return await this.$prisma.item.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const query: Prisma.ItemUpdateArgs = {
      where: { id },
      data: {
        name: updateItemDto.name,
        estimatedPrice: updateItemDto.estimatedPrice,
        actualPrice: updateItemDto.actualPrice,
        lastChecked: updateItemDto.lastChecked,
        stores: (updateItemDto.storeId || updateItemDto.store) && {
          connectOrCreate: {
            where: {
              id: updateItemDto.storeId,
            },
            create: {
              name: updateItemDto.store?.name,
            },
          },
        },
      },
    };

    return await this.$prisma.item.update(query);
  }

  async remove(id: string): Promise<Item> {
    return await this.$prisma.item.delete({
      where: { id },
    });
  }

  // create a new async method for removeAll
  async removeAll(): Promise<Prisma.BatchPayload> {
    return await this.$prisma.item.deleteMany();
  }
}
