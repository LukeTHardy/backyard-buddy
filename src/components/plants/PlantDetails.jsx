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
import { PlantPopover } from "../misc/PlantPopover";
import { CritterPopover } from "../misc/CritterPopover";
import "./Plants.css";
import sunicon from "/assets/graphics/sun.png";
import watericon from "/assets/graphics/water.png";
import soilicon from "/assets/graphics/soil.png";

export const PlantDetails = ({ userId }) => {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoriteSwitch, setFavoriteSwitch] = useState(false);
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
    const fetchData = async () => {
      await fetchMyFavorites().then((favsArray) => {
        setFavorites(favsArray);
      });
    };

    fetchData();
  }, [favoriteSwitch]);

  useEffect(() => {
    const thisFavorite = favorites.find(
      (favorite) => favorite.plant.id === parseInt(plantId)
    );
    setFoundFavorite(thisFavorite);
  }, [userId, favorites, plantId]);

  const handleAddFavoriteClick = async () => {
    const newFavorite = {
      plant: parseInt(plantId),
    };
    await createFavorite(newFavorite);
    setFavoriteSwitch((prevFavoriteSwitch) => !prevFavoriteSwitch);
  };

  const handleRemoveFavoriteClick = async () => {
    const favoriteId = foundFavorite.id;
    await deleteFavoriteById(favoriteId);
    setFavoriteSwitch((prevFavoriteSwitch) => !prevFavoriteSwitch);
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

  const displayPlant = () => {
    if (chosenPlant) {
      return (
        <>
          <div className="navigate-btns flex justify-start items-end text-lg h-8 w-3/4 italic">
            <button onClick={() => navigate("/plants")}>
              ﹤Back to Plants
            </button>
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
            <div className="details-card pixel-border-blue1 flex flex-col items-center w-[40rem] px-4 mb-12 top-4 relative">
              <div className="plant-name flex justify-between w-full m-1">
                <button className="text-xl text-end" onClick={previousPlant}>
                  ﹤Prev
                </button>
                <div className="underline text-3xl">{chosenPlant.name}</div>
                <button className="text-xl" onClick={nextPlant}>
                  Next﹥
                </button>
              </div>
              <div className="annual-perennial text-xl">
                {chosenPlant.annual ? "(Annual)" : "(Perennial)"}
              </div>
              <div className="plant-description text-[1.2rem] m-1">
                {chosenPlant.description}
              </div>
              <div className="middle-section w-full my-2 flex justify-between ml-10">
                <div className="growing-needs w-1/3 flex items-center">
                  <div className="growing-needs-images flex flex-col justify-center items-center">
                    <img src={sunicon} className="h-[1.6rem] mr-2 my-1" />
                    <img src={watericon} className="h-[1.6rem] mr-2 my-1" />
                    <img src={soilicon} className="h-[1.6rem] mr-2 my-1" />
                  </div>
                  <div className="growing-needs-data">
                    <div className="plant-sun text-xl m-1">
                      {chosenPlant.light.label}
                    </div>
                    <div className="plant-water text-xl m-1">
                      {chosenPlant.water.frequency}
                    </div>
                    <div className="plant-soil text-xl m-1">
                      {chosenPlant.soil.soil_type}
                    </div>
                  </div>
                </div>
                <div className="more-deets w-1/3 flex flex-col items-start">
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
                </div>
                <div className="zones w-1/3 pl-2 text-xl">
                  <div className="flex flex-col">
                    {chosenPlant.type.label === "Veggie" || chosenPlant.annual
                      ? "Grows in zones:"
                      : "Winter hardy in zones:"}
                  </div>
                  <div className="w-[10rem]">
                    {chosenPlant.zones
                      .map((zone, index, array) => {
                        const isLastItem = index === array.length - 1;
                        return isLastItem ? ` ${zone.name}` : ` ${zone.name},`;
                      })
                      .join("")}
                  </div>
                </div>
              </div>
              <div className="lists-container flex justify-between w-full pb-4">
                <div className="companions w-1/2 flex flex-col items-center text-xl">
                  <div className="text-center font-bold text-2xl">
                    Companion Plants:
                  </div>
                  {chosenPlant.companions.length === 0 ? (
                    <div className="italic text-center">None to show</div>
                  ) : (
                    chosenPlant.companions.map((plant) => (
                      <PlantPopover key={plant.id} plant={plant} />
                    ))
                  )}
                </div>
                <div className="plant-critters w-1/2 flex flex-col items-center text-xl">
                  <div className="text-center font-bold text-2xl">
                    Potential Critters:
                  </div>
                  {chosenPlant.critters.length === 0 ? (
                    <div className="italic text-center">None to show</div>
                  ) : (
                    chosenPlant.critters.map((critter) => (
                      <CritterPopover key={critter.id} critter={critter} />
                    ))
                  )}
                </div>
              </div>
              <div className="buttons-container w-[23rem] flex justify-evenly">
                {foundFavorite ? (
                  <button
                    className="delete-favorite-button text-xl border-double border-4 border-green-900 rounded-xl p-1"
                    onClick={handleRemoveFavoriteClick}
                  >
                    Un-favorite 💔
                  </button>
                ) : (
                  <button
                    className="favorite-button text-xl border-double border-4 border-green-900 rounded-xl p-1"
                    onClick={handleAddFavoriteClick}
                  >
                    Favorite 🌻
                  </button>
                )}
                {userId == chosenPlant.user ? (
                  <>
                    <button
                      className="text-xl border-double border-4 border-green-900 rounded-xl p-1"
                      onClick={() => {
                        navigate(`/plants/${plantId}/edit`);
                      }}
                    >
                      Edit 🔧
                    </button>
                    <button
                      className="text-xl border-double border-4 border-green-900 rounded-xl p-1"
                      onClick={() => {
                        deletePlant(plantId);
                        navigate("/plants");
                      }}
                    >
                      Delete 🗑️
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </>
      );
    }

    return <h3 className="">Loading Plant...</h3>;
  };

  return (
    <div className="detail-comp-container relative bg-amber-100 flex flex-col items-center min-h-[80vh]">
      {displayPlant()}
    </div>
  );
};
