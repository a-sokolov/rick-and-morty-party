import React from 'react';

// Карточка персонажа, где можно вызвать событие выбора и удаления.
const CharacterCard = ({ id, name, image, onSelect, onDelete }) => {
  return (
    <div key={id} className="CharacterCard">
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

export default CharacterCard;
