import { createPlant } from "../../services/PlantServices";
import {
  fetchSoils,
  fetchWaters,
  fetchLights,
  fetchPlantTypes,
  fetchVeggieCats,
  fetchZones,
} from "../../services/MiscServices";
import { fetchAllPlants } from "../../services/PlantServices";
import { fetchAllCritters } from "../../services/CritterServices";
import growingplant from "/assets/graphics/growing_plant.gif";
import staticflower from "/assets/graphics/flower_after2.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./Forms.css";

export const NewPlant = () => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [critters, setCritters] = useState([]);
  const [soils, setSoils] = useState([]);
  const [waters, setWaters] = useState([]);
  const [lights, setLights] = useState([]);
  const [plantTypes, setPlantTypes] = useState([]);
  const [veggieCats, setVeggieCats] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedZones, setSelectedZones] = useState([]);
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [selectedCritters, setSelectedCritters] = useState([]);
  const [b64ImageString, setB64ImageString] = useState("");
  const [b64IconString, setB64IconString] = useState("");
  const [newPlant, setNewPlant] = useState({
    name: "",
    description: "",
    type: 0,
    veggie_cat: 0,
    soil: 0,
    water: 0,
    light: 0,
    height: "",
    spacing: "",
    maturity: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showFirstImage, setShowFirstImage] = useState(true);

  useEffect(() => {
    fetchAllPlants().then((plantsArray) => {
      setPlants(plantsArray);
    });
    fetchAllCritters().then((crittersArray) => {
      setCritters(crittersArray);
    });
    fetchSoils().then((soilsArray) => {
      setSoils(soilsArray);
    });
    fetchWaters().then((watersArray) => {
      setWaters(watersArray);
    });
    fetchLights().then((lightsArray) => {
      setLights(lightsArray);
    });
    fetchPlantTypes().then((typesArray) => {
      setPlantTypes(typesArray);
    });
    fetchVeggieCats().then((catsArray) => {
      setVeggieCats(catsArray);
    });
    fetchZones().then((zonesArray) => {
      setZones(zonesArray);
    });
  }, []);

  useEffect(() => {
    const areArraysNonEmpty =
      selectedZones.length !== 0 &&
      selectedPlants.length !== 0 &&
      selectedCritters.length !== 0;
    const areNewPlantPropertiesTruthy = Object.values(newPlant).every(
      (prop) => prop !== "" && prop !== "0"
    );
    const isImageValid = !!b64ImageString && !!b64IconString;

    setIsFormValid(
      areArraysNonEmpty && areNewPlantPropertiesTruthy && isImageValid
    );
  }, [
    selectedZones,
    selectedPlants,
    selectedCritters,
    b64ImageString,
    b64IconString,
    newPlant,
  ]);

  useEffect(() => {
    if (isFormValid) {
      const timeoutId = setTimeout(() => {
        setShowFirstImage(false);
      }, 1400);

      return () => clearTimeout(timeoutId);
    } else {
      // Reset showFirstImage if isFormValid becomes false
      setShowFirstImage(true);
    }
  }, [isFormValid]);

  const zoneOptions = zones.map((zone) => ({
    value: zone.id,
    label: zone.name,
  }));
  const critterOptions = critters.map((zone) => ({
    value: zone.id,
    label: zone.name,
  }));
  const companionOptions = plants.map((zone) => ({
    value: zone.id,
    label: zone.name,
  }));

  const handleZoneSelect = (options) => {
    const optionValues = options.map((option) => option.value);
    setSelectedZones(optionValues);
  };
  const handleCompanionSelect = (options) => {
    const optionValues = options.map((option) => option.value);
    setSelectedPlants(optionValues);
  };
  const handleCritterSelect = (options) => {
    const optionValues = options.map((option) => option.value);
    setSelectedCritters(optionValues);
  };

  const handleInputChange = (e) => {
    const plantCopy = { ...newPlant };
    plantCopy[e.target.name] = e.target.value;
    setNewPlant(plantCopy);
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createImageString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
      setB64ImageString(base64ImageString);
    });
  };
  const createIconString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
      setB64IconString(base64ImageString);
    });
  };

  const handleSave = async () => {
    try {
      if (!isFormValid) {
        window.alert(`Fill out the whole thing silly`);
        return;
      }
      const newPlantObj = {
        name: newPlant.name,
        description: newPlant.description,
        type: parseInt(newPlant.type),
        veggie_cat: parseInt(newPlant.veggie_cat),
        soil: parseInt(newPlant.soil),
        water: parseInt(newPlant.water),
        light: parseInt(newPlant.light),
        height: parseInt(newPlant.height),
        annual: JSON.parse(newPlant.annual),
        spacing: newPlant.spacing,
        maturity: newPlant.maturity,
        image: b64ImageString,
        icon: b64IconString,
        zones: selectedZones,
        companions: selectedPlants,
        critters: selectedCritters,
      };

      const response = await createPlant(newPlantObj);
      const newPlantId = response.id;
      navigate(`/plants/${newPlantId}`);
    } catch (error) {
      console.error("Error creating plant:", error);
    }
  };

  return (
    <div className="comp-container flex flex-col justify-start items-center bg-amber-100 min-h-[100vh] relative">
      <h2 className="form-title my-2 text-3xl">New Plant:</h2>
      <div className="fields-container flex justify-center">
        <div className="left-side-fields flex flex-col justify-evenly mx-4 w-[25rem]">
          <div className="name-field flex items-center">
            <label htmlFor="name" className="mr-2 text-2xl">
              Name:
            </label>
            <input
              id="name"
              value={newPlant.name}
              name="name"
              type="text"
              className="text-input text-xl border-solid border-black border-[1px] rounded-md pl-2 h-[1.8rem] my-[0.5rem] overflow-x-hidden flex-1"
              placeholder="Enter Plant Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="description-field flex items-center">
            <label htmlFor="description" className="mr-2 text-2xl">
              Description:
            </label>
            <textarea
              id="description"
              value={newPlant.description}
              name="description"
              className="text-input text-md leading-4 border-solid border-black border-[1px] rounded-md pl-2 pt-2 h-[3rem] my-[0.5rem] overflow-x-hidden flex-1"
              placeholder="Enter Plant Description"
              onChange={handleInputChange}
            />
          </div>
          <div className="type-container flex items-center">
            <div className="type-title mr-2 text-2xl">Plant Type:</div>
            <select
              name="type"
              onChange={handleInputChange}
              value={newPlant.type}
              placeholder="Select a Type"
              className="text-xl border-solid border-black border-[1px] rounded-md pl-2 h-[1.8rem] my-[0.5rem] overflow-x-hidden flex-1"
            >
              <option value={0}>Select a type</option>
              {plantTypes.map((typeObj) => {
                return (
                  <option key={typeObj.id} value={typeObj.id}>
                    {typeObj.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="veggieCat-container flex items-center">
            <div className="veggieCat-title mr-2 text-2xl">
              Veggie Category:
            </div>
            <select
              name="veggie_cat"
              onChange={handleInputChange}
              value={newPlant.veggie_cat}
              placeholder="Select a Category"
              className="text-xl border-solid border-black border-[1px] rounded-md pl-2 h-[1.8rem] my-[0.5rem] overflow-x-hidden flex-1"
            >
              <option value={0}>Select a category</option>
              {veggieCats.map((catObj) => {
                return (
                  <option key={catObj.id} value={catObj.id}>
                    {catObj.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="soil-container flex items-center">
            <div className="soil-title mr-2 text-2xl">Soil:</div>

            <select
              name="soil"
              onChange={handleInputChange}
              value={newPlant.soil}
              placeholder="Select a Soil Type"
              className="text-xl border-solid border-black border-[1px] rounded-md pl-2 h-[1.8rem] my-[0.5rem] overflow-x-hidden flex-1"
            >
              <option value={0}>Select a type</option>
              {soils.map((soilObj) => {
                return (
                  <option key={soilObj.id} value={soilObj.id}>
                    {soilObj.soil_type}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="water-container flex items-center">
            <div className="water-title mr-2 text-2xl">Water:</div>

            <select
              name="water"
              onChange={handleInputChange}
              value={newPlant.water}
              placeholder="Select a Frequency"
              className="text-xl border-solid border-black border-[1px] rounded-md pl-2 h-[1.8rem] my-[0.5rem] overflow-x-hidden flex-1"
            >
              <option value={0}>Select a watering frequency</option>
              {waters.map((waterObj) => {
                return (
                  <option key={waterObj.id} value={waterObj.id}>
                    {waterObj.frequency}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="light-container flex items-center">
            <div className="light-title mr-2 text-2xl">Light:</div>

            <select
              name="light"
              onChange={handleInputChange}
              value={newPlant.light}
              placeholder="Select a Light Level"
              className="text-xl border-solid border-black border-[1px] rounded-md pl-2 h-[1.8rem] my-[0.5rem] overflow-x-hidden flex-1"
            >
              <option value={0}>Select a light level</option>
              {lights.map((lightObj) => {
                return (
                  <option key={lightObj.id} value={lightObj.id}>
                    {lightObj.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="annual-container flex items-center select-input w-[25rem]">
            <label htmlFor="annual" className="text-2xl">
              Lifecycle:
            </label>
            <div className="w-[25rem]">
              <label className="text-xl">
                <input
                  id="annual"
                  type="radio"
                  name="annual"
                  value={true}
                  className="mx-2"
                  onChange={handleInputChange}
                />
                Annual
              </label>

              <label className="text-xl">
                <input
                  id="perennial"
                  type="radio"
                  name="annual"
                  value={false}
                  className="mx-2"
                  onChange={handleInputChange}
                />
                Perennial
              </label>
            </div>
          </div>
        </div>
        <div className="right-side-fields flex flex-col justify-evenly mx-4 w-[25rem]">
          <div className="height-container flex items-center">
            <label htmlFor="height" className="mr-2 text-2xl">
              Height:
            </label>
            <input
              id="height"
              value={newPlant.height}
              name="height"
              type="text"
              className="text-input text-xl border-solid border-black border-[1px] rounded-md pl-2 h-[1.8rem] mt-[0.7rem] mb-[0.5rem] overflow-x-hidden flex-1"
              placeholder="Enter Height (inches)"
              onChange={handleInputChange}
            />
          </div>
          <div className="spacing-container flex items-center">
            <label htmlFor="spacing" className="mr-2 text-2xl">
              Spacing:
            </label>
            <input
              id="spacing"
              value={newPlant.spacing}
              name="spacing"
              type="text"
              className="text-input text-xl border-solid border-black border-[1px] rounded-md pl-2 h-[1.8rem] my-[0.5rem] overflow-x-hidden flex-1"
              placeholder="Enter Spacing (inches)"
              onChange={handleInputChange}
            />
          </div>
          <div className="maturity-container flex items-center">
            <label htmlFor="maturity" className="mr-2 text-2xl">
              Time to Maturity:
            </label>
            <input
              id="maturity"
              value={newPlant.maturity}
              name="maturity"
              type="text"
              className="text-input text-xl border-solid border-black border-[1px] rounded-md pl-2 h-[1.8rem] my-[0.5rem] overflow-x-hidden flex-1"
              placeholder="Number and unit"
              onChange={handleInputChange}
            />
          </div>
          <div className="image-upload flex items-center">
            <label htmlFor="image" className="mr-2 text-2xl">
              Image Upload:
            </label>
            <input
              type="file"
              id="image"
              onChange={createImageString}
              className="pl-2 h-[1.9rem] my-[0.5rem] overflow-x-hidden flex-1"
            />
          </div>
          <div className="icon-upload flex items-center">
            <label htmlFor="icon" className="mr-2 text-2xl">
              Icon Upload:
            </label>
            <input
              type="file"
              id="icon"
              onChange={createIconString}
              className="pl-2 h-[1.9rem] my-[0.5rem] overflow-x-hidden flex-1"
            />
          </div>
          <div className="zones-container flex items-center">
            <span className="zones-title mr-2 text-2xl">Zones:</span>
            <div className="pl-2 h-[2.5rem] my-[0.5rem] overflow-x-hidden flex-1">
              <Select
                options={zoneOptions}
                isMulti
                closeMenuOnSelect={false}
                onChange={handleZoneSelect}
                maxMenuHeight={160}
              />
            </div>
          </div>
          <div className="companions-container flex items-center">
            <span className="companions-title mr-2 text-2xl">Companions:</span>
            <div className="pl-2 h-[2.5rem] my-[0.5rem] overflow-x-hidden flex-1">
              <Select
                options={companionOptions}
                isMulti
                closeMenuOnSelect={false}
                onChange={handleCompanionSelect}
                maxMenuHeight={160}
              />
            </div>
          </div>
          <div className="critters-container flex items-center">
            <span className="critters-title mr-2 text-2xl">Critters:</span>
            <div className="pl-2 h-[2.5rem] my-[0.5rem] overflow-x-hidden flex-1">
              <Select
                options={critterOptions}
                isMulti
                closeMenuOnSelect={false}
                onChange={handleCritterSelect}
                maxMenuHeight={160}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="save-btn relative">
        <button className="bb-button" onClick={handleSave}>
          Save Plant
        </button>
        {isFormValid && (
          <>
            {showFirstImage ? (
              <img
                src={growingplant}
                className="h-[3rem] absolute top-1 right-[-2.5rem]"
                alt="growing plant"
              />
            ) : (
              <img
                src={staticflower}
                className="h-[3rem] absolute top-1 right-[-2.5rem]"
                alt="static flower"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
