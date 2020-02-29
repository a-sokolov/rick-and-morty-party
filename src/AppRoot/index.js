import React, { useState } from 'react';
// Material UI
import TextField from '@material-ui/core/TextField';
// Application components
import ScreensCharacterForm from '../screens/Character/Form';
// CSS
import './AppRoot.css';

function AppRoot() {
  // Здесь будем хранить имя персонажа, введенного на форме
  const [name, setName] = useState("");
  // Событие, по которому будем сохранять результат поиска имени персонажа
  // eslint-disable-next-line
  const handleChange = (prop) => event => {
    setName(event.target.value);
  };

  return (
    <div className="app-root">
      <TextField
        id="character-search"
        type="string"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        autoFocus
        autoComplete='off'
        error={!(name.length > 2) && !(name.length === 0)}
        onChange={ handleChange(this) }
        />
        <ScreensCharacterForm characterName={name} />
    </div>
  );
}

export default AppRoot;
