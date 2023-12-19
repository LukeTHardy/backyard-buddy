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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import "./Forms.css";

export const EditPlant = () => {
  const navigate = useNavigate();
  const { plantId } = useParams();
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
    days_to_mature: "",
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
      setPlantToEdit(plantObj);
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
    if (plantToEdit && !userChangedSelections) {
      setSelectedCompanions(
        plantToEdit.companions.map((c) => ({
          value: c.id,
          label: c.name,
        }))
      );
      setSelectedZones(
        plantToEdit.zones.map((z) => ({
          value: z.id,
          label: z.name,
        }))
      );
      setSelectedCritters(
        plantToEdit.critters.map((cr) => ({
          value: cr.id,
          label: cr.name,
        }))
      );
    }
  }, [plantToEdit]);

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
        name: plantToEdit.name,
        description: plantToEdit.description,
        type: parseInt(plantToEdit.type.id),
        veggie_cat: parseInt(plantToEdit.veggie_cat.id),
        soil: parseInt(plantToEdit.soil.id),
        water: parseInt(plantToEdit.water.id),
        light: parseInt(plantToEdit.light.id),
        height: parseInt(plantToEdit.height),
        annual: JSON.parse(plantToEdit.annual),
        spacing: parseInt(plantToEdit.spacing),
        days_to_mature: plantToEdit.days_to_mature,
        image: b64ImageString,
        icon: b64IconString,
        zones: updatedZones,
        companions: updatedCompanions,
        critters: updatedCritters,
      };
      console.log(editedPlant);
      // updatePlant(editedPlant).then(() => {
      //   navigate(`/plants/${plantId}`);
      // });
      setUserChangedSelections(false);
    } catch (error) {
      console.error("Error editing plant:", error);
    }
  };

  return (
    <div className="comp-container flex flex-col justify-center items-center">
      <h2 className="form-title mt-8 text-2xl">Edit {plantToEdit.name}</h2>
      <div className="fields-container flex justify-center mt-4">
        <div className="left-side-fields flex flex-col mx-4 w-[20rem]">
          <div className="name-field flex">
            <label htmlFor="name" className="mr-2">
              Name:
            </label>
            <input
              id="name"
              value={plantToEdit.name}
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
              value={plantToEdit.description}
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
                value={plantToEdit.type.id}
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
                value={plantToEdit.veggie_cat.id}
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
                value={plantToEdit.soil.id}
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
                value={plantToEdit.water.id}
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
                value={plantToEdit.light.id}
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
                  className="mx-1"
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
        <div className="right-side-fields flex flex-col mx-4 w-[20rem]">
          <div className="height-container flex">
            <label htmlFor="height" className="mr-2">
              Height:
            </label>
            <input
              id="height"
              value={plantToEdit.height}
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
              value={plantToEdit.spacing}
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
              value={plantToEdit.days_to_mature}
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
                options={zones.map((zone) => ({
                  value: zone.id,
                  label: zone.name,
                }))}
                value={selectedZones}
                isMulti
                onChange={handleZonesChange}
                key="zones"
              />
            </div>
          </div>
          <div className="companions-container flex">
            <span className="companions-title mr-2">Companions:</span>
            <div className="select-container select-input">
              <Select
                options={companions.map((companion) => ({
                  value: companion.id,
                  label: companion.name,
                }))}
                value={selectedCompanions}
                isMulti
                onChange={handleCompanionsChange}
                key="companions"
              />
            </div>
          </div>
          <div className="critters-container flex">
            <span className="critters-title mr-2">Critters:</span>
            <div className="select-container select-input">
              <Select
                options={critters.map((critter) => ({
                  value: critter.id,
                  label: critter.name,
                }))}
                value={selectedCritters}
                isMulti
                onChange={handleCrittersChange}
                key="critters"
              />
            </div>
          </div>
        </div>
      </div>
      <button className="bb-button" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};
