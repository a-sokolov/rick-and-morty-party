import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// GraphQL
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
// Application components
import CharacterBoard from '../../components/Character/Board.js';
// JSON stubs for offline mode
import characterStub from '../../stubs/Character/Stub.js';

function CharacterForm({ characterName }) {
  // Флаг, что читаем данные из заглушки
  const stubMode = true;
  // Интервал запроса к API в миллисекундах
  const pollInterval = 1000;
  const isValidCharacterName = (name) => {
    return (name && name.length > 2);
  };

  // Текущая коллекция карточек персонажей (id, name, image)
  const [list, setList] = useState([]);
  // Функция для инициализации списка карточек по запросу
  // eslint-disable-next-line
  const setCharactersList = (data) => {
    setList(data.characters.results);
    if (data.characters.results) {
      console.log(`Total count is ${data.characters.results.length}`);
    } else {
      console.log("Set empty list");
    }
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
      }
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
  // Отображаем данные
  return <CharacterBoard list={list} />;
}
  
CharacterForm.propTypes = {
  characterName: PropTypes.string
};

export default CharacterForm;
