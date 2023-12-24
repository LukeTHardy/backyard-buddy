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
    days_to_mature: "",
    image: "",
    icon: "",
  });

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

  const isFormValid = () => {
    if (
      !newPlant.name ||
      !newPlant.description ||
      !newPlant.type ||
      newPlant.type === "0" ||
      !newPlant.veggie_cat ||
      newPlant.veggie_cat === "0" ||
      !newPlant.soil ||
      newPlant.soil === "0" ||
      !newPlant.water ||
      newPlant.water === "0" ||
      !newPlant.light ||
      newPlant.light === "0" ||
      !newPlant.height ||
      !newPlant.annual ||
      !newPlant.spacing ||
      !newPlant.days_to_mature ||
      selectedCritters.length === 0 ||
      selectedPlants.length === 0 ||
      selectedZones.length === 0 ||
      !b64ImageString ||
      !b64IconString
    ) {
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    try {
      if (!isFormValid()) {
        console.error("Please fill in all fields before saving.");
        window.alert(
          `Congratulations, you found a secret message that says fill out all the fields before saving :)`
        );
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
        days_to_mature: newPlant.days_to_mature,
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
    <div className="comp-container flex flex-col justify-center items-center">
      <h2 className="form-title mt-8 text-2xl">New Plant</h2>
      <div className="fields-container flex justify-center mt-4">
        <div className="left-side-fields flex flex-col mx-4 w-[20rem]">
          <div className="name-field flex">
            <label htmlFor="name" className="mr-2">
              Name:
            </label>
            <input
              id="name"
              value={newPlant.name}
              name="name"
              type="text"
              className="text-input"
              placeholder=" Enter Plant Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="description-field flex">
            <label htmlFor="description" className="mr-2">
              Description:
            </label>
            <input
              id="description"
              value={newPlant.description}
              name="description"
              type="text"
              className="text-input"
              placeholder=" Enter Plant Description"
              onChange={handleInputChange}
            />
          </div>
          <div className="type-container flex select-input">
            <div className="type-title mr-2">Plant Type:</div>
            <div className="select-container">
              <select
                name="type"
                onChange={handleInputChange}
                value={newPlant.type}
                placeholder="Select a Type"
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
          </div>
          <div className="veggieCat-container flex select-input">
            <div className="veggieCat-title mr-2">Veggie Category:</div>
            <div className="select-container">
              <select
                name="veggie_cat"
                onChange={handleInputChange}
                value={newPlant.veggie_cat}
                placeholder="Select a Category"
              >
                <option value={0}>Select a Category</option>
                {veggieCats.map((catObj) => {
                  return (
                    <option key={catObj.id} value={catObj.id}>
                      {catObj.label}
                    </option>
                  );
                })}
                <option value={8}>N/A (not a veggie)</option>
              </select>
            </div>
          </div>
          <div className="soil-container flex select-input">
            <div className="soil-title mr-2">Soil:</div>
            <div className="select-container">
              <select
                name="soil"
                onChange={handleInputChange}
                value={newPlant.soil}
                placeholder="Select a Soil Type"
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
          </div>
          <div className="water-container flex select-input">
            <div className="water-title mr-2">Water:</div>
            <div className="select-container">
              <select
                name="water"
                onChange={handleInputChange}
                value={newPlant.water}
                placeholder="Select a Frequency"
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
          </div>
          <div className="light-container flex select-input">
            <div className="light-title mr-2">Light:</div>
            <div className="select-container">
              <select
                name="light"
                onChange={handleInputChange}
                value={newPlant.light}
                placeholder="Select a Light Level"
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
          </div>
          <div className="annual-container flex select-input w-[16rem]">
            <label htmlFor="annual" className="mr-2">
              Lifecycle:
            </label>
            <div>
              <label>
                <input
                  id="annual"
                  type="radio"
                  name="annual"
                  value={true}
                  className="mx-1"
                  onChange={handleInputChange}
                />
                Annual
              </label>

              <label className="mx-1">
                <input
                  id="perennial"
                  type="radio"
                  name="annual"
                  value={false}
                  className="mx-1"
                  onChange={handleInputChange}
                />
                Perennial
              </label>
            </div>
          </div>
        </div>
        <div className="right-side-fields flex flex-col mx-4 w-[20rem]">
          <div className="height-container flex">
            <label htmlFor="height" className="mr-2">
              Height:
            </label>
            <input
              id="height"
              value={newPlant.height}
              name="height"
              type="text"
              className="text-input"
              placeholder=" Enter Height (in.)"
              onChange={handleInputChange}
            />
          </div>
          <div className="spacing-container flex">
            <label htmlFor="spacing" className="mr-2">
              Spacing:
            </label>
            <input
              id="spacing"
              value={newPlant.spacing}
              name="spacing"
              type="text"
              className="text-input"
              placeholder=" Enter Spacing (in.)"
              onChange={handleInputChange}
            />
          </div>
          <div className="days-to-mature-container flex">
            <label htmlFor="days_to_mature" className="mr-2">
              Days To Mature:
            </label>
            <input
              id="days_to_mature"
              value={newPlant.days_to_mature}
              name="days_to_mature"
              type="text"
              className="text-input"
              placeholder=" Number of Days"
              onChange={handleInputChange}
            />
          </div>
          <div className="image-container flex upload-input">
            <label htmlFor="image" className="mr-2">
              Image Upload:
            </label>
            <input type="file" id="image" onChange={createImageString} />
          </div>
          <div className="icon-container flex upload-input">
            <label htmlFor="icon" className="mr-2">
              Icon Upload:
            </label>
            <input type="file" id="icon" onChange={createIconString} />
          </div>
          <div className="zones-container flex">
            <span className="zones-title mr-2">Zones:</span>
            <div className="select-container select-input">
              <Select
                options={zoneOptions}
                isMulti
                closeMenuOnSelect={false}
                onChange={handleZoneSelect}
              />
            </div>
          </div>
          <div className="companions-container flex">
            <span className="companions-title mr-2">Companions:</span>
            <div className="select-container select-input">
              <Select
                options={companionOptions}
                isMulti
                closeMenuOnSelect={false}
                onChange={handleCompanionSelect}
              />
            </div>
          </div>
          <div className="critters-container flex">
            <span className="critters-title mr-2">Critters:</span>
            <div className="select-container select-input">
              <Select
                options={critterOptions}
                isMulti
                closeMenuOnSelect={false}
                onChange={handleCritterSelect}
              />
            </div>
          </div>
        </div>
      </div>
      <button className="bb-button" onClick={handleSave}>
        Save Plant
      </button>
    </div>
  );
};
