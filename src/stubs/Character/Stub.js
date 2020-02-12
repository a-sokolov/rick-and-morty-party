import PropTypes from 'prop-types';
// JSON's
import * as rickJson from './json/rick.json';
import * as mortyJson from './json/morty.json';
import * as bethJson from './json/beth.json';

function CharacterStub(characterName) {
  if ('rick'.indexOf(characterName.toLowerCase()) >= 0) {
    return rickJson.default;
  } else if ('morty'.indexOf(characterName.toLowerCase()) >= 0) {
    return mortyJson.default;
  } else if ('beth'.indexOf(characterName.toLowerCase()) >= 0) {
    return bethJson.default;
  }
  return [];
}

CharacterStub.propTypes = {
  characterName: PropTypes.string.isRequire
};

export default CharacterStub;
