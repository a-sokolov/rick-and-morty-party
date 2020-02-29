export function getCharacterStubByName(name) {
  if ('rick'.indexOf(name.toLowerCase()) >= 0) {
    return require('./json/rick.json');
  } else if ('morty'.indexOf(name.toLowerCase()) >= 0) {
    return require('./json/morty.json');
  } else if ('beth'.indexOf(name.toLowerCase()) >= 0) {
    return require('./json/beth.json');
  }
  return [];
}
