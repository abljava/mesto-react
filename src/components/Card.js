import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onDeleteCardClick, onCardLike }) {

  const currentUser = useContext(CurrentUserContext)

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `button card__like-btn ${isLiked && 'card__like-btn_active'}`
  );

  const handleClick = () => {
    onCardClick(card)
  }

  const handleDeleteClick = () => {
    onDeleteCardClick(card)
  }

  const handleLikeClick = () => {
    onCardLike(card)
  }

  return (
    <li className="card__item">
      <img src={card.link} alt={card.name} className="card__img" onClick={handleClick} />
      <div className="card__description">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button type="button" className="button card__delete-btn" onClick={handleDeleteClick} />}
    </li>
  )
}

export default Card