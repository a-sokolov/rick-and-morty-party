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
import { getCharacterStubByName } from '../../stubs/Character/stub.js';
// Utils
import { isValidCharacterName } from '../../utils/utils.js';
// CSS
import './Form.css';

function ScreensCharacterForm({ characterName }) {
  // Флаг, что читаем данные из заглушки
  const stubMode = true;
  // Интервал запроса к API в миллисекундах
  const pollInterval = 300;

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

  /*
    Добавляем "эффект" для старта/остановки опроса сервера, в зависимости
    от того, валидно ли введённое значение имени персонажа, и работаем ли
    в режиме "заглушка".
  */
  useEffect(() => {
    if (isValidCharacterName(characterName)) {
      if (stubMode) {
        // Режим "загрушка", останвливаем опрос сервера
        stopPolling();
        // Читаем данные из JSON'а
        setList(getCharacterStubByName(characterName));
      } else {
        // Имя валидно, запускаем опрос сервера по заданному интервалу
        startPolling(pollInterval);
      }
    } else {
      // Имя не валидно, останавливаем опрос сервера
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

ScreensCharacterForm.propTypes = {
  characterName: PropTypes.string.isRequired
};

export default ScreensCharacterForm;
