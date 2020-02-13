import { isValidCharacterName, removeItemsFromCollection } from './utils.js';

test('validate character name', () => {
  expect(isValidCharacterName(null)).toBe(false);
  expect(isValidCharacterName('')).toBe(false);
  expect(isValidCharacterName('RI')).toBe(false);
  expect(isValidCharacterName('RIC')).toBe(true);
  expect(isValidCharacterName(0)).toBe(false);
  expect(isValidCharacterName(1)).toBe(false);
});

test('remove items from collection', () => {
  let originList = [];
  for(let i = 0; i < 3; i++) {
    originList[i] = {
      id: i,
      name: `Item ${i}`
    };
  }

  const prohibitedList1 = [
    {
      id: 1,
      name: "Item 1"
    }
  ];

  const prohibitedList2 = [
    {
      id: 4,
      name: "Item 4"
    }
  ];

  const equals = function (a, b) {
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
