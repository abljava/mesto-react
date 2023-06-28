function PopupWithForm({title, name, children, buttonText, isOpen, onClose, onSubmit}) {
  return (
    <>
      <div className={`popup popup_type_submit popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-button button" onClick={onClose}></button>
          <form className="popup__form" onSubmit={onSubmit} name={`${name}-form`} noValidate>
            <h2 className="popup__title">{title}</h2>
            <fieldset className="popup__inputs">{children}</fieldset>
            <button className="popup__submit-button button">{buttonText}</button>
          </form>
        </div>
      </div>

    </>

  )
}

export default PopupWithForm