import { List, Store } from '@prisma/client';

export class CreateItemDto {
  name: string;
  estimatedPrice: number;
  actualPrice: number;
  lastChecked: Date;
  listId: string;
  list?: List;
  storeId?: string;
  store?: Store;
}
