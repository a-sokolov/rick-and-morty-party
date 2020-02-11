import React, { useContext, useState, useEffect } from 'react';
// GraphQL
import { useQuery } from '@apollo/react-hooks'; // eslint-disable-line no-unused-vars
import gql from 'graphql-tag'; // eslint-disable-line no-unused-vars
// Material UI
import CircularProgress from '@material-ui/core/CircularProgress'; // eslint-disable-line no-unused-vars
// Context
import { CharacterNameContext } from './Context.js';
// Application components
import CharacterCard from './CharacterCard';
import SelectedCharacterCard from './SelectedCharacterCard.js';
// JSON stubs for offline mode
import * as rickJson from './json/rick.json';
import * as mortyJson from './json/morty.json';
import * as bethJson from './json/beth.json';

// Картинка-заглушка
const skeleton = require('./skeleton.jpeg');

function Characters() {
  // Карточки указанных Рика и Морти
  const [rick, setRick] = useState(skeleton);
  const [morty, setMorty] = useState(skeleton);
  // Текущая коллекция карточек персонажей (id, name, image)
  const [list, setList] = useState([]);
  // Коллекция удаленных карточек персонажей, которые больше не показываем
  const [prohibitedList, setProhibitedList] = useState([]);
  // Функция для инициализации списка карточек по запросу
  // eslint-disable-next-line
  const setCharactersList = (data) => {
    setList(data.characters.results);
    if (data.characters.results) {
      console.log(`Total count is ${data.characters.results.length}.`);
    } else {
      console.log("Set empty list.");
    }
  };
  /*
    Функция возвращающая список, который можно отображать.
    1. Удаляем карточки, которые были запрещены ранее;
    2. Возвращаем коллекцию, размером не больше 6 элементов.
  */
  const getCharactersList = () => {
    if (!list) {
      return [];
    }

    let newList = list.slice().filter(item => {
      const prohibitedItem = prohibitedList.find(el => {
        return (el.image === item.image);
      });
      return (prohibitedItem === undefined);
    });

    return newList.slice(0, 6);
  };

  // Читаем имя персонажа из контекста
  const characterName = useContext(CharacterNameContext);
  const validCharacterName = (characterName && characterName.length > 2);

  // Attention! Временное решение, чтобы отладить код (часть данных грузиться из JSON'а).
  useEffect(() => {
    let newList = [];
    if (validCharacterName) {
      if ('rick'.indexOf(characterName.toLowerCase()) >= 0) {
        newList = rickJson.default;
      } else if ('morty'.indexOf(characterName.toLowerCase()) >= 0) {
        newList = mortyJson.default;
      } else if ('beth'.indexOf(characterName.toLowerCase()) >= 0) {
        newList = bethJson.default;
      }
    }
    setList(newList);
  }, [validCharacterName, characterName]);

/*
  // Запрос поиска персонажей по имени
  const GET_CHARACTERS_QUERY = gql`
    query Characters($characterName: String!) {
      characters(filter: {name: $characterName }) {
        info {
          count
        }
        results {
          id,
          name,
          image
        }
      }
    }
  `;
  // Выполняем запрос
  const { loading, error } = useQuery(GET_CHARACTERS_QUERY, {
      variables: { characterName },
      skip: !validCharacterName,
      pollInterval: 300,
      onCompleted: setCharactersList,
  });

  // Сброс результата, если имя персонажа не валидно
  useEffect(() => {
    if (!validCharacterName) {
      setList([]);
    };
  }, [validCharacterName]);

  // Отображаем прогресс
  if (loading) return <CircularProgress />;
  // Отображаем ошибку
  if (error) return <p>Error while loading data.</p>;
*/
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

  // Читаем список карточек, которые можно отображать
  const listToDisplay = getCharactersList();

  return (
    <div className="Characters">
      {
        listToDisplay.length > 0 ?
          (
            <div className="CharactersList">
              {
                listToDisplay.map(({ id, name, image }) => (
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
      <div className="Party">
        <SelectedCharacterCard label="RICK" image={rick} skeleton={skeleton} />
        <SelectedCharacterCard label="MORTY" image={morty} skeleton={skeleton} />
      </div>
    </div>
  );
}

export default Characters;
