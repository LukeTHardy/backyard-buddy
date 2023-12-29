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
    <div
      className="critter-popover-link relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/critters/${critter.id}`}
        className="critter-name hover:font-bold focus:outline-none"
      >
        {critter.name}
      </Link>

      {isPopoverVisible && (
        <div
          className="popover-card -m-2.5 flex bg-white p-2 rounded-lg"
          style={{
            position: "absolute",
            top: "-10.8rem",
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
        </div>
      )}
    </div>
  );
};
