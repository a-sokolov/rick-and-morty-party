import React from 'react';
import PropTypes from 'prop-types';

// Карточка персонажа, где можно вызвать событие выбора и удаления.
const CharacterCard = ({ item, onSelect, onDelete }) => {
  return (
    <div className="CharacterCard">
      <img
        src={item.image}
        alt={item.name}
        onClick={ () => onSelect(item) }
      />
      <button
        className="CloseButton"
        onClick={ () => onDelete(item) }>
        x
      </button>
    </div>
  );
};

const { string, func } = PropTypes;

CharacterCard.propTypes = {
    item: PropTypes.shape({
      id: string.isRequired,
      name: string.isRequited,
      image: string.isRequired
    }).isRequired,
    onSelect: func.isRequired,
    onDelete: func.isRequired
};

export default CharacterCard;
