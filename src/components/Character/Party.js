import React from 'react';
import PropTypes from 'prop-types';
// Application components
import CharacterSelectedCard from './SelectedCard';

// Компонент 'Party', куда помещаем выбранные карточки Рика и Морти
const CharacterParty = ({ rick, morty, skeleton  }) => {
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

const { string } = PropTypes;

CharacterParty.propTypes = {
  rick: string.isRequired,
  morty: string.isRequired,
  skeleton: string.isRequired
};

export default CharacterParty;
