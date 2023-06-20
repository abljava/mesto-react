function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_images ${Object.keys(card).length > 0 ? 'popup_opened' : ''}`}>
      <figure className="popup__img-container">
        <button type="button" className="popup__close-button button" onClick={onClose}></button>
        <img className="popup__img" src={card.link} alt={card.name} />
        <figcaption className="popup__img-caption">{card.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup