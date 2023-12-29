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

  return (
    <div
      className="plant-popover-link relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/plants/${plant.id}`}
        className="plant-name hover:font-bold focus:outline-none"
      >
        {plant.name}
      </Link>

      {isPopoverVisible && (
        <div
          className="popover-card -m-2.5 flex bg-white p-2 rounded-lg"
          style={{
            position: "absolute",
            top: "-10.8rem", // Adjust this value to your preference
            left: "50%", // Centered horizontally
            transform: "translateX(-50%)",
            zIndex: "999",
          }}
        >
          <div className="image-container w-[10rem] h-[10rem]">
            <img
              src={`http://localhost:8000/${plant.image}`}
              alt={`${plant.name}`}
              className="h-full w-full rounded-md object-cover"
            />
          </div>
          <div className="plant-details flex flex-col items-center justify-evenly">
            <div className="plant-name w-[10rem] px-1 text-3xl font-bold text-center text-gray-dark font-pixel">
              {plant.name}
            </div>
            <div className="plant-type w-[8rem] text-2xl italic font-bold text-center text-gray-dark font-pixel">
              {plant.annual ? "Annual" : "Perennial"} {plant.type.label}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
