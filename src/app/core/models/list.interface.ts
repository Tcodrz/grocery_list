import { Item } from 'src/app/core/models/item.interface';
export interface List {
  _id?: string;
  sName: string;
  items: Item[];
  dCreated?: Date;
}
