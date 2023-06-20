import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleDeleteCardClick() {
    setIsDeletePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsDeletePopupOpen(false)
    setSelectedCard({})
  }

  return (
    <div className="App">
      <div className='page'>
        <div className="page__container">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onDeleteCard={handleDeleteCardClick}
            onCardClick={card => handleCardClick(card)}
          />
          <Footer />

          {/* Popup Profile */}
          <PopupWithForm
            name={'profile'}
            title={'Редактировать профиль'}
            buttonText={'Сохранить'}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}>
            <label>
              <input type="text" name="name" className="popup__input popup__input_user_name" id="name-input" placeholder="Имя" minLength="2" maxLength="40" required />
              <span className="popup__input-error name-input-error" ></span>
            </label>
            <label>
              <input type="text" name="about" className="popup__input popup__input_user_aboutself" id="about-input" placeholder="О себе" minLength="2" maxLength="200" required />
              <span className="popup__input-error about-input-error" ></span>
            </label>
          </PopupWithForm>

          {/* Popup Avatar */}
          <PopupWithForm
            name={'avatar'}
            title={'Обновить аватар'}
            buttonText={'Сохранить'}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}>
            <label>
              <input type="url" name="avatar" className="popup__input popup__input_avatar_link" placeholder="Ссылка на картинку" id="avatar-input" required />
              <span className="popup__input-error avatar-input-error" ></span>
            </label>
          </PopupWithForm>

          {/* Popup Place */}
          <PopupWithForm
            name={'place'}
            title={'Новое место'}
            buttonText={'Создать'}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}>

            <label>
              <input type="text" name="name" className="popup__input popup__input_place_name" placeholder="Название" minLength="2" maxLength="30" id="place-input" required />
              <span className="popup__input-error place-input-error" ></span>
            </label>
            <label>
              <input type="url" name="link" className="popup__input popup__input_place_link" placeholder="Ссылка на картинку" id="link-input" required />
              <span className="popup__input-error link-input-error" ></span>
            </label>
          </PopupWithForm>

          {/* Popup Delete */}
          <PopupWithForm
            name={'delete'}
            title={'Вы уверены?'}
            buttonText={'Да'}
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups} />

          {/* Popup Image */}
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
