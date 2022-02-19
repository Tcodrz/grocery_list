import { SortOptions } from 'src/app/core/models/sort-options.enum';
import { List } from "../core/models/list.interface";

export function addItemToList<T>(list: T[], item: T): T[] { return [...list, item]; }
export function removeItemsFromList<T>(list: T[], items: T[]): T[] { return list.filter(i => !items.includes(i)); }
export function sortItemsInit(lists: List[]): List[] {
  return lists.map(list => {
    const items = [...list.items];
    return {
      ...list,
      items: items
        .sort((a, b) => a.dCreated > b.dCreated ? 1 : -1)
        .sort((a, b) => a.bChecked ? 1 : -1)
    }
  })
}
export function updateList(lists: List[], list: List): List[] {
  return lists.map(l => l.id === list.id ? list : l)
}
export function sortItems(lists: List[], listID: string, option: SortOptions): List[] {
  const list = lists.find(list => list.id === listID);
  if (!list) return lists;
  const items = [...list.items];
  switch (option) {
    case SortOptions.NewFirst:
      items.sort((a, b) => a.dCreated < b.dCreated ? 1 : -1);
      break;
    case SortOptions.OldestFirst:
      items.sort((a, b) => a.dCreated > b.dCreated ? 1 : -1);
      break;
    case SortOptions.CheckedFirst:
      items.sort((a, b) => !a.bChecked ? 1 : -1);
      break;
    case SortOptions.CheckedLast:
      items.sort((a, b) => !a.bChecked ? -1 : 1);
      break;
    default: debugger; // should not occur
  }
  const newLists = updateList(lists, { ...list, items });
  return newLists;
}
