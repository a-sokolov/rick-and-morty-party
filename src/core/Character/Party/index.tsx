import React from 'react';
// Application components
import CharacterSelectedCard from '../SelectedCard';
import {CharacterPartyProperty} from './interfaces';
import {CharacterPartyStyled} from './styles';

const CharacterParty = ({
      rick, morty, skeleton
    }: CharacterPartyProperty) => {
  return (
    <CharacterPartyStyled>
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
    </CharacterPartyStyled>
  );
};

export default CharacterParty;
