import React, { useState, useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup'
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

  useEffect(() => {
    api.getCards()
      .then((dataCard) => {
        console.log(dataCard);
        setCards(dataCard)
      })
      .catch((err) => {
        console.log(`Ошибка получения карточек: `, err);
      })
  }, [])

  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        console.log(userData);
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

  function handleDeleteCardClick() {
    setIsDeletePopupOpen(true)
  }

  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        console.log(`new card ===>`, newCard);
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((res) => {
        console.log(`res ===>`, res);
        setCards((state) => state.filter((c) => {
          return c._id !== card._id
        }))

      })
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsDeletePopupOpen(false)
    setSelectedCard({})
  }

  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then((data) => {
        console.log(`data ===>`, data);
        setCurrentUser(data)
        console.log(`current user ===>`, currentUser);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка редактирования данных пользователя: `, err);
      })
  }


  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
      .then((avatar) => {
        console.log(`avatar ===>`, avatar);
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
              onDeleteCardClick={handleDeleteCardClick}
              onCardClick={card => handleCardClick(card)}
              onCardLike={card => handleCardLike(card)}
              onCardDelete={card => handleCardDelete(card)}
            />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
