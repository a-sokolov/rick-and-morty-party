import React from 'react';
import PropTypes from 'prop-types';

// Карточка персонажа, где можно вызвать событие выбора и удаления.
const CharacterCard = ({ id, name, image, onSelect, onDelete }) => {
  return (
    <div className="CharacterCard">
      <img
        src={image}
        alt={name}
        onClick={ () => onSelect(id) }
      />
      <button
        className="CloseButton"
        onClick={ () => onDelete(id) }>
        x
      </button>
    </div>
  );
};

const { func, string } = PropTypes;

CharacterCard.propTypes = {
    id: string.isRequired,
    name: string.isRequired,
    image: string.isRequired,
    onSelect: func.isRequired,
    onDelete: func.isRequired
};

export default CharacterCard;
