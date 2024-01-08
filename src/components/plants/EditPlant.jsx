import {
  updatePlant,
  fetchPlant,
  fetchAllPlants,
} from "../../services/PlantServices";
import { fetchAllCritters } from "../../services/CritterServices";
import {
  fetchSoils,
  fetchWaters,
  fetchLights,
  fetchPlantTypes,
  fetchVeggieCats,
  fetchZones,
} from "../../services/MiscServices";
// import { CustomFileInput } from "../misc/CustomFileInput";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import "./Forms.css";

export const EditPlant = () => {
  const navigate = useNavigate();
  const { plantId } = useParams();
  const [originalPlant, setOriginalPlant] = useState({
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
    image: "",
    icon: "",
    zones: [],
    companions: [],
    critters: [],
  });
  const [plantToEdit, setPlantToEdit] = useState({
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
    image: "",
    icon: "",
    zones: [],
    companions: [],
    critters: [],
  });
  const [companions, setCompanions] = useState([]);
  const [critters, setCritters] = useState([]);
  const [soils, setSoils] = useState([]);
  const [waters, setWaters] = useState([]);
  const [lights, setLights] = useState([]);
  const [plantTypes, setPlantTypes] = useState([]);
  const [veggieCats, setVeggieCats] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedZones, setSelectedZones] = useState([]);
  const [selectedCritters, setSelectedCritters] = useState([]);
  const [selectedCompanions, setSelectedCompanions] = useState([]);
  const [userChangedSelections, setUserChangedSelections] = useState(false);
  const [b64ImageString, setB64ImageString] = useState("");
  const [b64IconString, setB64IconString] = useState("");

  useEffect(() => {
    fetchPlant(plantId).then((plantObj) => {
      setOriginalPlant(plantObj);
    });
    fetchAllPlants().then((plantsArray) => {
      setCompanions(plantsArray);
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
  }, [plantId]);

  useEffect(() => {
    const zoneArray = originalPlant.zones.map((z) => z.id);
    const companionArray = originalPlant.companions.map((c) => c.id);
    const critterArray = originalPlant.critters.map((cr) => cr.id);

    setPlantToEdit({
      name: originalPlant.name,
      description: originalPlant.description,
      type: originalPlant.type.id,
      veggie_cat: originalPlant.veggie_cat.id,
      soil: originalPlant.soil.id,
      water: originalPlant.water.id,
      light: originalPlant.light.id,
      height: originalPlant.height,
      spacing: originalPlant.spacing,
      maturity: originalPlant.maturity,
      image: "",
      icon: "",
      annual: originalPlant.annual,
      zones: zoneArray,
      companions: companionArray,
      critters: critterArray,
    });
  }, [originalPlant]);

  const handleZonesChange = (selectedOptions) => {
    setSelectedZones(selectedOptions);
    setUserChangedSelections(true);
  };

  const handleCrittersChange = (selectedOptions) => {
    setSelectedCritters(selectedOptions);
    setUserChangedSelections(true);
  };

  const handleCompanionsChange = (selectedOptions) => {
    setSelectedCompanions(selectedOptions);
    setUserChangedSelections(true);
  };

  useEffect(() => {
    if (originalPlant && !userChangedSelections) {
      setSelectedCompanions(
        originalPlant.companions.map((c) => ({
          value: c.id,
          label: c.name,
        }))
      );
      setSelectedZones(
        originalPlant.zones.map((z) => ({
          value: z.id,
          label: z.name,
        }))
      );
      setSelectedCritters(
        originalPlant.critters.map((cr) => ({
          value: cr.id,
          label: cr.name,
        }))
      );
    }
  }, [originalPlant, userChangedSelections]);

  const handleInputChange = (e) => {
    const plantCopy = { ...plantToEdit };
    plantCopy[e.target.name] = e.target.value;
    setPlantToEdit(plantCopy);
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

  const handleSave = () => {
    try {
      const updatedZones = selectedZones.map((zone) => zone.value);
      const updatedCritters = selectedCritters.map((critter) => critter.value);
      const updatedCompanions = selectedCompanions.map(
        (companion) => companion.value
      );
      const editedPlant = {
        id: parseInt(plantId),
        name: plantToEdit.name,
        description: plantToEdit.description,
        type: parseInt(plantToEdit.type),
        veggie_cat: parseInt(plantToEdit.veggie_cat),
        soil: parseInt(plantToEdit.soil),
        water: parseInt(plantToEdit.water),
        light: parseInt(plantToEdit.light),
        height: parseInt(plantToEdit.height),
        annual: JSON.parse(plantToEdit.annual),
        spacing: parseInt(plantToEdit.spacing),
        maturity: plantToEdit.maturity,
        image: b64ImageString,
        icon: b64IconString,
        zones: updatedZones,
        companions: updatedCompanions,
        critters: updatedCritters,
      };
      console.log(editedPlant);
      updatePlant(editedPlant).then(() => {
        navigate(`/plants/${plantId}`);
      });
      setUserChangedSelections(false);
    } catch (error) {
      console.error("Error editing plant:", error);
    }
  };

  return (
    <div className="comp-container flex flex-col justify-start items-center bg-amber-100 min-h-[100vh] relative">
      <h2 className="form-title my-2 text-3xl">Edit {plantToEdit.name}:</h2>
      <div className="fields-container flex justify-center">
        <div className="left-side-fields flex flex-col justify-evenly mx-4 w-[25rem]">
          <div className="name-field flex items-center">
            <label htmlFor="name" className="mr-2 text-2xl">
              Name:
            </label>
            <input
              id="name"
              value={plantToEdit.name}
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
              value={plantToEdit.description}
              name="description"
              type="text"
              className="text-input text-md leading-4 border-solid border-black border-[1px] rounded-md pl-2 pt-2 h-[3rem] my-[0.5rem] overflow-x-hidden flex-1"
              placeholder="Enter Plant Description"
              onChange={handleInputChange}
            />
          </div>
          <div className="type-container flex select-input items-center">
            <div className="type-title mr-2 text-2xl">Plant Type:</div>
            <select
              name="type"
              onChange={handleInputChange}
              value={plantToEdit.type}
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
              value={plantToEdit.veggie_cat}
              placeholder="Select a Category"
              className="text-xl border-solid border-black border-[1px] rounded-md pl-2 h-[1.8rem] my-[0.5rem] overflow-x-hidden flex-1"
            >
              <option value={0}>Select a Category</option>
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
              value={plantToEdit.soil}
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
              value={plantToEdit.water}
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
              value={plantToEdit.light}
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
          <div className="maturity-container flex items-center">
            <label htmlFor="maturity" className="mr-2 text-2xl">
              Time to Maturity:
            </label>
            <input
              id="maturity"
              value={plantToEdit.maturity}
              name="maturity"
              type="text"
              className="text-input text-xl border-solid border-black border-[1px] rounded-md pl-2 h-[1.8rem] my-[0.5rem] overflow-x-hidden flex-1"
              placeholder="Number and unit"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="right-side-fields flex flex-col justify-evenly mx-4 w-[25rem]">
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
            <div className="pl-2 min-h-[2.5rem] my-[0.5rem] flex-1">
              <Select
                options={zones.map((zone) => ({
                  value: zone.id,
                  label: zone.name,
                }))}
                value={selectedZones}
                isMulti
                onChange={handleZonesChange}
                maxMenuHeight={160}
                key="zones"
              />
            </div>
          </div>
          <div className="companions-container flex items-center">
            <span className="companions-title mr-2 text-2xl">Companions:</span>
            <div className="pl-2 min-h-[2.5rem] my-[0.5rem] flex-1">
              <Select
                options={companions.map((companion) => ({
                  value: companion.id,
                  label: companion.name,
                }))}
                value={selectedCompanions}
                isMulti
                onChange={handleCompanionsChange}
                maxMenuHeight={160}
                key="companions"
              />
            </div>
          </div>
          <div className="critters-container flex items-center">
            <span className="critters-title mr-2 text-2xl">Critters:</span>
            <div className="pl-2 min-h-[2.5rem] my-[0.5rem] flex-1">
              <Select
                options={critters.map((critter) => ({
                  value: critter.id,
                  label: critter.name,
                }))}
                value={selectedCritters}
                isMulti
                onChange={handleCrittersChange}
                maxMenuHeight={160}
                key="critters"
              />
            </div>
          </div>
          <div className="height-container flex items-center py-1">
            <label htmlFor="height" className="mr-2 text-2xl">
              Height:
            </label>
            <input
              id="height"
              value={plantToEdit.height}
              name="height"
              type="text"
              className="text-input text-xl border-solid border-black border-[1px] rounded-md pl-2 h-[1.8rem] mt-[0.7rem] mb-[0.5rem] overflow-x-hidden flex-1"
              placeholder="Enter Height (inches)"
              onChange={handleInputChange}
            />
          </div>
          <div className="spacing-container flex items-center py-1">
            <label htmlFor="spacing" className="mr-2 text-2xl">
              Spacing (inches):
            </label>
            <input
              id="spacing"
              value={plantToEdit.spacing}
              name="spacing"
              type="text"
              className="text-input text-xl border-solid border-black border-[1px] rounded-md pl-2 h-[1.8rem] my-[0.5rem] overflow-x-hidden flex-1"
              placeholder="Enter Spacing (inches)"
              onChange={handleInputChange}
            />
          </div>
          <div className="annual-container flex items-center select-input w-[25rem] py-2">
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
                  checked={
                    plantToEdit.annual == true || plantToEdit.annual === "true"
                  }
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
                  className="mx-2"
                  checked={
                    plantToEdit.annual == false ||
                    plantToEdit.annual === "false"
                  }
                  onChange={handleInputChange}
                />
                Perennial
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="button2 green pt-6">
        <button name="herb" className="text-xl" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
