import { fetchMyFavorites } from "../../services/PlantServices";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import searchSymbol from "/assets/graphics/search_symbol.png";
import seedling from "/assets/graphics/seedling.png";

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
        <div className="list-container pixel-border-green2 w-3/4 grid grid-cols-5 gap-14 my-8 px-8 pt-1 pb-6">
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
        <h3 className="text-xl w-3/4 my-8 p-8 pixel-border-green2 text-center">
          No favorites found :(
        </h3>
      );
    } else {
      return (
        <div className="text-xl w-3/4 my-8 p-8 pixel-border-green2 text-center">
          No favorites to show :(
        </div>
      );
    }
  };

  return (
    <div className="comp-container bg-amber-100 flex flex-col items-center justify-start relative min-h-[100vh]">
      <div className="title search-bar flex w-3/4 my-2 relative">
        <div className="title text-3xl mx-auto font-bold">My Saved Plants:</div>
        <button
          className="add-plant-button text-2xl text-light-green-900 absolute left-0 underline flex justify-center items-center h-[2.5rem]"
          onClick={() => {
            navigate("/plants/newplant");
          }}
        >
          + Add Plant
          <img
            className="h-[3rem] mb-1.5 -ml-1"
            src={seedling}
            alt="Seedling"
          />
        </button>
        <div className="search-bar-container absolute right-0">
          <input
            className="search-bar border text-2xl border-solid border-black rounded-md w-[14rem] h-[1.85rem]"
            type="text"
            value={searchTerm}
            style={{
              backgroundImage: `url(${searchSymbol})`,
              backgroundSize: "25px 22px", // Adjust the size as needed
              backgroundPosition: "5px center", // Adjust position as needed
              backgroundRepeat: "no-repeat",
              paddingLeft: "40px", // Adjust to make room for the image
            }}
            placeholder={`Search Plants`}
            onChange={handleSearch}
          />
        </div>
      </div>
      {displayFavorites()}
    </div>
  );
};
