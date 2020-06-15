import React from 'react';
// Entities
import { ICard } from '../../enteties/Character/Card';
import Cross from '../../images/cross.svg';

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
    <tr className="character-card card-size">
        <td>
          <img className="card-size"
            src={item.image}
            alt={item.name}
            onClick={ () => onSelect(item) }
          />
          <div className="btn-close" onClick={() => onDelete(item)}>
              <object className="btn-close-image" type="image/svg+xml"
                  data={Cross}>Your browser does not support SVGs
              </object>
          </div>
        </td>
    </tr>
  );
};

export default CharacterCard;
