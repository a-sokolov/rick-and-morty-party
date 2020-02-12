import React, { useContext, useState, useEffect } from 'react';
// GraphQL
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
// Context
import { ContextCharacterName } from '../../context/Character/Name.js';
// Application components
import CharacterCard from '../../components/Character/Card';
import CharacterParty from '../../components/Character/Party.js';
// JSON stubs for offline mode
import characterStub from '../../stubs/Character/Stub.js';

// Картинка-заглушка
const skeleton = require('../../images/skeleton.jpeg');

function CharacterForm() {
  // Флаг, что читаем данные из заглушки
  const stubMode = true;
  // Интервал запроса к API в миллисекундах
  const pollInterval = 1000;
  // Читаем имя персонажа из контекста
  const characterName = useContext(ContextCharacterName);
  const isValidCharacterName = (name) => {
    return (name && name.length > 2);
  };

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

    const newList = list.slice().filter(item => {
      const prohibitedItem = prohibitedList.find(el => {
        return (el.image === item.image);
      });
      return !prohibitedItem;
    });

    return newList.slice(0, 6);
  };

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
  const { loading, error, startPolling, stopPolling } = useQuery(GET_CHARACTERS_QUERY, {
      variables: { characterName },
      skip: !isValidCharacterName(characterName) || stubMode,
      pollInterval: pollInterval,
      onCompleted: setCharactersList,
  });

  useEffect(() => {
    if (isValidCharacterName(characterName)) {
      if (stubMode) {
        stopPolling();
        setList(characterStub(characterName));
      } else {
        // Имя валидно, запускаем чтение данных с интервалом 300мс
        startPolling(pollInterval);
      };
    } else {
      // Имя не валидно, останавливаем чтение данных
      stopPolling();
      // Сбрасываем текущий результат
      setList([]);
    }
  }, [characterName, startPolling, stopPolling, stubMode]);

  // Отображаем прогресс
  if (loading) return <CircularProgress />;
  // Отображаем ошибку
  if (error) return <p>Error while loading data.</p>;

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
      <CharacterParty
        rick={rick}
        morty={morty}
        skeleton={skeleton}
      />
    </div>
  );
}

export default CharacterForm;
