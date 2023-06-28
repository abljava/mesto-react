import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ card, isOpen, onClose, onDeleteCard }) {

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`card ===>`, card);
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      name={'delete'}
      title={'Вы уверены?'}
      buttonText={'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit} />
  )
}

export default DeleteCardPopup