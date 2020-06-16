import React, { useState } from 'react';
// Application components
import Character from '../Character';
import {
  AppRootStyled,
  SearchCharacterInputStyled
} from './styles';

function AppRoot() {
  // Здесь будем хранить имя персонажа, введенного на форме
  const [name, setName] = useState<string>("");
  // Событие, по которому будем сохранять результат поиска имени персонажа
  // eslint-disable-next-line
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <AppRootStyled>
      <SearchCharacterInputStyled
        type="string"
        required
        autoFocus
        autoComplete='off'
        placeholder="Enter the Character name"
        onChange={handleChange}
        />
        <Character characterName={name} />
    </AppRootStyled>
  );
}

export default AppRoot;
