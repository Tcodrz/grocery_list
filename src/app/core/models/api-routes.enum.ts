export enum ApiRoutes {
  Lists = 'lists',
}

export enum ApiListRoutes {
  Main = 'lists',
  MarkItemsChecked = 'mark-items-checked',
  ItemsUnCheck = 'items-uncheck',
  GetAll = '',
  AddList = 'add-list',
  Load = 'load',
  DeleteList = 'list-delete'
}

export enum ApiListItemRoutes {
  Add = 'add-item',
  Remove = 'delete-item'
}
