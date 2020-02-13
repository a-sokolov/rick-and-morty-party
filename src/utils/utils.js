export function isValidCharacterName(name) {
  return (!!name && name.length > 2);
}

export function removeItemsFromCollection(list, toRemove, equals) {
  return list.slice().filter(a => {
    const toRemoveItem = toRemove.find(b => {
      return equals(a, b);
    });
    return !toRemoveItem;
  });
}
