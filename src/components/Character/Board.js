import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Application components
import CharacterCard from './Card';
import CharacterParty from './Party.js';
// Utils
import { removeItemsFromCollection } from '../../utils/utils.js';
// Картинка-заглушка
const skeleton = require('../../images/skeleton.jpeg');

function CharacterBoard({ list }) {
  // Карточки указанных Рика и Морти
  const [rickImage, setRickImage] = useState(skeleton);
  const [mortyImage, setMortyImage] = useState(skeleton);
  // Коллекция карточек, которые отображаем на экране
  const [listToDisplay, setListToDisplay] = useState([]);
  // Коллекция удаленных карточек персонажей, которые больше не показываем
  const [prohibitedList, setProhibitedList] = useState([]);

  useEffect(() => {
    // Готовим список, удаляем отмеченные карточки и "нарезаем" до 6-ти элементов.
    setListToDisplay(removeItemsFromCollection(list, prohibitedList,
                       function(a, b) {
                         return (a.image === b.image);
                       }).slice(0, 6));
  }, [list, prohibitedList]);

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

  return (
    <div className="characters-board">
      {
        listToDisplay.length > 0 ?
          (
            <div className="characters-list">
              {
                listToDisplay.map(item => (
                  <CharacterCard
                    key={item.id}
                    item={item}
                    onSelect={ handleSelectCardByItem }
                    onDelete={ handleDeleteCardByItem }
                  />
                ))
              }
            </div>
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
    })).isRequired
};

export default CharacterBoard;
