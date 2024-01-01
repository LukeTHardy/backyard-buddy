import { fetchCritter, fetchAllCritters } from "../../services/CritterServices";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Lightbox } from "../misc/Lightbox";
import { PlantPopover } from "../misc/PlantPopover";

export const CritterDetails = () => {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [critters, setCritters] = useState([]);
  const [chosenCritter, setChosenCritter] = useState({
    type: { id: 0, label: "" },
    plants: [],
  });
  const { critterId } = useParams();

  const fetchAndSetCritter = async () => {
    const critter = await fetchCritter(critterId);
    setChosenCritter(critter);
  };

  useEffect(() => {
    fetchAndSetCritter();
  }, [critterId]);

  useEffect(() => {
    fetchAllCritters().then((crittersArray) => {
      setCritters(crittersArray);
    });
  }, []);

  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);

  const getNextCritterId = (currentCritterId) => {
    const sortedIds = critters
      .map((critter) => critter.id)
      .sort((a, b) => a - b);
    const currentIndex = sortedIds.indexOf(currentCritterId);
    if (currentIndex !== -1 && currentIndex < sortedIds.length - 1) {
      return sortedIds[currentIndex + 1];
    }
    return null;
  };

  const getPreviousCritterId = (currentCritterId) => {
    const sortedIds = critters
      .map((critter) => critter.id)
      .sort((a, b) => a - b);
    const currentIndex = sortedIds.indexOf(currentCritterId);
    if (currentIndex > 0) {
      return sortedIds[currentIndex - 1];
    }
    return null;
  };

  const nextCritter = () => {
    const nextId = getNextCritterId(parseInt(critterId));
    if (nextId !== null) {
      navigate(`/critters/${nextId}`);
    } else {
      window.alert(`This is the last critter!`);
    }
  };

  const previousCritter = () => {
    const previousId = getPreviousCritterId(parseInt(critterId));
    if (previousId !== null) {
      navigate(`/critters/${previousId}`);
    } else {
      window.alert(`This is the first critter!`);
    }
  };

  const displayCritter = () => {
    if (chosenCritter) {
      return (
        <>
          <div className="navigate-btns flex justify-start items-center font-bold text-gray-700 text-lg h-12 w-3/4">
            <button onClick={() => navigate("/critters")}>
              ﹤Back to Critters
            </button>
          </div>
          <div className="card-container flex justify-center">
            <div className="image-card flex flex-col w-[35rem] items-center">
              <button onClick={openLightbox}>
                <img
                  src={chosenCritter.image}
                  className="critter-image border-double border-4 border-brown-600 rounded-xl w-[30rem] h-[30rem] object-cover"
                  alt="Critter Image"
                />
              </button>

              {lightboxOpen && (
                <Lightbox
                  imageUrl={chosenCritter.image}
                  onClose={closeLightbox}
                />
              )}
            </div>
            <div className="details-card flex flex-col items-center border-solid round-xl bg-amber-200 w-[40rem] rounded-3xl">
              <div className="critter-name flex justify-between w-[40rem]">
                <button className="text-xl" onClick={previousCritter}>
                  ﹤Prev
                </button>
                <div className="underline text-3xl">{chosenCritter.name}</div>
                <button className="text-xl" onClick={nextCritter}>
                  Next﹥
                </button>
              </div>
              <div className="critter-description text-lg">
                {chosenCritter.description}
              </div>
              <div className="critter-status text-2xl">
                Status: {chosenCritter.type.label}
              </div>
              <div className="critter-size text-2xl">
                Size: {chosenCritter.size} in.
              </div>
              <div className="critter-management text-lg">
                -{chosenCritter.management}
              </div>
              <br></br>
              <div className="critter-plants text-2xl">
                May be found on: <br />
                {chosenCritter.plants.length === 0 ? (
                  <div className="italic text-center">All plants!</div>
                ) : (
                  chosenCritter.plants.map((plant) => (
                    <PlantPopover key={plant.id} plant={plant} />
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      );
    }

    return <h3 className="">Loading Critter...</h3>;
  };

  return (
    <div className="detail-comp-container relative bg-amber-100 flex flex-col items-center">
      {displayCritter()}
    </div>
  );
};

// name
// status
// size
// description
// management
// may be found on
