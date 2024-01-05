import { fetchAllCritters } from "../../services/CritterServices";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import searchSymbol from "/assets/graphics/search_symbol.png";
import sparkle from "/assets/graphics/sparkle.png";
import "/src/components/plants/PlantsCritters.css";

export const CritterList = () => {
  const navigate = useNavigate();
  const [lastClicked, setLastClicked] = useState(null);
  const [allCritters, setAllCritters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermCritters, setSearchTermCritters] = useState([]);
  const [valueCritters, setValueCritters] = useState([]);
  const [filterTypeSwitch, setFilterTypeSwitch] = useState("");
  // const [categoryCritters, setCategoryCritters] = useState([]);
  const [renderedCritters, setRenderedCritters] = useState([]);

  const fetchAndSetAllCritters = async () => {
    const critterArray = await fetchAllCritters();
    const alphabetizedCritters = critterArray
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
    setAllCritters(alphabetizedCritters);
  };

  useEffect(() => {
    fetchAndSetAllCritters();
  }, []);

  useEffect(() => {
    const foundCritters = allCritters.filter((critter) =>
      critter.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchTermCritters(foundCritters);
  }, [searchTerm, allCritters]);

  useEffect(() => {
    if (filterTypeSwitch === "search") {
      setRenderedCritters(searchTermCritters);
    } else if (filterTypeSwitch === "value") {
      setRenderedCritters(valueCritters);
    } else {
      setRenderedCritters(allCritters);
    }
  }, [
    searchTerm,
    allCritters,
    searchTermCritters,
    filterTypeSwitch,
    valueCritters,
  ]);

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

  const handleValueFilter = (e) => {
    setFilterTypeSwitch("value");
    const filteredCritters = allCritters.filter(
      (critter) => critter.type.label.toLowerCase() === e.target.name
    );
    setValueCritters(filteredCritters);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterTypeSwitch("");
  };

  const seeRandomCritter = () => {
    const randomId = Math.floor(Math.random() * allCritters.length);
    navigate(`/critters/${randomId}`);
  };

  const handleButtonClick = (buttonId) => {
    // Update the state to the id of the last clicked button
    setLastClicked(buttonId);
  };

  const displayCritters = () => {
    if (renderedCritters && renderedCritters.length) {
      return (
        <div className="list-container pixel-border-blue2 w-[85%] grid grid-cols-6 gap-14 my-8 px-8 pt-1 pb-6">
          {renderedCritters.map((critter) => {
            return (
              <div key={critter.id}>
                <>
                  <Link to={`/critters/${critter.id}`} className="">
                    <div className="border-step4">
                      <div className="image-container">
                        <img src={critter.image} alt="Test Image" />
                      </div>
                    </div>
                    <div className="critter-name leading-5 text-[1.2rem] text-center absolute w-[180px] mt-1">
                      {critter.name}
                    </div>
                  </Link>
                </>
              </div>
            );
          })}
          ;
        </div>
      );
    } else if (allCritters && allCritters.length && filterTypeSwitch) {
      return (
        <h3 className="text-xl w-3/4 my-8 p-8 pixel-border-blue2 text-center">
          No critters found :/
        </h3>
      );
    } else {
      return (
        <h3 className="text-xl w-3/4 my-8 p-8 pixel-border-blue2 text-center">
          Loading Critters...
        </h3>
      );
    }
  };

  return (
    <div className="comp-container bg-amber-100 flex flex-col justify-start items-center relative min-h-[80vh]">
      <div className="title search-bar flex w-3/4 mb-2 mt-2 relative">
        <div className="title text-3xl mx-auto font-bold">Browse Critters:</div>
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
            placeholder="Search Critters"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="buttons-container flex justify-center items-center relative w-3/4 h-9 mb-2">
        <div className="type-buttons flex w-[28rem] justify-evenly">
          <div className="button2 green">
            <button
              name="helpful"
              className={`text-xl ${lastClicked === 1 ? "clicked" : ""}`}
              onClick={(e) => {
                handleValueFilter(e);
                handleButtonClick(1);
              }}
            >
              Helpful
            </button>
          </div>
          <div className="button2 blue">
            <button
              name="neutral"
              className={`text-xl ${lastClicked === 2 ? "clicked" : ""}`}
              onClick={(e) => {
                handleValueFilter(e);
                handleButtonClick(2);
              }}
            >
              Neutral
            </button>
          </div>
          <div className="button2 red">
            <button
              name="harmful"
              className={`text-xl ${lastClicked === 3 ? "clicked" : ""}`}
              onClick={(e) => {
                handleValueFilter(e);
                handleButtonClick(3);
              }}
            >
              Harmful
            </button>
          </div>
          <div className="random-btn absolute left-6 top-7 flex justify-center items-center">
            <button onClick={seeRandomCritter}>
              Random Critter
              <img
                className="h-[1.3rem] ml-1.5 inline-block"
                src={sparkle}
                alt="sparkle"
              />
            </button>
          </div>
        </div>
      </div>
      {searchTerm || filterTypeSwitch ? (
        <button
          onClick={clearFilters}
          className="border border-solid border-black rounded-xl px-1 pt-0.5 mt-2 top-[.4rem] right-[12rem]"
        >
          ⓧ clear filters
        </button>
      ) : (
        ""
      )}
      {displayCritters()}
    </div>
  );
};
