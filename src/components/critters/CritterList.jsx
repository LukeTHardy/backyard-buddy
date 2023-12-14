import { fetchAllCritters } from "../../services/CritterServices";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const CritterList = () => {
  const [allCritters, setAllCritters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermCritters, setSearchTermCritters] = useState([]);
  const [valueCritters, setValueCritters] = useState([]);
  const [filterTypeSwitch, setFilterTypeSwitch] = useState("");
  // const [categoryCritters, setCategoryCritters] = useState([]);
  const [renderedCritters, setRenderedCritters] = useState([]);

  const fetchAndSetAllCritters = async () => {
    const critterArray = await fetchAllCritters();
    setAllCritters(critterArray);
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

  const displayCritters = () => {
    if (renderedCritters && renderedCritters.length) {
      return renderedCritters.map((critter) => {
        return (
          <div key={critter.id}>
            <>
              <Link to={`/critters/${critter.id}`} className="">
                <div className="critter-image">
                  <img
                    src={`${critter.image}`}
                    className="border-double border-4 border-amber-900 rounded-xl"
                  />
                </div>
                <div className="critter-name text-center absolute w-[180px]">
                  {critter.name}
                </div>
              </Link>
            </>
          </div>
        );
      });
    }

    return <h3 className="">Loading Critters...</h3>;
  };

  return (
    <div className="comp-container flex flex-col justify-center items-center mt-4">
      <div className="title search-bar flex w-3/4 mb-6 relative">
        <div className="title text-xl mx-auto font-bold">Browse Critters</div>
        <div className="search-bar-container absolute right-0">
          <input
            className="search-bar border border-solid border-black rounded-md"
            type="text"
            value={searchTerm}
            placeholder=" Search Critters"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="buttons-container">
        <button
          name="helpful"
          className="text-xl border-double border-4 border-green-900 rounded-xl p-2 mx-8"
          onClick={handleValueFilter}
        >
          Helpful
        </button>
        <button
          name="neutral"
          className="text-xl border-double border-4 border-green-900 rounded-xl p-2 mx-8"
          onClick={handleValueFilter}
        >
          Neutral
        </button>
        <button
          name="harmful"
          className="text-xl border-double border-4 border-green-900 rounded-xl p-2 mx-8"
          onClick={handleValueFilter}
        >
          Harmful
        </button>
      </div>
      {searchTerm || filterTypeSwitch ? (
        <button
          onClick={clearFilters}
          className="border border-solid border-black rounded-xl px-1 py-0.5 mt-2"
        >
          ⓧ clear filters
        </button>
      ) : (
        ""
      )}
      <div className="list-container w-3/4 grid grid-cols-5 gap-14 mt-4 p-8 rounded-xl bg-amber-100">
        {displayCritters()}
      </div>
    </div>
  );
};
