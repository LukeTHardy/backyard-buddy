import { useState } from "react";
import { Link } from "react-router-dom";

export const CritterPopover = ({ critter }) => {
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  const handleMouseEnter = () => {
    setPopoverVisible(true);
  };

  const handleMouseLeave = () => {
    setPopoverVisible(false);
  };

  return (
    <div className="critter-popover-link relative">
      <Link to={`/critters/${critter.id}`} className="focus:outline-none">
        <span
          className="plant-name hover:font-bold hover:text-[1.5rem] hover:text-cyan-900"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {critter.name}
        </span>
      </Link>

      {isPopoverVisible && (
        <div
          className="popover-card -m-2.5 flex bg-amber-50 p-1.5 border-solid border-2 border-gray-dark rounded-lg"
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
              src={critter.image}
              alt={`${critter.name}`}
              className="h-full w-full rounded-md object-cover"
            />
          </div>
          <div className="critter-details flex flex-col items-center justify-evenly">
            <div className="critter-name w-[10rem] px-1 text-3xl font-bold text-center text-gray-dark font-pixel">
              {critter.name}
            </div>
            <div className="critter-type w-[8rem] text-2xl italic font-bold text-center text-gray-dark font-pixel">
              {critter.type.label}
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
