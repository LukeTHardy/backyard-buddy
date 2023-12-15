import { createPlant } from "../../services/PlantServices";
import {
  fetchSoils,
  fetchWaters,
  fetchLights,
  fetchPlantTypes,
  fetchVeggieCats,
  fetchZones,
  createPlantZonePairing,
  createCompanionPairing,
  createPlantCritterPairing,
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
  const [newPlant, setNewPlant] = useState({
    name: "",
    description: "",
    type: "",
    veggie_cat: 0,
    soil: 0,
    water: 0,
    light: 0,
    height: "",
    spacing: "",
    days_to_mature: "",
  });

  useEffect(() => {
    fetchAllPlants().then((plantsArray) => {
      setPlants(plantsArray);
    });
  }, []);
  useEffect(() => {
    fetchAllCritters().then((crittersArray) => {
      setCritters(crittersArray);
    });
  }, []);
  useEffect(() => {
    fetchSoils().then((soilsArray) => {
      setSoils(soilsArray);
    });
  }, []);
  useEffect(() => {
    fetchWaters().then((watersArray) => {
      setWaters(watersArray);
    });
  }, []);
  useEffect(() => {
    fetchLights().then((lightsArray) => {
      setLights(lightsArray);
    });
  }, []);
  useEffect(() => {
    fetchPlantTypes().then((typesArray) => {
      setPlantTypes(typesArray);
    });
  }, []);
  useEffect(() => {
    fetchVeggieCats().then((catsArray) => {
      setVeggieCats(catsArray);
    });
  }, []);
  useEffect(() => {
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
  const createZonePairings = (plantId) => {
    selectedZones.map((zoneId) => {
      const newPairing = {
        plant: plantId,
        zone: zoneId,
      };
      createPlantZonePairing(newPairing);
    });
  };
  const createPlantPairings = (plantId) => {
    selectedPlants.map((companionId) => {
      const newPairing = {
        plant1: plantId,
        plant2: companionId,
      };
      createCompanionPairing(newPairing);
    });
  };
  const createCritterPairings = (plantId) => {
    selectedCritters.map((critterId) => {
      const newPairing = {
        plant: plantId,
        critter: critterId,
      };
      createPlantCritterPairing(newPairing);
    });
  };
  const handleInputChange = (e) => {
    const plantCopy = { ...newPlant };
    plantCopy[e.target.name] = e.target.value;
    setNewPlant(plantCopy);
  };

  const handleSave = () => {
    // e.preventDefault();

    const newPlantObj = {
      name: newPlant.name,
      description: newPlant.description,
      type: parseInt(newPlant).type,
      veggie_cat: parseInt(newPlant.veggie_cat),
      soil: parseInt(newPlant.soil),
      water: parseInt(newPlant.water),
      light: parseInt(newPlant.light),
      height: parseInt(newPlant.height),
      annual: newPlant.annual,
      spacing: newPlant.spacing,
      days_to_mature: newPlant.days_to_mature,
      image: newPlant.image,
      icon: newPlant.icon,
    };

    createPlant(newPlantObj)
      .then((createdPlant) => {
        const newPlantId = createdPlant.id;
        createZonePairings(newPlantId)
          .then(createPlantPairings(newPlantId))
          .then(createCritterPairings(newPlantId));
        navigate(`/plants/${newPlantId}`);
      })
      .catch((error) => {
        console.error("Error creating plant:", error);
      });
  };

  return (
    <div className="comp-container flex flex-col justify-center items-center">
      <h2 className="form-title mt-8 text-2xl">New Plant</h2>
      <div className="fields-container flex justify-center mt-4">
        <div className="left-side-fields flex flex-col mx-4 w-[20rem]">
          <fieldset>
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
          </fieldset>
          <fieldset>
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
          </fieldset>
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
          <fieldset>
            <div className="annual-container flex select-input w-[16rem]">
              <label className="mr-2">Lifecycle:</label>
              <div>
                <label>
                  <input
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
          </fieldset>
        </div>
        <div className="right-side-fields flex flex-col mx-4 w-[20rem]">
          <fieldset>
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
          </fieldset>
          <fieldset>
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
          </fieldset>
          <fieldset>
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
          </fieldset>
          <fieldset>
            <div className="image-container flex upload-input">
              <label htmlFor="image" className="mr-2">
                Image Upload:
              </label>
              <input
                id="image"
                value={newPlant.image}
                name="image"
                type="text"
                className="form-control"
                placeholder=""
                onChange={handleInputChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="icon-container flex upload-input">
              <label htmlFor="icon" className="mr-2">
                Icon Upload:
              </label>
              <input
                id="icon"
                value={newPlant.icon}
                name="icon"
                type="text"
                className="form-control"
                placeholder=""
                onChange={handleInputChange}
              />
            </div>
          </fieldset>
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
