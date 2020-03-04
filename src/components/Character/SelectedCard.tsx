import React from 'react';

export interface ICharacterSelectedCard {
  label: string,
  image: string,
  skeleton: string
}

// Компонент для отображения выбранной карточки персонажа
const CharacterSelectedCard = ({
      label, image, skeleton
    }: ICharacterSelectedCard) => {
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

export default CharacterSelectedCard;
