export interface Item {
  _id?: string;
  id?: string;
  sName: string;
  iAmount: number;
  sListID: string;
  bChecked: boolean;
  sUnit?: string;
  sComment?: string;
  dCreated: number;
  links: string[];
  image: Image;
}

export interface Image {
  bucket: string;
  url: string;
  type: string;
  path: string;
  name: string;
  timeCreated: Date;
  updated: Date;
}
