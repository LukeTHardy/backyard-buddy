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
    annual: "",
    spacing: 0,
    height: 0,
    days_to_mature: 0,
    image: "",
    icon: "",
    zones: 0,
    companions: "",
    plants: 0,
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

  const handleInputChange = (e) => {
    const plantCopy = { ...newPlant };
    plantCopy[e.target.name] = e.target.value;
    setNewPlant(plantCopy);
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
    <div className="form-container">
      <form className="new-loc-form">
        <h2 className="form-title">New Plant</h2>
        <fieldset>
          <div className="name-field">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              value={newPlant.name}
              name="name"
              type="text"
              className="form-control"
              placeholder=""
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="description-field">
            <label htmlFor="imageUrl">Description</label>
            <input
              id="description"
              value={newPlant.description}
              name="description"
              type="text"
              className="form-control"
              placeholder=""
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <div className="type-container">
          <div className="type-title">Plant Type:</div>
          <div className="select-container">
            <select
              name="type"
              onChange={handleInputChange}
              value={newPlant.type}
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
        <div className="veggieCat-container">
          <div className="veggieCat-title">Veggie Category:</div>
          <div className="select-container">
            <select
              name="veggie_cat"
              onChange={handleInputChange}
              value={newPlant.veggie_cat}
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
        </div>
        <div className="soil-container">
          <div className="soil-title">Soil:</div>
          <div className="select-container">
            <select
              name="soil"
              onChange={handleInputChange}
              value={newPlant.soil}
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
        <div className="water-container">
          <div className="water-title">Water:</div>
          <div className="select-container">
            <select
              name="water"
              onChange={handleInputChange}
              value={newPlant.water}
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
        <div className="light-container">
          <div className="light-title">Light:</div>
          <div className="select-container">
            <select
              name="light"
              onChange={handleInputChange}
              value={newPlant.light}
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
          <div className="annual-container">
            <label htmlFor="annual">Annual/Perennial:</label>
            <input
              id="annual"
              value={newPlant.annual}
              name="annual"
              type="text"
              className="form-control"
              placeholder="Annual/Perennial"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="height-container">
            <label htmlFor="height">Height:</label>
            <input
              id="height"
              value={newPlant.height}
              name="height"
              type="text"
              className="form-control"
              placeholder="Enter Height (in.)"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="spacing-container">
            <label htmlFor="spacing">Spacing:</label>
            <input
              id="spacing"
              value={newPlant.spacing}
              name="spacing"
              type="text"
              className="form-control"
              placeholder="Enter Spacing (in.)"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="days-to-mature-container">
            <label htmlFor="days_to_mature">Days To Mature:</label>
            <input
              id="days_to_mature"
              value={newPlant.days_to_mature}
              name="days_to_mature"
              type="text"
              className="form-control"
              placeholder="Number of Days"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="image-container">
            <label htmlFor="image">Image Upload:</label>
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
          <div className="icon-container">
            <label htmlFor="icon">Icon Upload:</label>
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
          <label htmlFor="zones" className="zones-title">
            Zones:
          </label>
          <div className="select-container w-[20rem]">
            <Select
              options={zoneOptions}
              isMulti
              closeMenuOnSelect={false}
              onChange={handleZoneSelect}
            />
          </div>
        </div>
        <div className="companions-container flex">
          <label htmlFor="companions" className="companions-title">
            Companions:
          </label>
          <div className="select-container w-[20rem]">
            <Select
              options={companionOptions}
              isMulti
              closeMenuOnSelect={false}
              onChange={handleCompanionSelect}
            />
          </div>
        </div>
        <div className="critters-container flex">
          <label htmlFor="critters" className="critters-title">
            Critters:
          </label>
          <div className="select-container w-[20rem]">
            <Select
              options={critterOptions}
              isMulti
              closeMenuOnSelect={false}
              onChange={handleCritterSelect}
            />
          </div>
        </div>
        <button className="save-btn" onClick={handleSave}>
          Save Plant
        </button>
      </form>
    </div>
  );
};
