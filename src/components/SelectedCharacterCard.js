import React from 'react';

// Компонент для отображения выбранной карточки персонажа
const SelectedCharacterCard = ({ label, image, skeleton }) => {
  return (
    <div className="CharacterCard">
      <img
        src={image}
        alt={label}
      />
    {(image === skeleton) ? <label className="CardLabel">{label}</label> : null}
    </div>
  );
};

export default SelectedCharacterCard;
