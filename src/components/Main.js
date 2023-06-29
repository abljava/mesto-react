import React, { useContext } from 'react';
import Card from './Card'
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDeleteCardClick,
  onCardLike,
  onCardDelete }) {

  const currentUser = useContext(CurrentUserContext)

  return (
    <>
      <main>
        <section className="profile page__centered">
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={onEditAvatar}></div>
          <div className="profile__info">
            <div className="profile__items">
              <h1 className="profile__username">{currentUser.name}</h1>
              <button className="button profile__edit-button" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__userjob">{currentUser.about}</p>
          </div>
          <button className="button profile__add-button" type="button" onClick={onAddPlace}></button>
        </section>
        <section className="places page__centered" aria-label="places">
          <ul className="card">
            {cards.map((item) => {
              return <Card
                card={item}
                key={item._id}
                onCardClick={onCardClick}
                onDeleteCardClick={onDeleteCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            })
            }
          </ul>
        </section>
      </main>
    </>
  )
}

export default Main