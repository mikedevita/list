import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'nestjs-prisma';
import { Store, Prisma } from '@prisma/client';

@Injectable()
export class StoreService {
  constructor(private $prisma: PrismaService) {}

  async create(createStoreDto: CreateStoreDto) {
    const query: Prisma.StoreCreateArgs = {
      data: {
        name: createStoreDto.name,
      },
    };
    return await this.$prisma.store.create(query);
  }

  // Create many stores
  async createMany(createStoreDto: CreateStoreDto[]) {
    const data: Prisma.StoreCreateManyInput[] = createStoreDto.map((dto) => ({
      name: dto.name,
    }));

    return await this.$prisma.store.createMany({ data });
  }

  async findAll(): Promise<Store[]> {
    return await this.$prisma.store.findMany();
  }

  // create new async methods for find one, update, and remove
  async findOne(id: string): Promise<Store> {
    return await this.$prisma.store.findUnique({
      where: { id },
    });
  }

  // create a new async method for findManyByIds
  async findManyByIds(ids: string[]): Promise<Store[]> {
    return await this.$prisma.store.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async update(id: string, updateStoreDto: UpdateStoreDto): Promise<Store> {
    return await this.$prisma.store.update({
      where: { id },
      data: updateStoreDto,
    });
  }

  async remove(id: string): Promise<Store> {
    return await this.$prisma.store.delete({
      where: { id },
    });
  }

  // create a new async method for removeAll
  async removeAll(): Promise<Prisma.BatchPayload> {
    return await this.$prisma.store.deleteMany();
  }
}
