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
  // eslint-disable-next-line no-undef
  const stubMode = (process.env.REACT_APP_STUB_MODE === "true");
  // Интервал запроса к API в миллисекундах
  // eslint-disable-next-line no-undef
  const pollInterval = Number(process.env.REACT_APP_APOLLO_CLIENT_POLL_INTERVAL);

  // Текущая коллекция карточек персонажей (id, name, image)
  const [list, setList] = useState([]);
  // Функция для инициализации списка карточек по results запроса
  // eslint-disable-next-line
  const setQuerResultyOnCompleted = (data) => {
    if (data.characters.results) {
      setList(data.characters.results);
      console.log(`Total count is ${data.characters.results.length}`);
    } else {
      setList([]);
      console.log("Set empty list");
    }
  };

  // Запрос поиска персонажей по имени
  const GET_CHARACTERS_QUERY = gql`
    query Characters($characterName: String!) {
      characters(filter: {name: $characterName }) {
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
      onCompleted: setQuerResultyOnCompleted
  });

  /*
    Добавляем "эффект" для старта/остановки опроса сервера, в зависимости
    от того, валидно ли введённое значение имени персонажа, и работаем ли
    в режиме "заглушка".
  */
  useEffect(() => {
    if (isValidCharacterName(characterName)) {
      if (stubMode) {
        // Режим "загрушка", останавливаем опрос сервера
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
  }, [characterName, startPolling, stopPolling, pollInterval, stubMode]);

  // Отображаем прогресс
  const ShowLoading = () => {
    if (loading) {
      return <CircularProgress />;
    }

    return null;
  };

  // Отображаем ошибку
  const ShowError = () => {
    if (error) {
      return <p>Error while loading data.</p>;
    }

    return null;
  };

  // Отображаем данные
  return (
    <div>
      <ShowLoading />
      <ShowError />
      <CharacterBoard list={list} />
    </div>
  );
}

ScreensCharacterForm.propTypes = {
  characterName: PropTypes.string.isRequired
};

export default ScreensCharacterForm;
