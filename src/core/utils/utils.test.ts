import { isValidCharacterName, removeItemsFromCollection } from './utils';

test('validate character name', () => {
  expect(isValidCharacterName(null)).toBe(false);
  expect(isValidCharacterName('')).toBe(false);
  expect(isValidCharacterName('RI')).toBe(false);
  expect(isValidCharacterName('RIC')).toBe(true);
});

test('remove items from collection', () => {
  interface ITestCollectionItem {
    id: number,
    name: string
  }

  let originList = <Array<ITestCollectionItem>>[];
  for(let i: number = 0; i < 3; i++) {
    originList[i] = {
      id: i,
      name: `Item ${i}`
    };
  }

  const prohibitedList1: [ITestCollectionItem] = [
    {
      id: 1,
      name: "Item 1"
    }
  ];

  const prohibitedList2: [ITestCollectionItem] = [
    {
      id: 4,
      name: "Item 4"
    }
  ];

  const equals = function(a: ITestCollectionItem, b: ITestCollectionItem) {
    return (a.id === b.id);
  };

  expect(originList.length).toBe(3);
  expect(removeItemsFromCollection(originList, prohibitedList1, equals)
                      .length).toBe(2);
  expect(removeItemsFromCollection(originList, prohibitedList2, equals)
                      .length).toBe(3);
  expect(removeItemsFromCollection(originList, originList, equals)
                      .length).toBe(0);
});
