import {
  fetchPlant,
  fetchAllPlants,
  deletePlant,
  createFavorite,
  deleteFavoriteById,
  fetchMyFavorites,
} from "../../services/PlantServices";
import { Lightbox } from "../misc/Lightbox";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import "./Details.css";

export const PlantDetails = ({ userId }) => {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [popoverStates, setPopoverStates] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [foundFavorite, setFoundFavorite] = useState({});
  const [plants, setPlants] = useState([]);
  const [chosenPlant, setChosenPlant] = useState({
    soil: { id: 0, soil_type: "" },
    light: { id: 0, label: "" },
    water: { id: 0, frequency: "" },
    zones: [],
    critters: [],
    companions: [],
    type: { id: 0, label: "" },
  });
  const { plantId } = useParams();

  const fetchAndSetPlant = async () => {
    const plant = await fetchPlant(plantId);
    setChosenPlant(plant);
  };

  useEffect(() => {
    fetchAndSetPlant();
  }, [plantId, foundFavorite]);

  useEffect(() => {
    fetchAllPlants().then((plantsArray) => {
      setPlants(plantsArray);
    });
  }, []);

  useEffect(() => {
    fetchMyFavorites().then((favsArray) => {
      setFavorites(favsArray);
    });
  }, []);

  useEffect(() => {
    const thisFavorite = favorites.find(
      (favorite) => favorite.plant.id === parseInt(plantId)
    );
    setFoundFavorite(thisFavorite);
  }, [userId, favorites, plantId]);

  const handleAddFavoriteClick = () => {
    const newFavorite = {
      plant: parseInt(plantId),
    };
    createFavorite(newFavorite).then(window.location.reload());
  };

  const handleRemoveFavoriteClick = () => {
    const favoriteId = foundFavorite.id;
    deleteFavoriteById(favoriteId).then(window.location.reload());
  };

  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);

  const getNextPlantId = (currentPlantId) => {
    const sortedIds = plants.map((plant) => plant.id).sort((a, b) => a - b);
    const currentIndex = sortedIds.indexOf(currentPlantId);
    if (currentIndex !== -1 && currentIndex < sortedIds.length - 1) {
      return sortedIds[currentIndex + 1];
    }
    return null;
  };

  const getPreviousPlantId = (currentPlantId) => {
    const sortedIds = plants.map((plant) => plant.id).sort((a, b) => a - b);
    const currentIndex = sortedIds.indexOf(currentPlantId);
    if (currentIndex > 0) {
      return sortedIds[currentIndex - 1];
    }
    return null;
  };

  const nextPlant = () => {
    const nextId = getNextPlantId(parseInt(plantId));
    if (nextId !== null) {
      navigate(`/plants/${nextId}`);
    } else {
      window.alert(`This is the last plant!`);
    }
  };

  const previousPlant = () => {
    const previousId = getPreviousPlantId(parseInt(plantId));
    if (previousId !== null) {
      navigate(`/plants/${previousId}`);
    } else {
      window.alert(`This is the first plant!`);
    }
  };

  const handleMouseEnter = (plantId) => {
    // Set the state for the corresponding plant to true
    setPopoverStates((prevState) => ({ ...prevState, [plantId]: true }));
  };

  const handleMouseLeave = (plantId) => {
    // Set the state for the corresponding plant to false
    setPopoverStates((prevState) => ({ ...prevState, [plantId]: false }));
  };

  const displayPlant = () => {
    if (chosenPlant) {
      return (
        <>
          <div className="navigate-btns flex justify-between items-center font-bold text-xl h-12 w-3/4">
            <button onClick={previousPlant}>﹤Prev</button>
            <button onClick={nextPlant}>Next﹥</button>
          </div>
          <div className="card-container flex justify-center">
            <div className="image-card flex flex-col w-[35rem] items-center">
              <button onClick={openLightbox}>
                <img
                  src={chosenPlant.image}
                  className="plant-image border-double border-4 border-brown-600 rounded-xl w-[30rem] h-[30rem] object-cover"
                  alt="Plant Image"
                />
              </button>

              {lightboxOpen && (
                <Lightbox
                  imageUrl={chosenPlant.image}
                  onClose={closeLightbox}
                />
              )}
            </div>
            <div className="details-card flex flex-col items-center border-solid round-xl bg-amber-100 w-[40rem] rounded-3xl">
              <div className="plant-name text-3xl underline m-1">
                {chosenPlant.name}
              </div>
              <div className="annual-perennial text-xl m-1">
                {chosenPlant.annual ? "(Annual)" : "(Perennial)"}
              </div>
              <div className="plant-description text-lg m-1">
                {chosenPlant.description}
              </div>
              <div className="growing-needs flex justify-evenly">
                <div className="plant-status text-xl m-1">
                  Soil: {chosenPlant.soil.soil_type}
                </div>
                <div className="plant-status text-xl m-1">
                  Water: {chosenPlant.water.frequency}
                </div>
                <div className="plant-status text-xl m-1">
                  Light: {chosenPlant.light.label}
                </div>
              </div>
              <div className="plant-size text-xl m-1">
                Spacing:{" "}
                {chosenPlant.spacing >= 48
                  ? `${chosenPlant.spacing / 12} ft.`
                  : `${chosenPlant.spacing} in.`}
              </div>
              <div className="plant-size text-xl m-1">
                Height:{" "}
                {chosenPlant.height >= 48
                  ? `${chosenPlant.height / 12} ft.`
                  : `${chosenPlant.height} in.`}
              </div>
              <div className="plant-management text-xl m-1">
                Maturity: {chosenPlant.maturity}
              </div>
              <div className="zones text-xl">
                {chosenPlant.type.label === "Veggie" || chosenPlant.annual
                  ? "Grows in zones:"
                  : "Winter hardy in zones:"}
                {chosenPlant.zones
                  .map((zone, index, array) => {
                    const isLastItem = index === array.length - 1;
                    return isLastItem ? ` ${zone.name}` : ` ${zone.name},`;
                  })
                  .join("")}
              </div>
              <div className="lists-container flex justify-between w-[30rem]">
                <div className="companions text-xl">
                  Companion Plants: <br />
                  {chosenPlant.companions.length === 0 ? (
                    <div className="italic text-center">None to show</div>
                  ) : (
                    chosenPlant.companions.map((plant) => {
                      const isOpen = popoverStates[plant.id];
                      return (
                        <div key={plant.id} className="plant-popover-link">
                          <Popover
                            offset={7}
                            open={isOpen}
                            handler={() => handleMouseLeave(plant.id)}
                            transitionDuration={0}
                          >
                            <PopoverHandler
                              onMouseEnter={() => handleMouseEnter(plant.id)}
                              onMouseLeave={() => handleMouseLeave(plant.id)}
                            >
                              <Link
                                to={`/plants/${plant.id}`}
                                className="plant-name hover:font-bold focus:outline-none"
                              >
                                {plant.name}
                              </Link>
                            </PopoverHandler>
                            <PopoverContent>
                              <div className="popover-card -m-2.5 flex">
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
                                    {plant.annual ? "Annual" : "Perennial"}{" "}
                                    {plant.type.label}
                                  </div>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="plant-critters text-xl">
                  Potential Critters: <br></br>
                  {chosenPlant.critters.map((critter) => {
                    const isOpen = popoverStates[critter.id];
                    return (
                      <div key={critter.id} className="critter-popover-link">
                        <Popover
                          offset={7}
                          open={isOpen}
                          handler={() => handleMouseLeave(critter.id)}
                          transitionDuration={0}
                        >
                          <PopoverHandler
                            onMouseEnter={() => handleMouseEnter(critter.id)}
                            onMouseLeave={() => handleMouseLeave(critter.id)}
                          >
                            <Link
                              to={`/critters/${critter.id}`}
                              className="critter-name hover:font-bold focus:outline-none"
                            >
                              {critter.name}
                            </Link>
                          </PopoverHandler>
                          <PopoverContent>
                            <div className="popover-card -m-2.5 flex">
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
                          </PopoverContent>
                        </Popover>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="buttons-container w-[15rem] flex justify-evenly">
                {userId == chosenPlant.user ? (
                  <>
                    <button
                      className="text-xl border-double border-4 border-green-900 rounded-xl p-1"
                      onClick={() => {
                        navigate(`/plants/${plantId}/edit`);
                      }}
                    >
                      Edit Plant
                    </button>
                    <button
                      className="text-xl border-double border-4 border-green-900 rounded-xl p-1"
                      onClick={() => {
                        deletePlant(plantId);
                        navigate("/plants");
                      }}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
              {foundFavorite ? (
                <button
                  className="delete-favorite-button text-xl border-double border-4 border-green-900 rounded-xl mt-2 p-1"
                  onClick={handleRemoveFavoriteClick}
                >
                  Remove from Favorites 💔
                </button>
              ) : (
                <button
                  className="favorite-button text-xl border-double border-4 border-green-900 rounded-xl mt-2 p-1"
                  onClick={handleAddFavoriteClick}
                >
                  Save To Favorites 🌻
                </button>
              )}
            </div>
          </div>
        </>
      );
    }

    return <h3 className="">Loading Plant...</h3>;
  };

  return (
    <div className="detail-comp-container flex flex-col items-center">
      {displayPlant()}
    </div>
  );
};
