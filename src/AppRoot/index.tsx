import React, { useState } from 'react';
// Application components
import ScreensCharacterForm from '../screens/Character/Form';

function AppRoot() {
  // Здесь будем хранить имя персонажа, введенного на форме
  const [name, setName] = useState<string>("");
  // Событие, по которому будем сохранять результат поиска имени персонажа
  // eslint-disable-next-line
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div className="app-root">
      <input
        id="character-search"
        type="string"
        required
        autoFocus
        autoComplete='off'
        onChange={ handleChange }
        />
        <ScreensCharacterForm characterName={name} />
    </div>
  );
}

export default AppRoot;
