import { fetchAllPlants } from "../../services/PlantServices";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import searchSymbol from "/assets/graphics/search_symbol.png";
import onSwitch from "/assets/graphics/on_switch.png";
import offSwitch from "/assets/graphics/off_switch.png";
import seedling from "/assets/graphics/seedling.png";

export const PlantList = () => {
  const navigate = useNavigate();
  const [allPlants, setAllPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermPlants, setSearchTermPlants] = useState([]);
  const [veggiesSelected, setVeggiesSelected] = useState(false);
  const [typePlants, setTypePlants] = useState([]);
  const [zoneToggle, setZoneToggle] = useState(false);
  const [zoneSwitch, setZoneSwitch] = useState(false);
  const [filterTypeSwitch, setFilterTypeSwitch] = useState("");
  const [selectedVeggieCategory, setSelectedVeggieCategory] = useState("");
  const [renderedPlants, setRenderedPlants] = useState([]);

  const fetchAndSetAllPlants = async () => {
    const plantArray = await fetchAllPlants();
    const alphabetizedPlants = plantArray
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
    setAllPlants(alphabetizedPlants);
  };

  useEffect(() => {
    fetchAndSetAllPlants();
  }, []);

  useEffect(() => {
    const foundPlants = allPlants.filter((plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchTermPlants(foundPlants);
  }, [searchTerm, allPlants]);

  useEffect(() => {
    // Apply other filters
    let filteredPlants;
    if (filterTypeSwitch === "search") {
      filteredPlants = searchTermPlants;
    } else if (filterTypeSwitch === "type") {
      filteredPlants = typePlants;
    } else {
      filteredPlants = allPlants;
    }

    // Apply zone switch filter if enabled
    if (zoneSwitch) {
      filteredPlants = filteredPlants.filter((plant) => {
        return plant.zones.some((zone) => zone.name.includes("3"));
      });
    }

    // Update renderedPlants
    setRenderedPlants(filteredPlants);
  }, [
    searchTerm,
    allPlants,
    searchTermPlants,
    filterTypeSwitch,
    typePlants,
    zoneSwitch,
  ]);

  const handleTypeFilter = (e) => {
    setFilterTypeSwitch("type");
    const filteredPlants = allPlants.filter(
      (plant) => plant.type.label.toLowerCase() === e.target.name
    );
    setTypePlants(filteredPlants);
    setSelectedVeggieCategory("");
    setVeggiesSelected(false);
  };

  const handleVeggieClick = (e) => {
    setFilterTypeSwitch("type");
    const filteredPlants = allPlants.filter(
      (plant) => plant.type.label.toLowerCase() === e.target.name
    );
    setTypePlants(filteredPlants);
    setSelectedVeggieCategory("");
    setVeggiesSelected(true);
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

    // Filter renderedPlants based on the selected veggie category
    const filteredPlants = typePlants.filter(
      (plant) => plant.veggie_cat.label.toLowerCase() === category.toLowerCase()
    );

    setRenderedPlants(filteredPlants);
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilterTypeSwitch("");
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setFilterTypeSwitch("search");
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterTypeSwitch("");
  };

  const toggleZoneSwitch = () => {
    setZoneToggle((prevState) => !prevState);
    setZoneSwitch((prevState) => !prevState);
  };

  const seeRandomPlant = () => {
    const randomId = Math.floor(Math.random() * allPlants.length);
    navigate(`/plants/${randomId}`);
  };

  const displayPlants = () => {
    if (renderedPlants.length > 0) {
      return (
        <div className="list-container pixel-border-blue2 w-3/4 grid grid-cols-5 gap-14 my-8 px-8 pt-1 pb-12">
          {renderedPlants.map((plant) => {
            return (
              <div key={plant.id}>
                <Link to={`/plants/${plant.id}`} className="">
                  <div className="plant-image">
                    <img
                      src={`${plant.image}`}
                      className="border-double w-[169.2px] h-[169.2px] object-cover border-4 border-brown-600 rounded-xl"
                    />
                  </div>
                  <div className="plant-name text-center absolute w-[180px]">
                    {plant.name}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      );
    } else if (allPlants && allPlants.length && filterTypeSwitch) {
      return (
        <h3 className="text-xl w-3/4 mt-4 p-8 rounded-xl bg-amber-200 text-center">
          No plants found :(
        </h3>
      );
    } else {
      return (
        <h3 className="text-xl w-3/4 mt-4 p-8 rounded-xl bg-amber-200 text-center">
          Loading Plants...
        </h3>
      );
    }
  };

  return (
    <div className="comp-container bg-amber-100 flex flex-col justify-start items-center relative z-4 min-h-[100vh]">
      <div className="title search-bar flex w-3/4 mb-2 mt-2 relative">
        <div className="title text-3xl mx-auto font-bold">Browse Plants:</div>
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
      <div className="primary-buttons-container flex justify-center relative w-3/4 h-9 mb-2">
        <div className="type-buttons flex w-1/2 justify-evenly">
          <button
            name="veggie"
            className="text-xl eightbit-btn"
            onClick={handleVeggieClick}
          >
            Veggies
          </button>
          <button
            name="herb"
            className="text-xl eightbit-btn"
            onClick={handleTypeFilter}
          >
            Herbs
          </button>
          <button
            name="flower"
            className="text-xl eightbit-btn"
            onClick={handleTypeFilter}
          >
            Flowers
          </button>
          <button
            name="fruit"
            className="text-xl eightbit-btn"
            onClick={handleTypeFilter}
          >
            Fruit
          </button>
        </div>

        <div className="zone-toggle flex items-center absolute right-0">
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
        <div className="absolute left-0 top-4 w-28">
          <button onClick={seeRandomPlant}>Random Plant!</button>
        </div>
      </div>
      {filterTypeSwitch === "type" && veggiesSelected && (
        <div className="flex justify-evenly w-1/2 h-9 my-2">
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
      )}
      {searchTerm || filterTypeSwitch ? (
        <button
          onClick={clearFilters}
          className="border border-solid border-black rounded-xl px-1 pt-0.5 mt-2"
        >
          ⓧ clear filters
        </button>
      ) : (
        ""
      )}
      {displayPlants()}
    </div>
  );
};
