import "./Lightbox.css";

export const Lightbox = ({ imageUrl, onClose }) => {
  const handleOverlayClick = (event) => {
    // Check if the click occurred outside the lightbox content
    if (event.target.classList.contains("lightbox-overlay")) {
      onClose();
    }
  };

  return (
    <div className="lightbox-overlay" onClick={handleOverlayClick}>
      <div className="lightbox-content">
        <span className="lightbox-close" onClick={onClose}>
          &times;
        </span>
        <img
          src={imageUrl}
          alt="Expanded Plant Image"
          className="lightbox-image"
        />
      </div>
    </div>
  );
};
