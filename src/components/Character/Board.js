import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Application components
import CharacterList from './List.js';
import CharacterParty from './Party.js';

// Картинка-заглушка
const skeleton = require('../../images/skeleton.jpeg');

function CharacterBoard({ list }) {
  // Карточки указанных Рика и Морти
  const [rickImage, setRickImage] = useState(skeleton);
  const [mortyImage, setMortyImage] = useState(skeleton);
  // Коллекция удаленных карточек персонажей, которые больше не показываем
  const [prohibitedList, setProhibitedList] = useState([]);

  // Если выбрали карточку
  const handleSelectCardByItem = (item) => {
    if (item.name.toLowerCase().indexOf('rick') >= 0) {
      setRickImage(item.image);
    } else if (item.name.toLowerCase().indexOf('morty') >= 0) {
      setMortyImage(item.image);
    }
    console.log(`Selected card ${item.image}`);
  };

  // Если нажали на удаление карточки
  const handleDeleteCardByItem = (item) => {
    // Добавляем карточку в список запрещенных элементов
    setProhibitedList([...prohibitedList, item]);
    console.log(`Deleted card ${item.image}`);
  };

  // Готовим данные для отображения
  const listToDisplay = list.slice().filter(item => {
    const prohibitedItem = prohibitedList.find(el => {
      return (el.image === item.image);
    });
    return !prohibitedItem;
  }).slice(0, 6);

  return (
    <div className="Characters">
      {
        listToDisplay.length > 0 ?
          (
            <CharacterList
              list={listToDisplay}
              selectCardByItem={ handleSelectCardByItem }
              deleteCardByItem={ handleDeleteCardByItem }
            />
          ) : <p>No data found.</p>
        }
      <br/><p><b>PARTY</b></p>
      <CharacterParty
        rick={rickImage}
        morty={mortyImage}
        skeleton={skeleton}
      />
    </div>
  );
}

const { string } = PropTypes;

CharacterBoard.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: string.isRequired,
      name: string.isRequited,
      image: string.isRequired
    }))
};

export default CharacterBoard;
