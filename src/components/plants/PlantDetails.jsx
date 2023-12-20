import {
  fetchPlant,
  deletePlant,
  createFavorite,
  deleteFavoriteById,
  fetchMyFavorites,
} from "../../services/PlantServices";
import { Lightbox } from "../misc/Lightbox";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const PlantDetails = ({ userId }) => {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [foundFavorite, setFoundFavorite] = useState({});
  const [chosenPlant, setChosenPlant] = useState({
    soil: { id: 0, soil_type: "" },
    light: { id: 0, label: "" },
    water: { id: 0, frequency: "" },
    zones: [],
    critters: [],
    companions: [],
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

  const displayPlant = () => {
    if (chosenPlant) {
      return (
        <div className="card-container flex justify-center">
          <div className="image-card flex flex-col w-[35rem] items-center">
            <button onClick={openLightbox}>
              <img
                src={chosenPlant.image}
                className="plant-image border-double border-4 border-amber-900 rounded-xl w-[30rem] h-[30rem] object-cover"
                alt="Plant Image"
              />
            </button>

            {lightboxOpen && (
              <Lightbox imageUrl={chosenPlant.image} onClose={closeLightbox} />
            )}
          </div>
          <div className="details-card flex flex-col items-center border-solid round-xl bg-amber-100 w-[40rem] h-[30rem] rounded-3xl">
            <div className="plant-name text-3xl underline m-1">
              {chosenPlant.name}
            </div>
            <div className="annual-perennial text-xl m-1">
              {chosenPlant.annual ? "(Annual)" : "(Perennial)"}
            </div>
            <div className="plant-description text-xl italic m-1">
              -[{chosenPlant.description}]
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
              Spacing: {chosenPlant.spacing} in.
            </div>
            <div className="plant-size text-xl m-1">
              Height: {chosenPlant.height} in.
            </div>
            <div className="plant-management text-xl m-1">
              Days To Mature: {chosenPlant.days_to_mature}
            </div>
            <div className="zones text-xl">
              Zones:
              {chosenPlant.zones.map((zone) => {
                return ` ${zone.name},`;
              })}
            </div>
            <div className="lists-container flex justify-between w-[30rem]">
              <div className="companions text-xl">
                Companion Plants: <br></br>
                {chosenPlant.companions.map((plant) => {
                  return (
                    <div key={plant.id} className="plant-link">
                      <Link to={`/plants/${plant.id}`}>
                        <div className="plant-name hover:font-medium">
                          {plant.name}
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className="plant-critters text-xl">
                Potential Critters: <br></br>
                {chosenPlant.critters.map((critter) => {
                  return (
                    <div key={critter.id} className="critter-link">
                      <Link to={`/critters/${critter.id}`}>
                        <div className="critter-name hover:font-medium">
                          {critter.name}
                        </div>
                      </Link>
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
      );
    }

    return <h3 className="">Loading Plant...</h3>;
  };

  return <div className="detail-comp-container mt-8">{displayPlant()}</div>;
};
