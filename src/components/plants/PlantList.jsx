import { fetchAllPlants } from "../../services/PlantServices";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import searchSymbol from "/assets/graphics/search_symbol.png";

export const PlantList = () => {
  const navigate = useNavigate();
  const [allPlants, setAllPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermPlants, setSearchTermPlants] = useState([]);
  const [typePlants, setTypePlants] = useState([]);
  const [filterTypeSwitch, setFilterTypeSwitch] = useState("");
  // const [categoryPlants, setCategoryPlants] = useState([]);
  const [renderedPlants, setRenderedPlants] = useState([]);

  const fetchAndSetAllPlants = async () => {
    const plantArray = await fetchAllPlants();
    setAllPlants(plantArray);
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
    if (filterTypeSwitch === "search") {
      setRenderedPlants(searchTermPlants);
    } else if (filterTypeSwitch === "type") {
      setRenderedPlants(typePlants);
    } else {
      setRenderedPlants(allPlants);
    }
  }, [searchTerm, allPlants, searchTermPlants, filterTypeSwitch, typePlants]);

  useEffect(() => {
    if (!searchTerm) {
      setFilterTypeSwitch("");
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setFilterTypeSwitch("search");
    setSearchTerm(e.target.value);
  };

  const handleTypeFilter = (e) => {
    setFilterTypeSwitch("type");
    const filteredPlants = allPlants.filter(
      (plant) => plant.type.label.toLowerCase() === e.target.name
    );
    setTypePlants(filteredPlants);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterTypeSwitch("");
  };

  const displayPlants = () => {
    if (renderedPlants && renderedPlants.length) {
      return (
        <div className="list-container w-3/4 grid grid-cols-5 gap-14 mt-4 p-8 rounded-xl bg-amber-100">
          {renderedPlants.map((plant) => {
            return (
              <div key={plant.id}>
                <Link to={`/plants/${plant.id}`} className="">
                  <div className="plant-image">
                    <img
                      src={`${plant.image}`}
                      className="border-double w-[169.2px] h-[169.2px] object-cover border-4 border-amber-900 rounded-xl"
                    />
                  </div>
                  <div className="plant-name text-center absolute w-[180px]">
                    {plant.name}
                  </div>
                </Link>
              </div>
            );
          })}
          ;
        </div>
      );
    } else if (allPlants && allPlants.length && filterTypeSwitch) {
      return (
        <h3 className="text-xl w-3/4 mt-4 p-8 rounded-xl bg-amber-100 text-center">
          No plants found :/
        </h3>
      );
    } else {
      return (
        <h3 className="text-xl w-3/4 mt-4 p-8 rounded-xl bg-amber-100 text-center">
          Loading Plants...
        </h3>
      );
    }
  };

  return (
    <div className="comp-container flex flex-col justify-center items-center mt-4">
      <div className="title search-bar flex w-3/4 mb-6 relative">
        <div className="title text-2xl mx-auto font-bold">Browse Plants</div>
        <button
          className="add-plant-button text-2xl text-green-700 absolute left-0 underline"
          onClick={() => {
            navigate("/plants/newplant");
          }}
        >
          ✚ Add Plant
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
      <div className="buttons-container">
        <button
          name="veggie"
          className="text-xl border-double border-4 border-green-900 rounded-xl p-2 mx-8"
          onClick={handleTypeFilter}
        >
          Veggies
        </button>
        <button
          name="herb"
          className="text-xl border-double border-4 border-green-900 rounded-xl p-2 mx-8"
          onClick={handleTypeFilter}
        >
          Herbs
        </button>
        <button
          name="flower"
          className="text-xl border-double border-4 border-green-900 rounded-xl p-2 mx-8"
          onClick={handleTypeFilter}
        >
          Flowers
        </button>
        <button
          name="fruit"
          className="text-xl border-double border-4 border-green-900 rounded-xl p-2 mx-8"
          onClick={handleTypeFilter}
        >
          Fruit
        </button>
      </div>
      {searchTerm || filterTypeSwitch ? (
        <button
          onClick={clearFilters}
          className="border border-solid border-black rounded-xl px-1 py-0.5 mt-4"
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
