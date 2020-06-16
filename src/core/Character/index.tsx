import React, { useState, useEffect } from 'react';
// GraphQL
import { useQuery } from '@apollo/react-hooks';
// Common
import Index from '../common/Progress';
// Application components
import CharacterBoard from './Board';
// JSON stubs for offline mode
import { getCharacterStubByName } from './stub';
// Utils
import { isValidCharacterName } from '../utils';
// Entities
import { Card } from './Card/interfaces';
import {getCharactersByNameQuery, ScreensCharacterFormProperty} from './interfaces';

function ScreensCharacterForm({
      characterName
    }: ScreensCharacterFormProperty) {
  // Флаг, что читаем данные из заглушки
  // eslint-disable-next-line no-undef
  const stubMode: boolean = (process.env.REACT_APP_STUB_MODE === "true");
  // Интервал запроса к API в миллисекундах
  // eslint-disable-next-line no-undef
  const pollInterval: number = Number(process.env.REACT_APP_APOLLO_CLIENT_POLL_INTERVAL);

  // Текущая коллекция карточек персонажей (id, name, image)
  const [list, setList] = useState<Array<Card>>([]);
  const [loadingStub, setLoadingStub] = useState<Boolean>(false);

  interface IQueryResult {
    characters: {
      results?: Array<Card>
    }
  }

  // Функция для инициализации списка карточек по results запроса
  // eslint-disable-next-line
  const setQueryResultOnCompleted = (data: IQueryResult) => {
    if (data.characters.results) {
      setList(data.characters.results);
      console.log(`Total count is ${data.characters.results.length}`);
    } else {
      setList([]);
      console.log("Set empty list");
    }
  };

  // Выполняем запрос
  const { loading, error, startPolling, stopPolling } = useQuery(getCharactersByNameQuery, {
      variables: { characterName },
      skip: !isValidCharacterName(characterName) || stubMode,
      pollInterval: pollInterval,
      onCompleted: setQueryResultOnCompleted
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
        setLoadingStub(true)
        setTimeout(() => {
          setList(getCharacterStubByName(characterName));
          setLoadingStub(false);
        }, 500);
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

  // Отображаем данные
  return (
    <div>
      { (loading || loadingStub) && <Index /> }
      { error && <p>Error while loading data.</p> }
      <CharacterBoard list={list} />
    </div>
  );
}

export default ScreensCharacterForm;
