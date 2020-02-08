import React from 'react';
// Material UI
import TextField from '@material-ui/core/TextField';
// Application components
import Characters from './Characters.js';
import { CharacterNameContext } from './Context.js';
// CSS
import './AppRoot.css';

function AppRoot() {
  const [name, setName] = React.useState("");

  const handleChange = prop => event => {
    setName(event.target.value);
  };

  return (
    <div className="AppRoot">
      <TextField
        id="character-search"
        label="Type character name"
        type="search"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        error={!(name.length > 2) && !(name.length == 0)}
        onChange={handleChange('name')}
        />
       <CharacterNameContext.Provider value={ name }>
          <Characters />
       </CharacterNameContext.Provider>
    </div>
  );
}

export default AppRoot;
