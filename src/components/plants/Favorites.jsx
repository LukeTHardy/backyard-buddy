import { fetchMyFavorites } from "../../services/PlantServices";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Favorites = () => {
  const navigate = useNavigate();
  const [allFavorites, setAllFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermFavorites, setSearchTermFavorites] = useState([]);
  const [renderedFavorites, setRenderedFavorites] = useState([]);

  const fetchAndSetFavorites = async () => {
    const favoritesArray = await fetchMyFavorites();
    setAllFavorites(favoritesArray);
  };
  useEffect(() => {
    fetchAndSetFavorites();
  }, []);

  useEffect(() => {
    const foundFavorites = allFavorites.filter((favorite) =>
      favorite.plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchTermFavorites(foundFavorites);
  }, [searchTerm, allFavorites]);

  useEffect(() => {
    if (searchTerm) {
      setRenderedFavorites(searchTermFavorites);
    } else {
      setRenderedFavorites(allFavorites);
    }
  }, [searchTerm, allFavorites, searchTermFavorites]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const displayFavorites = () => {
    if (renderedFavorites && renderedFavorites.length) {
      return (
        <div className="list-container w-3/4 grid grid-cols-5 gap-14 mt-4 p-8 rounded-xl bg-amber-100">
          {renderedFavorites.map((favorite) => {
            return (
              <div key={favorite.id}>
                <>
                  <Link to={`/plants/${favorite.plant.id}`} className="">
                    <div className="favorite-image">
                      <img
                        src={`${favorite.plant.image}`}
                        className="border-double w-[169.2px] h-[169.2px] object-cover border-4 border-brown-600 rounded-xl"
                      />
                    </div>
                    <div className="favorite-name text-center absolute w-[180px]">
                      {favorite.plant.name}
                    </div>
                  </Link>
                </>
              </div>
            );
          })}
        </div>
      );
    } else if (allFavorites && allFavorites.length && searchTerm) {
      return (
        <h3 className="text-xl w-3/4 mt-4 p-8 rounded-xl bg-amber-100 text-center">
          No favorites found :/
        </h3>
      );
    } else {
      return (
        <div className="text-xl w-3/4 mt-4 p-8 rounded-xl bg-amber-100 text-center">
          No favorites to show :/
        </div>
      );
    }
  };

  return (
    <div className="comp-container flex flex-col justify-center items-center mt-4">
      <div className="title search-bar flex w-3/4 mb-6 relative">
        <div className="title text-2xl mx-auto font-bold">My Saved Plants</div>
        <button
          className="add-plant-button text-2xl text-light-green-800 absolute left-0 underline"
          onClick={() => {
            navigate("/plants/newplant");
          }}
        >
          ✚ Add Plant
        </button>
        <div className="search-bar-container absolute right-0">
          <input
            className="search-bar border text-xl border-solid border-black rounded-md"
            type="text"
            value={searchTerm}
            placeholder=" Search Plants"
            onChange={handleSearch}
          />
        </div>
      </div>
      {displayFavorites()}
    </div>
  );
};
