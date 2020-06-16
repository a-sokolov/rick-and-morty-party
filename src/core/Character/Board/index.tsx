import React, {useState, useEffect} from 'react';
// Application components
import CharacterCard from '../Card';
import CharacterParty from '../Party';
// Utils
import {removeItemsFromCollection} from '../../utils';
// Entities
import {Card} from '../Card/interfaces';
import {CharacterBoardProperty} from './interfaces';
import {
  CharacterListStyled,
  PartyHeadStyled
} from './styles';
// Картинка-заглушка
const skeleton = require('./img/skeleton.jpeg');

function CharacterBoard({list}: CharacterBoardProperty) {
  // Карточки указанных Рика и Морти
  const [rickImage, setRickImage] = useState<string>(skeleton);
  const [mortyImage, setMortyImage] = useState<string>(skeleton);
  // Коллекция карточек, которые отображаем на экране
  const [listToDisplay, setListToDisplay] = useState<Array<Card>>([]);
  // Коллекция удаленных карточек персонажей, которые больше не показываем
  const [prohibitedList, setProhibitedList] = useState<Array<Card>>([]);

  useEffect(() => {
    // Готовим список, удаляем отмеченные карточки и "нарезаем" до 6-ти элементов.
    setListToDisplay(removeItemsFromCollection(list, prohibitedList,
                       function(a: Card, b: Card) {
                         return (a.image === b.image);
                       }).slice(0, 6));
  }, [list, prohibitedList]);

  // Если выбрали карточку
  const handleSelectCardByItem = (item: Card) => {
    if (item.name.toLowerCase().indexOf('rick') >= 0) {
      setRickImage(item.image);
    } else if (item.name.toLowerCase().indexOf('morty') >= 0) {
      setMortyImage(item.image);
    }
    console.log(`Selected card ${item.image}`);
  };

  // Если нажали на удаление карточки
  const handleDeleteCardByItem = (item: Card) => {
    // Добавляем карточку в список запрещенных элементов
    setProhibitedList([...prohibitedList, item]);
    console.log(`Deleted card ${item.image}`);
  };

  return (
    <>
      {
        listToDisplay.length > 0 ?
          (
            <CharacterListStyled>
                <tbody>
                  {
                    listToDisplay.map(item => (
                      <CharacterCard
                        key={item.id}
                        item={item}
                        onSelect={handleSelectCardByItem}
                        onDelete={handleDeleteCardByItem}
                      />
                    ))
                  }
                </tbody>
            </CharacterListStyled>
          ) : <p>No data found.</p>
        }
      <PartyHeadStyled>PARTY</PartyHeadStyled>
      <CharacterParty
        rick={rickImage}
        morty={mortyImage}
        skeleton={skeleton}
      />
    </>
  );
}

export default CharacterBoard;
