import React, { useState, useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup'
import DeleteCardPopup from './DeleteCardPopup'
import CurrentUserContext from '../contexts/CurrentUserContext'
import { api } from '../utils/Api'

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [cardToDelete, setCardToDelete] = useState({})

  useEffect(() => {
    api.getCards()
      .then((dataCard) => {
        setCards(dataCard)
      })
      .catch((err) => {
        console.log(`Ошибка получения карточек: `, err);
      })
  }, [])

  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch((err) => {
        console.log(`Ошибка получения данных пользователя: `, err);
      })
  }, [])

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

  function handleDeleteCardClick(card) {
    setIsDeletePopupOpen(true)
    setCardToDelete(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsDeletePopupOpen(false)
    setSelectedCard({})
  }


  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка установки лайка: `, err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((c) => {
          return c._id !== card._id
        }))
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки: `, err);
      })
  }

  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка редактирования данных пользователя: `, err);
      })
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка редактирования аватара: `, err);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка добавления карточки: `, err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className='page'>
          <div className="page__container">
            <Header />
            <Main
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onDeleteCardClick={card => handleDeleteCardClick(card)}
              onCardClick={card => handleCardClick(card)}
              onCardLike={card => handleCardLike(card)} />
            <Footer />

            {/* Popup Profile */}
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={data => handleUpdateUser(data)} />

            {/* Popup Avatar */}
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={avatar => handleUpdateAvatar(avatar)} />

            {/* Popup Place */}
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={data => handleAddPlaceSubmit(data)} />

            {/* Popup Delete */}
            <DeleteCardPopup
              card={cardToDelete}
              isOpen={isDeletePopupOpen}
              onClose={closeAllPopups}
              onDeleteCard={card => handleCardDelete(card)} />

            {/* Popup Image */}
            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups} />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
