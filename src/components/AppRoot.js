import React, { useState } from 'react';
// Material UI
import TextField from '@material-ui/core/TextField';
// Application components
import Characters from './Characters.js';
import { CharacterNameContext } from './Context.js';
// CSS
import './AppRoot.css';

function AppRoot() {
  // Здесь будем хранить имя персонажа, введенного на форме
  const [name, setName] = useState("");
  // Событие, по которому будем сохранять результат поиска имени персонажа
  const handleChange = (prop) => event => {
    setName(event.target.value);
  };

  return (
    <div className="AppRoot">
      <TextField
        id="character-search"
        type="search"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        error={!(name.length > 2) && !(name.length === 0)}
        onChange={ handleChange(this) }
        />
        <CharacterNameContext.Provider value={name}>
          <Characters />
        </CharacterNameContext.Provider>
    </div>
  );
}

export default AppRoot;
