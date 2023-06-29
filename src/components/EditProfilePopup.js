import React, { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      buttonText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label>
        <input type="text" value={name || ''} onChange={handleChangeName} name="name" className="popup__input popup__input_user_name" id="name-input" placeholder="Имя" minLength="2" maxLength="40" required />
        <span className="popup__input-error name-input-error" ></span>
      </label>
      <label>
        <input type="text" value={description || ''} onChange={handleChangeDescription} name="about" className="popup__input popup__input_user_aboutself" id="about-input" placeholder="О себе" minLength="2" maxLength="200" required />
        <span className="popup__input-error about-input-error" ></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup