import React, { useState } from 'react';
// Material UI
import TextField from '@material-ui/core/TextField';
// Application components
import CharacterForm from '../Character/Form.js';
import { ContextCharacterName } from '../../context/Character/Name.js';
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
    <div className="AppRoot">
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
        <ContextCharacterName.Provider value={name}>
          <CharacterForm />
        </ContextCharacterName.Provider>
    </div>
  );
}

export default AppRoot;
