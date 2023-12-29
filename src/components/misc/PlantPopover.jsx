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
    <div className="plant-popover-link relative">
      <Link to={`/plants/${plant.id}`} className="focus:outline-none">
        <span
          className="plant-name hover:font-bold hover:text-[1.5rem] hover:text-light-green-900"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {plant.name}
        </span>
      </Link>

      {isPopoverVisible && (
        <div
          className="popover-card -m-2.5 flex bg-white p-2 rounded-lg"
          style={{
            position: "absolute",
            top: "-10.7rem",
            left: "50%",
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
          {/* <div
            className="arrow"
            style={{
              position: "absolute",
              top: "100%", // Adjusted top value
              left: "50%",
              transform: "translateX(-50%)",
              width: "0",
              height: "0",
              borderTop: "10px solid white", // Flipped
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "10px solid transparent", // Flipped
            }}
          /> */}
        </div>
      )}
    </div>
  );
};
