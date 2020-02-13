export function getCharacterStubByName(characterName) {
  if ('rick'.indexOf(characterName.toLowerCase()) >= 0) {
    return require('./json/rick.json');
  } else if ('morty'.indexOf(characterName.toLowerCase()) >= 0) {
    return require('./json/morty.json');
  } else if ('beth'.indexOf(characterName.toLowerCase()) >= 0) {
    return require('./json/beth.json');
  }
  return [];
}
