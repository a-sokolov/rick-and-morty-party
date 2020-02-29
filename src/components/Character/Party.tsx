import React from 'react';
// Application components
import CharacterSelectedCard from './SelectedCard';

interface ICharacterParty {
  rick: string,
  morty: string,
  skeleton: string
}

const CharacterParty = ({
      rick, morty, skeleton
    }: ICharacterParty) => {
  return (
    <div className="characters-party">
      <CharacterSelectedCard
        label="RICK"
        image={rick}
        skeleton={skeleton}
      />
      <CharacterSelectedCard
        label="MORTY"
        image={morty}
        skeleton={skeleton}
      />
    </div>
  );
};

export default CharacterParty;
