import { fetchMyFavorites } from "../../services/PlantServices";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import searchSymbol from "/assets/graphics/search_symbol.png";
import onSwitch from "/assets/graphics/on_switch.png";
import offSwitch from "/assets/graphics/off_switch.png";
import seedling from "/assets/graphics/seedling.png";
import "./PlantsCritters.css";
import "/src/components/plants/PixelBorder.scss";

export const Favorites = () => {
  const navigate = useNavigate();
  const [lastClicked, setLastClicked] = useState(null);
  const [allFavorites, setAllFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermFavorites, setSearchTermFavorites] = useState([]);
  const [veggiesSelected, setVeggiesSelected] = useState(false);
  const [typeFavorites, setTypeFavorites] = useState([]);
  const [zoneToggle, setZoneToggle] = useState(false);
  const [zoneSwitch, setZoneSwitch] = useState(false);
  const [filterTypeSwitch, setFilterTypeSwitch] = useState("");
  const [selectedVeggieCategory, setSelectedVeggieCategory] = useState("");
  const [renderedFavorites, setRenderedFavorites] = useState([]);

  const fetchAndSetFavorites = async () => {
    const favoritesArray = await fetchMyFavorites();
    const alphabetizedFavorites = favoritesArray
      .slice()
      .sort((a, b) => a.plant.name.localeCompare(b.plant.name));
    setAllFavorites(alphabetizedFavorites);
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
    // Apply other filters
    let filteredFavorites;
    if (filterTypeSwitch === "search") {
      filteredFavorites = searchTermFavorites;
    } else if (filterTypeSwitch === "type") {
      filteredFavorites = typeFavorites;
    } else {
      filteredFavorites = allFavorites;
    }

    // Apply zone switch filter if enabled
    if (zoneSwitch) {
      filteredFavorites = filteredFavorites.filter((favorite) => {
        return favorite.plant.zones.some((zone) => zone.name.includes("3"));
      });
    }

    // Update renderedFavorites
    setRenderedFavorites(filteredFavorites);
  }, [
    searchTerm,
    allFavorites,
    searchTermFavorites,
    filterTypeSwitch,
    typeFavorites,
    zoneSwitch,
  ]);

  const handleTypeFilter = (e) => {
    setFilterTypeSwitch("type");
    const filteredFavorites = allFavorites.filter(
      (favorite) => favorite.plant.type.label.toLowerCase() === e.target.name
    );
    setTypeFavorites(filteredFavorites);
    setSelectedVeggieCategory("");
    setVeggiesSelected(false);
  };

  const handleVeggieClick = (e) => {
    setFilterTypeSwitch("type");
    const filteredFavorites = allFavorites.filter(
      (favorite) => favorite.plant.type.label.toLowerCase() === e.target.name
    );
    setTypeFavorites(filteredFavorites);
    setSelectedVeggieCategory("");
    setVeggiesSelected((prevState) => !prevState);
  };

  const veggieCategories = [
    "Tomato",
    "Root",
    "Green",
    "Pepper",
    "Squash",
    "Legume",
    "Misc",
  ];

  const handleVeggieCategoryFilter = (category) => {
    setSelectedVeggieCategory(category);

    // Filter renderedFavorites based on the selected veggie category
    const filteredFavorites = typeFavorites.filter(
      (favorite) =>
        favorite.plant.veggie_cat.label.toLowerCase() === category.toLowerCase()
    );

    setRenderedFavorites(filteredFavorites);
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilterTypeSwitch("");
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setFilterTypeSwitch("search");
    setSearchTerm(e.target.value);
    setLastClicked(0);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterTypeSwitch("");
    setLastClicked(0);
  };

  const toggleZoneSwitch = () => {
    setZoneToggle((prevState) => !prevState);
    setZoneSwitch((prevState) => !prevState);
  };

  const handleButtonClick = (buttonId) => {
    // Update the state to the id of the last clicked button
    setLastClicked(buttonId);
  };

  const displayFavorites = () => {
    if (renderedFavorites && renderedFavorites.length) {
      return (
        <div className="list-container pixel-border-green2 w-[85%] grid grid-cols-6 justify-center gap-14 mt-8 mb-12 px-8 pt-4 pb-6">
          {renderedFavorites.map((favorite) => {
            return (
              <div key={favorite.id}>
                <>
                  <Link to={`/plants/${favorite.plant.id}`} className="">
                    <div className="border-step4">
                      <div className="image-container">
                        <img src={favorite.plant.image} alt="Plant Image" />
                      </div>
                    </div>
                    <div className="favorite-name leading-5 text-[1.2rem] text-center -mb-8 mt-1">
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
    <div className="comp-container bg-amber-100 flex flex-col items-center justify-start relative z-4 min-h-[80vh]">
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
            className="h-[1.8rem] ml-1 mb-1.5"
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
      <div className="primary-buttons-container flex justify-center items-center relative w-3/4 h-9 mb-2">
        <div className="type-buttons flex w-1/2 justify-evenly">
          <div className="button2 brown">
            <button
              name="veggie"
              className={`text-xl ${lastClicked === 1 ? "clicked" : ""}`}
              onClick={(e) => {
                handleVeggieClick(e);
                handleButtonClick(1);
              }}
            >
              Veggies
            </button>
          </div>
          <div className="button2 green">
            <button
              name="herb"
              className={`text-xl ${lastClicked === 2 ? "clicked" : ""}`}
              onClick={(e) => {
                handleTypeFilter(e);
                handleButtonClick(2);
              }}
            >
              Herbs
            </button>
          </div>
          <div className="button2 blue">
            <button
              name="flower"
              className={`text-xl ${lastClicked === 3 ? "clicked" : ""}`}
              onClick={(e) => {
                handleTypeFilter(e);
                handleButtonClick(3);
              }}
            >
              Flowers
            </button>
          </div>
          <div className="button2 red">
            <button
              name="fruit"
              className={`text-xl ${lastClicked === 4 ? "clicked" : ""}`}
              onClick={(e) => {
                handleTypeFilter(e);
                handleButtonClick(4);
              }}
            >
              Fruit
            </button>
          </div>
        </div>

        <div className="zone-toggle flex items-center absolute right-0 ">
          <button
            className="w-16 h-[1.85rem] static justify-end"
            onClick={toggleZoneSwitch}
          >
            <img
              className="w-full h-full object-cover"
              src={zoneToggle ? onSwitch : offSwitch}
              alt="zone toggle button"
            />
          </button>
          <div className="w-[6rem] ml-3 text-lg font-bold">
            Only plants in my zone
          </div>
        </div>
      </div>
      {filterTypeSwitch === "type" && veggiesSelected && (
        <>
          <div
            className="arrow"
            style={{
              position: "absolute",
              top: "5.85rem", // Adjusted top value
              left: "35.1rem",
              transform: "translateX(-50%)",
              width: "0",
              height: "0",
              borderTop: "8px solid rgb(40, 40, 40)", // Flipped
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderBottom: "8px solid transparent", // Flipped
            }}
          />
          <div className="absolute left-[15.34rem] top-[6.2rem] flex justify-evenly w-[40rem] h-7 my-2">
            {veggieCategories.map((category) => (
              <button
                key={category}
                className={`eightbit-btn text-lg ${
                  selectedVeggieCategory === category
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }`}
                onClick={() => handleVeggieCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </>
      )}
      {searchTerm || filterTypeSwitch ? (
        <button
          onClick={clearFilters}
          className="border border-solid border-black rounded-xl px-1 pt-0.5 mt-1"
        >
          ⓧ clear filters
        </button>
      ) : (
        ""
      )}
      {displayFavorites()}
    </div>
  );
};
