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
    <div className="character-card card-size">
      <img
        src={image}
        alt={label}
      />
    { image === skeleton && <div className="card-label">{label}</div> }
    </div>
  );
};

export default CharacterSelectedCard;
