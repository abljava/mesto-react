import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    if(!isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen])

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }


  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name={'place'}
      title={'Новое место'}
      buttonText={'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>

      <label>
        <input type="text" value={name || ''} onChange={handleChangeName} name="name" className="popup__input popup__input_place_name" placeholder="Название" minLength="2" maxLength="30" id="place-input" required />
        <span className="popup__input-error place-input-error" ></span>
      </label>
      <label>
        <input type="url" value={link || ''} onChange={handleChangeLink} name="link" className="popup__input popup__input_place_link" placeholder="Ссылка на картинку" id="link-input" required />
        <span className="popup__input-error link-input-error" ></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup