import { fetchCritter, fetchAllCritters } from "../../services/CritterServices";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Lightbox } from "../misc/Lightbox";
import { PlantPopover } from "../misc/PlantPopover";
import "/src/components/plants/PlantsCritters.css";
import uparrow from "/assets/graphics/uparrow.png";

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
    const alphabetizedCritters = critters
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
    const currentIndex = alphabetizedCritters.findIndex(
      (critter) => critter.id === currentCritterId
    );

    if (currentIndex !== -1 && currentIndex < alphabetizedCritters.length - 1) {
      return alphabetizedCritters[currentIndex + 1].id;
    }
    return null;
  };

  const getPreviousCritterId = (currentCritterId) => {
    const alphabetizedCritters = critters
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
    const currentIndex = alphabetizedCritters.findIndex(
      (critter) => critter.id === currentCritterId
    );

    if (currentIndex > 0) {
      return alphabetizedCritters[currentIndex - 1].id;
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
          <div className="card-container flex justify-evenly w-[80%] mt-5">
            <div className="image-card items-start">
              <button onClick={openLightbox}>
                <img
                  src={chosenCritter.image}
                  className="critter-image border-double border-[6px] border-brown-600 hover:border-brown-300 rounded-2xl w-[30rem] h-[30rem] object-cover"
                  alt="Critter Image"
                />
              </button>

              {lightboxOpen && (
                <Lightbox
                  critterName={chosenCritter.name}
                  imageUrl={chosenCritter.image}
                  onClose={closeLightbox}
                  previousCritter={previousCritter}
                  nextCritter={nextCritter}
                />
              )}
            </div>
            <div className="details-card pixel-border-blue1 flex flex-col items-center w-[40rem] px-3 mb-12 top-4 mt-[0.2rem] relative min-h-[27.6rem]">
              <div className="critter-name flex justify-between w-full">
                <button className="text-xl" onClick={previousCritter}>
                  ﹤Prev
                </button>
                <div className="underline text-3xl">{chosenCritter.name}</div>
                <button className="text-xl" onClick={nextCritter}>
                  Next﹥
                </button>
              </div>
              <div className="critter-description text-lg py-3">
                {chosenCritter.description}
              </div>
              <div className="middle-section flex justify-evenly w-[30rem]">
                <div className="critter-status text-2xl">
                  Status: {chosenCritter.type.label}
                </div>
                <div className="critter-size text-2xl">
                  Size: {chosenCritter.size} in.
                </div>
              </div>
              <div className="critter-management text-lg py-3">
                -{chosenCritter.management}
              </div>

              <div className="critter-plants flex flex-col items-center pb-4 mb-6">
                <div className="header text-2xl mb-2">May be found on: </div>
                {chosenCritter.plants.length === 0 ? (
                  <div className="italic text-center text-xl">All plants!</div>
                ) : (
                  <div className="plant-names-list text-xl w-[30rem] flex flex-wrap flex-col items-evenly text-center max-h-[18rem]">
                    {chosenCritter.plants.map((plant) => (
                      <PlantPopover key={plant.id} plant={plant} />
                    ))}
                  </div>
                )}
              </div>
              <div className="buttons-container w-[12rem] flex justify-evenly">
                <div className="back-btn absolute left-4 -bottom-[0.4rem] flex text-[1.15rem] justify-center items-center">
                  <button onClick={() => navigate("/critters")} className="">
                    <img
                      className="h-[1.5rem] mr-2 inline-block mt-[-0.85rem]"
                      src={uparrow}
                      alt="uparrow"
                    />
                    Back to Critters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    return <h3 className="">Loading Critter...</h3>;
  };

  return (
    <div className="detail-comp-container relative bg-amber-100 flex flex-col items-center min-h-[80vh]">
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
