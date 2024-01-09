import { fetchAllPlants } from "../../services/PlantServices";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import searchSymbol from "/assets/graphics/search_symbol.png";
import onSwitch from "/assets/graphics/on_switch.png";
import offSwitch from "/assets/graphics/off_switch.png";
import seedling from "/assets/graphics/seedling.png";
import sparkle from "/assets/graphics/sparkle.png";
import "./PlantsCritters.css";
import "/src/components/plants/PixelBorder.scss";

export const PlantList = () => {
  const navigate = useNavigate();
  const [lastTBClicked, setLastTBClicked] = useState(null);
  const [lastVCBClicked, setLastVCBClicked] = useState(null);
  const [allPlants, setAllPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [veggieCatsToggle, setVeggieCatsToggle] = useState(false);
  const [userZoneNumber, setUserZoneNumber] = useState(0);
  const [fullZoneName, setFullZoneName] = useState("");
  const [locationJustShared, setLocationJustShared] = useState(false);
  const [plantsFiltered, setPlantsFiltered] = useState(false);
  const [searchFilterOn, setSearchFilterOn] = useState(false);
  const [typeFilterOn, setTypeFilterOn] = useState(false);
  const [zoneFilterOn, setZoneFilterOn] = useState(false);
  const [veggieCatFilterOn, setVeggieCatFilterOn] = useState(false);
  const [veggieCat, setVeggieCat] = useState("");
  const [typeName, setTypeName] = useState("");
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
    const getUserCoordinates = () => {
      return new Promise(async (resolve, reject) => {
        if ("geolocation" in navigator) {
          try {
            const position = await new Promise((innerResolve, innerReject) => {
              navigator.geolocation.getCurrentPosition(
                innerResolve,
                innerReject
              );
            });

            const { latitude, longitude } = position.coords;
            localStorage.setItem(
              "userCoordinates",
              JSON.stringify({ latitude, longitude })
            );
            console.log("Latitude: " + latitude);
            console.log("Longitude: " + longitude);

            resolve({ latitude, longitude });
          } catch (error) {
            setZoneFilterOn(false);
            window.alert(
              "You must share your location for this feature to work"
            );
            console.error("Error getting location:", error);
            reject(error);
          }
        } else {
          console.log("Geolocation is not available in this browser.");
          // Come back later and handle the error more appropriately (user-friendly message)
          reject(new Error("Geolocation not available"));
        }
      });
    };

    const reverseGeocode = async ({ latitude, longitude }) => {
      try {
        const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB-9RSg71QhlzZOOMJTZmPpb0pOaqa6xuc`;

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const zipcode = data.results[4].address_components?.[0].short_name;
        return zipcode;
      } catch (error) {
        console.error("Error fetching geocode data:", error.message);
        // Come back later and handle the error more appropriately (user-friendly message)
        return null;
      }
    };

    const getZoneFromZip = async (zipcode) => {
      try {
        const response = await fetch(`https://phzmapi.org/${zipcode}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const zone = data.zone;
        localStorage.setItem("Full zone name:", JSON.stringify(zone));
        if (!fullZoneName) {
          const cleanedZoneName = zone.replace(/^"(.*)"$/, "$1");
          setFullZoneName(cleanedZoneName);
          setLocationJustShared(true);
        }
        console.log("Just set the full zone name from function chain:", zone);
        return zone;
      } catch (error) {
        console.error("Error fetching zone data:", error.message);
        // Come back later and handle the error more appropriately (user-friendly message)
        return null;
      }
    };
    const extractZoneNumber = (zone) => {
      const zoneNumber = parseInt(zone.toString().charAt(0));
      setUserZoneNumber(zoneNumber);
      localStorage.setItem("Zone number:", JSON.stringify(zoneNumber));
      console.log("Just set the zone number from function chain:", zoneNumber);
    };

    const zoneAlreadyStored = JSON.parse(localStorage.getItem("Zone number:"));

    if (zoneFilterOn && !zoneAlreadyStored) {
      getUserCoordinates()
        .then((coordinates) => reverseGeocode(coordinates))
        .then((zipcode) => getZoneFromZip(zipcode))
        .then((zone) => extractZoneNumber(zone))
        .catch((error) => console.error("Error in the chain:", error));
    }
  }, [zoneFilterOn]);

  useEffect(() => {
    const storedZoneName = localStorage.getItem("Full zone name:");
    const storedZoneNumber = parseInt(localStorage.getItem("Zone number:"));

    if (!fullZoneName && storedZoneName) {
      const cleanedZoneName = storedZoneName.replace(/^"(.*)"$/, "$1");
      setFullZoneName(cleanedZoneName);
      console.log("Just set the full zone name from local storage");
    }
    if (!userZoneNumber && storedZoneNumber) {
      setUserZoneNumber(storedZoneNumber);
      console.log("Just set the zone number from local storage");
    }
  }, [fullZoneName, userZoneNumber]);

  useEffect(() => {
    let filteredPlants = allPlants;

    switch (true) {
      case searchFilterOn && typeFilterOn && veggieCatFilterOn && zoneFilterOn:
        filteredPlants = filteredPlants.filter(
          (plant) => plant.type.label.toLowerCase() === typeName
        );
        filteredPlants = filteredPlants.filter(
          (plant) =>
            plant.veggie_cat.label.toLowerCase() === veggieCat.toLowerCase()
        );
        filteredPlants = filteredPlants.filter((plant) =>
          plant.zones.some((zone) => parseInt(zone.name) === userZoneNumber)
        );
        filteredPlants = filteredPlants.filter((plant) =>
          plant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setRenderedPlants(filteredPlants);
        setPlantsFiltered(true);
        break;

      case searchFilterOn && typeFilterOn && veggieCatFilterOn:
        filteredPlants = filteredPlants.filter(
          (plant) => plant.type.label.toLowerCase() === typeName
        );
        filteredPlants = filteredPlants.filter(
          (plant) =>
            plant.veggie_cat.label.toLowerCase() === veggieCat.toLowerCase()
        );
        filteredPlants = filteredPlants.filter((plant) =>
          plant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setRenderedPlants(filteredPlants);
        setPlantsFiltered(true);
        break;

      case searchFilterOn && typeFilterOn && zoneFilterOn:
        filteredPlants = filteredPlants.filter(
          (plant) => plant.type.label.toLowerCase() === typeName
        );
        filteredPlants = filteredPlants.filter((plant) =>
          plant.zones.some((zone) => parseInt(zone.name) === userZoneNumber)
        );
        filteredPlants = filteredPlants.filter((plant) =>
          plant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setRenderedPlants(filteredPlants);
        setPlantsFiltered(true);
        break;

      case zoneFilterOn && typeFilterOn && veggieCatFilterOn:
        filteredPlants = filteredPlants.filter(
          (plant) => plant.type.label.toLowerCase() === typeName
        );
        filteredPlants = filteredPlants.filter(
          (plant) =>
            plant.veggie_cat.label.toLowerCase() === veggieCat.toLowerCase()
        );
        filteredPlants = filteredPlants.filter((plant) =>
          plant.zones.some((zone) => parseInt(zone.name) === userZoneNumber)
        );
        setRenderedPlants(filteredPlants);
        setPlantsFiltered(true);
        break;

      case searchFilterOn && typeFilterOn:
        filteredPlants = filteredPlants.filter(
          (plant) => plant.type.label.toLowerCase() === typeName
        );
        filteredPlants = filteredPlants.filter((plant) =>
          plant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setRenderedPlants(filteredPlants);
        setPlantsFiltered(true);
        break;

      case searchFilterOn && zoneFilterOn:
        filteredPlants = filteredPlants.filter((plant) =>
          plant.zones.some((zone) => parseInt(zone.name) === userZoneNumber)
        );
        filteredPlants = filteredPlants.filter((plant) =>
          plant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setRenderedPlants(filteredPlants);
        setPlantsFiltered(true);
        break;

      case typeFilterOn && zoneFilterOn:
        filteredPlants = filteredPlants.filter(
          (plant) => plant.type.label.toLowerCase() === typeName
        );
        filteredPlants = filteredPlants.filter((plant) =>
          plant.zones.some((zone) => parseInt(zone.name) === userZoneNumber)
        );
        setRenderedPlants(filteredPlants);
        setPlantsFiltered(true);
        break;

      case typeFilterOn && veggieCatFilterOn:
        filteredPlants = filteredPlants.filter(
          (plant) => plant.type.label.toLowerCase() === typeName
        );
        filteredPlants = filteredPlants.filter(
          (plant) =>
            plant.veggie_cat.label.toLowerCase() === veggieCat.toLowerCase()
        );
        setRenderedPlants(filteredPlants);
        setPlantsFiltered(true);
        break;

      case searchFilterOn:
        filteredPlants = filteredPlants.filter((plant) =>
          plant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setRenderedPlants(filteredPlants);
        setPlantsFiltered(true);
        break;

      case typeFilterOn:
        filteredPlants = filteredPlants.filter(
          (plant) => plant.type.label.toLowerCase() === typeName
        );
        setRenderedPlants(filteredPlants);
        setPlantsFiltered(true);
        break;

      case zoneFilterOn:
        filteredPlants = filteredPlants.filter((plant) => {
          return plant.zones.some(
            (zone) => parseInt(zone.name) === userZoneNumber
          );
        });
        setRenderedPlants(filteredPlants);
        setPlantsFiltered(true);
        break;

      default:
        setRenderedPlants(allPlants);
    }
  }, [
    searchFilterOn,
    typeFilterOn,
    veggieCatFilterOn,
    zoneFilterOn,
    allPlants,
    typeName,
    veggieCat,
    userZoneNumber,
    searchTerm,
  ]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchFilterOn(false);
    }
  }, [searchTerm]);

  const handleTypeClick = (e, buttonId) => {
    !typeFilterOn ? setTypeFilterOn(true) : null;
    setTypeName(e.target.name);
    setVeggieCatFilterOn(false);
    setVeggieCatsToggle(false);
    setLastTBClicked(buttonId);
    setLastVCBClicked(0);
  };

  const handleVeggieClick = (e, buttonId) => {
    !typeFilterOn ? setTypeFilterOn(true) : null;
    lastVCBClicked ? setLastVCBClicked(0) : null;
    setVeggieCatsToggle((prevState) => !prevState);
    setVeggieCatFilterOn(false);
    setTypeName(e.target.name);
    setLastTBClicked(buttonId);
  };

  const handleVeggieCatClick = (e, buttonId) => {
    setVeggieCat(e.target.name);
    setVeggieCatFilterOn(true);
    setLastVCBClicked(buttonId + 1);
  };

  const handleZoneClick = () => {
    setZoneFilterOn((prevState) => !prevState);
  };

  const handleSearch = (e) => {
    setSearchFilterOn(true);
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSearchFilterOn(false);
    setVeggieCatFilterOn(false);
    setVeggieCatsToggle(false);
    setTypeFilterOn(false);
    setZoneFilterOn(false);
    setLastTBClicked(0);
    setLastVCBClicked(0);
  };
  const seeRandomPlant = () => {
    const randomId = Math.floor(Math.random() * allPlants.length);
    navigate(`/plants/${randomId}`);
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

  const displayPlants = () => {
    if (renderedPlants.length > 0) {
      return (
        <>
          <div className="list-header w-[85%]">
            {typeFilterOn && typeName === "veggie" && veggieCatsToggle ? (
              <>
                <div
                  className="arrow"
                  style={{
                    position: "absolute",
                    top: "6.35rem", // Adjusted top value
                    left: "34.65rem",
                    transform: "translateX(-50%)",
                    width: "0",
                    height: "0",
                    borderTop: "8px solid rgb(40, 40, 40)", // Flipped
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderBottom: "8px solid transparent", // Flipped
                  }}
                />
                <div className="absolute left-[17.35rem] top-[6.7rem] flex justify-evenly w-[35rem] h-7 my-2">
                  {veggieCategories.map((category, index) => (
                    <button
                      key={index + 1}
                      name={category}
                      className={`eightbit-btn text-lg ${
                        lastVCBClicked === index + 1 ? "veggie-clicked" : ""
                      }`}
                      onClick={(e) => handleVeggieCatClick(e, index)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
            {(searchFilterOn || typeFilterOn || zoneFilterOn) &&
              !veggieCatsToggle && (
                <button
                  onClick={clearFilters}
                  className="absolute top-[6.97rem] left-[46%] border border-solid border-black rounded-xl px-1 pt-0.5 mt-1"
                >
                  ⓧ clear filters
                </button>
              )}
            {(searchFilterOn || typeFilterOn || zoneFilterOn) &&
              veggieCatsToggle && (
                <button
                  onClick={clearFilters}
                  className="absolute top-[6.97rem] left-[56%] border border-solid border-black rounded-xl px-1 pt-0.5 mt-1"
                >
                  ⓧ clear filters
                </button>
              )}
            {(fullZoneName || locationJustShared) && (
              <div className="text-2xl italic absolute right-[7rem] top-[7rem]">
                You are in zone:
                <span className="text-4xl not-italic pl-3 text-dark-green">
                  {fullZoneName}
                </span>
              </div>
            )}
          </div>
          <div className="list-container pixel-border-green2 w-[85%] grid grid-cols-6 justify-center gap-14 mt-[4.5rem] mb-12 px-8 pt-4 pb-9">
            {renderedPlants.map((plant) => {
              return (
                <div className="" key={plant.id}>
                  <Link
                    to={`/plants/${plant.id}`}
                    className="hover:text-eggshell"
                  >
                    <div className="border-step4">
                      <div className="image-container">
                        <img src={plant.image} alt="Plant Image" />
                      </div>
                    </div>
                    <div className="plant-name leading-5 text-[1.2rem] text-center -mb-8 mt-1">
                      {plant.name}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      );
    } else if (
      allPlants &&
      allPlants.length &&
      plantsFiltered &&
      userZoneNumber
    ) {
      return (
        <h3 className="text-xl w-[85%] my-8 p-8 pixel-border-green2 text-center">
          No plants found :(
        </h3>
      );
    } else {
      return (
        <h3 className="text-xl w-[85%] my-8 p-8 pixel-border-green2 text-center">
          Loading Plants...
        </h3>
      );
    }
  };

  return (
    <div className="comp-container bg-amber-100 flex flex-col justify-start items-center relative z-4 min-h-[80vh]">
      <div className="title search-bar flex w-[85%] mt-2 mb-4 relative">
        <div className="title text-3xl mx-auto font-bold">Browse Plants:</div>
        <button
          className="add-plant-button text-2xl text-light-green-900 absolute left-0 underline underline-offset-[3px] flex justify-center items-center h-[2.5rem]"
          onClick={() => {
            navigate("/plants/newplant");
          }}
        >
          Add Plant
          <img
            className="h-[1.8rem] ml-1 mb-1.5"
            src={seedling}
            alt="Seedling"
          />
        </button>
        <div className="random-btn absolute left-[11rem] text-2xl text-light-green-900 underline underline-offset-[3px] top-1 flex justify-center items-center">
          <button onClick={seeRandomPlant}>
            Random Plant
            <img
              className="h-[1.3rem] ml-1.5 inline-block"
              src={sparkle}
              alt="sparkle"
            />
          </button>
        </div>
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
      <div className="primary-buttons-container flex justify-center items-center relative w-[85%] h-9 mb-2">
        <div className="type-buttons flex w-[37rem] justify-evenly">
          <div className="button2 brown">
            <button
              name="veggie"
              className={`text-xl ${lastTBClicked === 1 ? "clicked" : ""}`}
              onClick={(e) => {
                handleVeggieClick(e, 1);
              }}
            >
              Veggies
            </button>
          </div>
          <div className="button2 green">
            <button
              name="herb"
              className={`text-xl ${lastTBClicked === 2 ? "clicked" : ""}`}
              onClick={(e) => {
                handleTypeClick(e, 2);
              }}
            >
              Herbs
            </button>
          </div>
          <div className="button2 blue">
            <button
              name="flower"
              className={`text-xl ${lastTBClicked === 3 ? "clicked" : ""}`}
              onClick={(e) => {
                handleTypeClick(e, 3);
              }}
            >
              Flowers
            </button>
          </div>
          <div className="button2 red">
            <button
              name="fruit"
              className={`text-xl ${lastTBClicked === 4 ? "clicked" : ""}`}
              onClick={(e) => {
                handleTypeClick(e, 4);
              }}
            >
              Fruit
            </button>
          </div>
        </div>

        <div className="zone-toggle flex items-center absolute -top-1 -right-4 ">
          <button
            className="w-16 h-[1.85rem] static justify-end"
            onClick={handleZoneClick}
          >
            <img
              className="w-full h-full object-cover"
              src={zoneFilterOn ? onSwitch : offSwitch}
              alt="zone toggle button"
            />
          </button>
          <div className="w-[6rem] ml-3 text-[1rem] font-bold">
            Only plants in my zone
          </div>
        </div>
      </div>

      {displayPlants()}
    </div>
  );
};
