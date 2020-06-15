import React from 'react';
// Entities
import { CharacterCardProperty } from './interfaces';
import Cross from './img/cross.svg';

// Карточка персонажа, где можно вызвать событие выбора и удаления.
const CharacterCard = ({
      item, onSelect, onDelete
    }: CharacterCardProperty) => {
  return (
    <tr className="character-card">
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
