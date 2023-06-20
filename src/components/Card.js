function Card({ card, onCardClick }) {

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="card__item">
      <img src={card.link} alt={card.name} className="card__img" onClick={() => handleClick()} />
      <div className="card__description">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like">
          <button type="button" className="button card__like-btn"></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
      <button type="button" className="button card__delete-btn"></button>
    </li>
  )
}

export default Card