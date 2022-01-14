export function addItemToList<T>(list: T[], item: T): T[] { return [...list, item]; }
export function removeItemsFromList<T>(list: T[], items: T[]): T[] { return list.filter(i => !items.includes(i)); }
