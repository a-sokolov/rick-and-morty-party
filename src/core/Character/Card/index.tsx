import React, {useState} from 'react';
// Entities
import {CharacterCardProperty} from './interfaces';
import {
  CharacterCardStyled,
  CloseCardButtonStyled,
  CloseCardButtonIconStyled,
  AnimatedImageStyled
} from './styles';

// Карточка персонажа, где можно вызвать событие выбора и удаления.
function CharacterCard ({item, onSelect, onDelete}: CharacterCardProperty) {
  const [selected, setSelected] = useState(false);
  const [deleted, setDeleted] = useState(false);

  return (
    <CharacterCardStyled>
      <td>
        <AnimatedImageStyled
          src={item.image}
          alt={item.name}
          onClick={() => {
            onSelect(item)
            setSelected(true)
          }}
          onAnimationEnd={() => setSelected(false)}
          animate={selected}
          deleted={deleted}
        />
        <CloseCardButtonStyled
            onClick={() => {
                setTimeout(() => onDelete(item), 200);
                setDeleted(true);
            }}>
            <CloseCardButtonIconStyled />
        </CloseCardButtonStyled>
      </td>
    </CharacterCardStyled>
  );
}

export default CharacterCard;
