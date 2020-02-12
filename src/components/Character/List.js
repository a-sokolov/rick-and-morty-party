import React, { useState } from 'react';
// Application components
import CharacterCard from '../../components/Character/Card';
import CharacterParty from '../../components/Character/Party.js';

function CharacterList(list) {
  // Карточки указанных Рика и Морти
  const [rick, setRick] = useState(skeleton);
  const [morty, setMorty] = useState(skeleton);
  // Коллекция удаленных карточек персонажей, которые больше не показываем
  const [prohibitedList, setProhibitedList] = useState([]);

  // Если выбрали карточку
  const handleSelectCardById = (id) => {
    list.map(item => {
      if (item.id === id) {
        if (item.name.toLowerCase().indexOf('rick') >= 0) {
          setRick(item.image);
        } else if (item.name.toLowerCase().indexOf('morty') >= 0) {
          setMorty(item.image);
        }
      }
      return item;
    });

    console.log(`Selected card with id ${id}`);
  };

  // Если нажали на удаление карточки
  const handleDeleteCardById = (id) => {
    // Добавляем карточку в список запрещенных элементов
    list.map(item => {
        if (item.id === id) {
          setProhibitedList([...prohibitedList, item]);
        }
        return item;
    });

    console.log(`Deleted card with id ${id}`);
  };

  return (
    <div className="Characters">
      {
        list.length > 0 ?
          (
            <div className="CharactersList">
              {
                list.map(({ id, name, image }) => (
                  <CharacterCard
                    key={id}
                    id={id}
                    name={name}
                    image={image}
                    onSelect={ handleSelectCardById }
                    onDelete={ handleDeleteCardById }
                  />
                ))
              }
            </div>
          ) : <p>No data found.</p>
        }
      <br/><p><b>PARTY</b></p>
      <CharacterParty
        rick={rick}
        morty={morty}
        skeleton={skeleton}
      />
    </div>
  );
};

export default CharacterList;
