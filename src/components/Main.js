import React from 'react';
import { api } from '../utils/Api'
import Card from './Card'

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const [userName, setUserName] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([dataUser, dataCard]) => {
        setUserName(dataUser.name)
        setUserDescription(dataUser.about)
        setUserAvatar(dataUser.avatar)
        setCards(dataCard)
      })
      .catch((err) => {
        console.log(`Ошибка получения данных: `, err);
      })
  }, [])

  return (
    <>
      <main>
        <section className="profile page__centered">
          <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} onClick={onEditAvatar}></div>
          <div className="profile__info">
            <div className="profile__items">
              <h1 className="profile__username">{userName}</h1>
              <button className="button profile__edit-button" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__userjob">{userDescription}</p>
          </div>
          <button className="button profile__add-button" type="button" onClick={onAddPlace}></button>
        </section>
        <section className="places page__centered" aria-label="places">
          <ul className="card">
            {cards.map((item) => {
              return <Card
                card={item}
                key={item._id}
                likes={item.likes.length}
                name={item.name}
                link={item.link}
                onCardClick={onCardClick}
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