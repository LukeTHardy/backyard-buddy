import { createPlant } from "../../services/PlantServices";
import { fetchSoils } from "../../services/MiscServices";
import { fetchWaters } from "../../services/MiscServices";
import { fetchLights } from "../../services/MiscServices";
import { fetchPlantTypes } from "../../services/MiscServices";
import { fetchVeggieCats } from "../../services/MiscServices";
import { fetchZones } from "../../services/MiscServices";
// import { fetchPlant } from "../../services/PlantServices";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewPlant = () => {
  const navigate = useNavigate();
  const [soils, setSoils] = useState([]);
  const [waters, setWaters] = useState([]);
  const [lights, setLights] = useState([]);
  const [plantTypes, setPlantTypes] = useState([]);
  const [veggieCats, setVeggieCats] = useState([]);
  const [zones, setZones] = useState([]);
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
      zones: newPlant.zones,
      companions: newPlant.companions,
      critters: newPlant.critters,
    };

    createPlant(newPlantObj).then(navigate("/plants"));
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
              name="typeId"
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
        <div className="state-container">
          <div className="state-title">Soil:</div>
          <div className="select-container">
            <select
              name="stateId"
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
        <div className="state-container">
          <div className="state-title">Water:</div>
          <div className="select-container">
            <select
              name="stateId"
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
        <div className="state-container">
          <div className="state-title">Light:</div>
          <div className="select-container">
            <select
              name="stateId"
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
              placeholder=""
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
              placeholder=""
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
              placeholder=""
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
        <div className="zones-container">
          <div className="zones-title">Light:</div>
          <div className="select-container">
            <select
              name="zones"
              onChange={handleInputChange}
              value={newPlant.zones}
            >
              <option value={0}>Select zones</option>
              {zones.map((zoneObj) => {
                return (
                  <option key={zoneObj.id} value={zoneObj.id}>
                    {zoneObj.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <fieldset>
          <div className="companions-container">
            <label htmlFor="companions">Companion Plants:</label>
            <input
              id="companions"
              value={newPlant.companions}
              name="companions"
              type="text"
              className="form-control"
              placeholder=""
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="critters-container">
            <label htmlFor="critters">Critters:</label>
            <input
              id="critters"
              value={newPlant.critters}
              name="critters"
              type="text"
              className="form-control"
              placeholder=""
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <button className="save-btn" onClick={handleSave}>
          Save Plant
        </button>
      </form>
    </div>
  );
};
