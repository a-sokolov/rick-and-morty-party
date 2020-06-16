import React from 'react';
// Entities
import {CharacterCardProperty} from './interfaces';
import {
  CharacterCardStyled,
  ImageStyled,
  CloseCardButtonStyled,
  CloseCardButtonIconStyled
} from './styles';

// Карточка персонажа, где можно вызвать событие выбора и удаления.
const CharacterCard = ({item, onSelect, onDelete}: CharacterCardProperty) => {
  return (
    <CharacterCardStyled>
        <td>
          <ImageStyled
            src={item.image}
            alt={item.name}
            onClick={() => onSelect(item)}
          />
          <CloseCardButtonStyled onClick={() => onDelete(item)}>
              <CloseCardButtonIconStyled />
          </CloseCardButtonStyled>
        </td>
    </CharacterCardStyled>
  );
};

export default CharacterCard;
