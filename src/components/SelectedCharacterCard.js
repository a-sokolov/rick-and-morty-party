import React from 'react';
import PropTypes from 'prop-types';

// Компонент для отображения выбранной карточки персонажа
const SelectedCharacterCard = ({ label, image, skeleton }) => {
  return (
    <div className="CharacterCard">
      <img
        src={image}
        alt={label}
      />
    {(image === skeleton) ? <label className="CardLabel">{label}</label> : null}
    </div>
  );
};

const { string } = PropTypes;

SelectedCharacterCard.propTypes = {
    label: string.isRequired,
    image: string.isRequired,
    skeleton: string.isRequired
};

export default SelectedCharacterCard;
