import React from 'react';
import {CharacterSelectedCardProperty} from "./interfaces";

// Компонент для отображения выбранной карточки персонажа
const CharacterSelectedCard = ({
      label, image, skeleton
    }: CharacterSelectedCardProperty) => {
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
