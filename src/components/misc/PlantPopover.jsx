import { useState } from "react";
import { Link } from "react-router-dom";

export const PlantPopover = ({ plant }) => {
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  const handleMouseEnter = () => {
    setPopoverVisible(true);
  };

  const handleMouseLeave = () => {
    setPopoverVisible(false);
  };

  const shouldUseReducedFontSize = plant.name
    .split(" ")
    .some((word) => word.length > 10);

  return (
    <div className="plant-popover-link relative">
      <Link to={`/plants/${plant.id}`} className="focus:outline-none">
        <span
          className="plant-name hover:text-eggshell ease-in duration-100"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {plant.name}
        </span>
      </Link>

      {isPopoverVisible && (
        <div
          className="popover-card -m-2.5 flex bg-amber-50 py-1.5 pl-1.5 border-solid border-2 border-gray-dark rounded-lg"
          style={{
            position: "absolute",
            top: "-10.7rem",
            left: "65%",
            transform: "translateX(-50%)",
            zIndex: "999",
          }}
        >
          <div className="popover-container w-[10rem] h-[10rem]">
            <img
              src={plant.image}
              alt={`${plant.name}`}
              className="h-full w-full rounded-md object-cover"
            />
          </div>
          <div className="plant-details w-1/2 flex flex-col items-center justify-evenly">
            <div
              className={`plant-name w-[10rem] underline underline-offset-[3px] px-1 ${
                shouldUseReducedFontSize ? "text-2xl" : "text-3xl"
              } font-bold text-center text-gray-dark font-pixel`}
            >
              {plant.name}
            </div>
            <div className="plant-type w-[8rem] text-xl italic font-bold text-center text-gray-dark font-pixel">
              {plant.annual ? "Annual" : "Perennial"} <br />
              {plant.type.label}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
