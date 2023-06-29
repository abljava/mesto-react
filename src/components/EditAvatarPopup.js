import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = useRef()

  useEffect(() => {
    if (!isOpen) {
      avatarRef.current.value = ''
    }
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      buttonText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label>
        <input type="url" ref={avatarRef} name="avatar" className="popup__input popup__input_avatar_link" placeholder="Ссылка на картинку" id="avatar-input" required />
        <span className="popup__input-error avatar-input-error" ></span>
      </label>
    </PopupWithForm>
  )
}


export default EditAvatarPopup