export function isValidCharacterName(name: string | null) {
  return (!!name && name.length > 2);
}

export function removeItemsFromCollection<T extends object>(
    list: Array<T>,
    toRemove: Array<T>,
    equals: (a: T, b: T) => boolean
  ): Array<T> {
  return list.slice().filter(a => {
    const toRemoveItem = toRemove.find(b => {
      return equals(a, b);
    });
    return !toRemoveItem;
  });
}
