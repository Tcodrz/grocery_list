import { Item } from 'src/app/core/models/item.interface';
export interface List {
  id?: string;
  _id?: string;
  sName: string;
  items: Item[];
  dCreated?: Date;
  bIsPublic?: boolean;
  aUserIDs: string[];
}
