import "./Lightbox.css";
import leftgreenarrow from "/assets/graphics/leftgreenarrow.png";
import rightgreenarrow from "/assets/graphics/rightgreenarrow.png";
import leftbluearrow from "/assets/graphics/leftbluearrow.png";
import rightbluearrow from "/assets/graphics/rightbluearrow.png";

export const Lightbox = ({
  plantName,
  critterName,
  plantImage,
  imageUrl,
  onClose,
  nextPlant,
  previousPlant,
  nextCritter,
  previousCritter,
}) => {
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("lightbox-overlay")) {
      onClose();
    }
  };

  const isChosenPlant = imageUrl === plantImage;

  return (
    <div className="lightbox-overlay" onClick={handleOverlayClick}>
      <div className="lightbox-content flex flex-col justify-center items-center mb-3">
        <div className="text-dark-eggshell italic text-xl mb-2">
          {isChosenPlant ? plantName : critterName}
        </div>
        <div className="lightbox-body flex justify-evenly items-center">
          <span className="lightbox-close text-3xl pt-7" onClick={onClose}>
            X
          </span>
          <img
            className="h-[4rem] w-[4rem] mr-[10rem] cursor-pointer"
            src={isChosenPlant ? leftgreenarrow : leftbluearrow}
            alt="leftarrow"
            onClick={isChosenPlant ? previousPlant : previousCritter}
          />
          <img
            src={imageUrl}
            alt="Expanded Plant Image"
            className="lightbox-image"
          />
          <img
            className="h-[4rem] w-[4rem] ml-[10rem] cursor-pointer"
            src={isChosenPlant ? rightgreenarrow : rightbluearrow}
            alt="rightarrow"
            onClick={isChosenPlant ? nextPlant : nextCritter}
          />
        </div>
      </div>
    </div>
  );
};
