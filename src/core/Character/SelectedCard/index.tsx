import React from 'react';
import {CharacterSelectedCardProperty} from './interfaces';
import {
  SelectedCardStyled,
  CardLabelStyled,
  SelectedCardImageStyled
} from './styles';

// Компонент для отображения выбранной карточки персонажа
const CharacterSelectedCard = ({label, image, skeleton}: CharacterSelectedCardProperty) => {
  return (
    <SelectedCardStyled>
      <SelectedCardImageStyled
        src={image}
        alt={label}
      />
      {image === skeleton && <CardLabelStyled>{label}</CardLabelStyled>}
    </SelectedCardStyled>
  );
};

export default CharacterSelectedCard;
