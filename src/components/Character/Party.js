import React from 'react';
// Application components
import CharacterSelectedCard from './SelectedCard';

const CharacterParty = ({ rick, morty, skeleton  }) => {
  return (
    <div className="Party">
      <CharacterSelectedCard label="RICK" image={rick} skeleton={skeleton} />
      <CharacterSelectedCard label="MORTY" image={morty} skeleton={skeleton} />
    </div>
  );
};

export default CharacterParty;
