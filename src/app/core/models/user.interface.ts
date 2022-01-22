export interface User {
  _id?: string;
  sFirstName?: string;
  sLastName?: string;
  sEmail?: string;
  sPassword?: string;
  dCreated?: Date;
  aGroupIDs: string[];
  aListsIDs: string[];
}
