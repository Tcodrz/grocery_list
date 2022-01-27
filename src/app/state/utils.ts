import { List } from "../core/models/list.interface";

export function addItemToList<T>(list: T[], item: T): T[] { return [...list, item]; }
export function removeItemsFromList<T>(list: T[], items: T[]): T[] { return list.filter(i => !items.includes(i)); }
export function sortListItems(lists: List[]): List[] {
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
  return lists.map(l => l._id === list._id ? list : l)
}