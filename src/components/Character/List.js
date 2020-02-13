import React from 'react';
import PropTypes from 'prop-types';
// Application components
import CharacterCard from '../../components/Character/Card';

const CharacterList = ({ list, selectCardByItem, deleteCardByItem }) => {
  return (
    <div className="characters-list">
      {
        list.map(item => (
          <CharacterCard
            key={item.id}
            item={item}
            onSelect={ selectCardByItem }
            onDelete={ deleteCardByItem }
          />
        ))
      }
    </div>
  );
};

const { string, func } = PropTypes;

CharacterList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: string.isRequired,
      name: string.isRequired,
      image: string.isRequired
    })),
  selectCardByItem: func.isRequired,
  deleteCardByItem: func.isRequired
};

export default CharacterList;
