import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  async create(@Body() createStoreDto: CreateStoreDto) {
    return await this.storeService.create(createStoreDto);
  }

  // Create many stores
  @Post('many')
  async createMany(@Body() createStoreDto: CreateStoreDto[]) {
    return await this.storeService.createMany(createStoreDto);
  }

  @Get()
  async findAll() {
    return await this.storeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.storeService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    return await this.storeService.update(id, updateStoreDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.storeService.remove(id);
  }
}
