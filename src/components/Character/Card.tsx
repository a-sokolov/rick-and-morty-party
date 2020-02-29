import React from 'react';
// Enteties
import { ICard } from '../../enteties/Character/Card';

interface ICharacterCard {
  item: ICard,
  onSelect: (item: ICard) => void,
  onDelete: (item: ICard) => void
}

// Карточка персонажа, где можно вызвать событие выбора и удаления.
const CharacterCard = ({
      item, onSelect, onDelete
    }: ICharacterCard) => {
  return (
    <div className="character-card">
      <img
        src={item.image}
        alt={item.name}
        onClick={ () => onSelect(item) }
      />
      <button
        className="btn-close"
        onClick={ () => onDelete(item) }>
        x
      </button>
    </div>
  );
};

export default CharacterCard;
