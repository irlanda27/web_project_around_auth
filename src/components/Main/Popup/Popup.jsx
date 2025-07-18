import CloseIcon from "../../../images/close_icon.png";
export default function Popup(props) {
  const { title, children, onClose } = props;

  return (
    <div className="popup" id="popup-add-images">
      <div className="popup__container">
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
        <button className="popup__close" onClick={onClose} id="close-icon">
          <img
            className="popup__close-icon"
            src={CloseIcon}
            alt="iconodecerrar"
          />
        </button>
      </div>
    </div>
  );
}
