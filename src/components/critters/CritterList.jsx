import { fetchAllCritters } from "../../services/CritterServices";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import searchSymbol from "/assets/graphics/search_symbol.png";
import sparkle from "/assets/graphics/sparkle.png";

import "./Critters.css";

export const CritterList = () => {
  const navigate = useNavigate();
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

  const displayCritters = () => {
    if (renderedCritters && renderedCritters.length) {
      return (
        <div className="list-container pixel-border-blue2 w-3/4 grid grid-cols-5 gap-14 my-8 px-8 pt-1 pb-12">
          {renderedCritters.map((critter) => {
            return (
              <div key={critter.id}>
                <>
                  <Link to={`/critters/${critter.id}`} className="">
                    <div className="critter-image">
                      <img
                        src={`${critter.image}`}
                        className="border-solid w-[169.2px] h-[169.2px] object-cover border-[2px] border-dark-gray rounded-xl"
                      />
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
    <div className="comp-container bg-amber-100 flex flex-col justify-start items-center relative min-h-[100vh]">
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
      <div className="buttons-container flex justify-center relative w- h-9 mb-2 w-3/4">
        <button
          name="helpful"
          className="text-lg eightbit-btn mx-8"
          onClick={handleValueFilter}
        >
          Helpful
        </button>
        <button
          name="neutral"
          className="text-lg eightbit-btn mx-8"
          onClick={handleValueFilter}
        >
          Neutral
        </button>
        <button
          name="harmful"
          className="text-lg eightbit-btn mx-8"
          onClick={handleValueFilter}
        >
          Harmful
        </button>
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
