import React from 'react';
// Application components
import CharacterSelectedCard from '../SelectedCard';
import {CharacterPartyProperty} from "./interfaces";

const CharacterParty = ({
      rick, morty, skeleton
    }: CharacterPartyProperty) => {
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
