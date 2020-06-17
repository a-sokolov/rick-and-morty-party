import React, {useState, useEffect} from 'react';
// Common
import Index from '../common/Progress';
// Application components
import CharacterBoard from './Board';
// JSON stubs for offline mode
import {getCharacterStubByName} from './stub';
// Utils
import {isValidCharacterName} from '../utils';
// Entities
import {Card} from './Card/interfaces';
import {
  CharactersResultData,
  ScreensCharacterFormProperty
} from './interfaces';
import {useCharactersByNameQuery} from './gql/interfaces';

function ScreensCharacterForm({characterName}: ScreensCharacterFormProperty) {
  // Флаг, что читаем данные из заглушки
  const stubMode: boolean = (process.env.REACT_APP_STUB_MODE === "true");
  // Интервал запроса к API в миллисекундах
  const pollInterval: number = Number(process.env.REACT_APP_APOLLO_CLIENT_POLL_INTERVAL);

  // Текущая коллекция карточек персонажей (id, name, image)
  const [list, setList] = useState<Array<Card>>([]);
  const [loadingStub, setLoadingStub] = useState<Boolean>(false);

  // Функция для инициализации списка карточек по results запроса
  const setQueryResultOnCompleted = (data: CharactersResultData) => {
    const list = data.characters?.results;
    if (list) {
      setList(list);
      console.log(`Total count is ${list.length}`);
    } else {
      setList([]);
      console.log("Set empty list");
    }
  };

  // Выполняем запрос
  const queryOptions = {
    variables: {characterName},
    skip: !isValidCharacterName(characterName) || stubMode,
    pollInterval: pollInterval,
    onCompleted: (data: any) => {
      setQueryResultOnCompleted(data);
    }
  };

  const {loading, error, startPolling, stopPolling} = useCharactersByNameQuery(queryOptions);

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
    <>
      {(loading || loadingStub) && <Index />}
      {error && <p>Error while loading data.</p>}
      <CharacterBoard list={list} />
    </>
  );
}

export default ScreensCharacterForm;
