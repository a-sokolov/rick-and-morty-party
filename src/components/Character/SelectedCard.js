import React from 'react';
import PropTypes from 'prop-types';

// Компонент для отображения выбранной карточки персонажа
const CharacterSelectedCard = ({ label, image, skeleton }) => {
  return (
    <div className="character-card">
      <img
        src={image}
        alt={label}
      />
    {
      (image === skeleton) ?
      (<label className="card-label">{label}</label>)
      : null
    }
    </div>
  );
};

const { string } = PropTypes;

CharacterSelectedCard.propTypes = {
    label: string.isRequired,
    image: string.isRequired,
    skeleton: string.isRequired
};

export default CharacterSelectedCard;
