import React, { useState, useEffect } from 'react';
// Application components
import CharacterCard from './Card';
import CharacterParty from './Party';
// Utils
import { removeItemsFromCollection } from '../../utils/utils';
// Enteties
import { ICard } from '../../enteties/Character/Card';
// Картинка-заглушка
const skeleton = require('../../images/skeleton.jpeg');

interface ICharacterBoard {
  list: ICard[]
}

function CharacterBoard({
      list
    }: ICharacterBoard) {
  // Карточки указанных Рика и Морти
  const [rickImage, setRickImage] = useState<string>(skeleton);
  const [mortyImage, setMortyImage] = useState<string>(skeleton);
  // Коллекция карточек, которые отображаем на экране
  const [listToDisplay, setListToDisplay] = useState<Array<ICard>>([]);
  // Коллекция удаленных карточек персонажей, которые больше не показываем
  const [prohibitedList, setProhibitedList] = useState<Array<ICard>>([]);

  useEffect(() => {
    // Готовим список, удаляем отмеченные карточки и "нарезаем" до 6-ти элементов.
    setListToDisplay(removeItemsFromCollection(list, prohibitedList,
                       function(a: ICard, b: ICard) {
                         return (a.image === b.image);
                       }).slice(0, 6));
  }, [list, prohibitedList]);

  // Если выбрали карточку
  const handleSelectCardByItem = (item: ICard) => {
    if (item.name.toLowerCase().indexOf('rick') >= 0) {
      setRickImage(item.image);
    } else if (item.name.toLowerCase().indexOf('morty') >= 0) {
      setMortyImage(item.image);
    }
    console.log(`Selected card ${item.image}`);
  };

  // Если нажали на удаление карточки
  const handleDeleteCardByItem = (item: ICard) => {
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

export default CharacterBoard;
