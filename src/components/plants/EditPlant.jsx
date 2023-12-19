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
  const [plantToEdit, setPlantToEdit] = useState({});
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

  useEffect(() => {
    fetchPlant(plantId).then((plantObj) => {
      setPlantToEdit(plantObj);
    });
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
  }, [plantId]);

  const handleSave = async () => {
    try {
      const editedPlant = {
        name: plantToEdit.name,
        description: plantToEdit.description,
        type: parseInt(plantToEdit.type),
        veggie_cat: parseInt(plantToEdit.veggie_cat),
        soil: parseInt(plantToEdit.soil),
        water: parseInt(plantToEdit.water),
        light: parseInt(plantToEdit.light),
        height: parseInt(plantToEdit.height),
        annual: JSON.parse(plantToEdit.annual),
        spacing: plantToEdit.spacing,
        days_to_mature: plantToEdit.days_to_mature,
        image: b64ImageString,
        icon: b64IconString,
        zones: selectedZones,
        companions: selectedPlants,
        critters: selectedCritters,
      };

      updatePlant(editedPlant).then(() => {
        navigate(`/plants/${plantId}`);
      });
    } catch (error) {
      console.error("Error editing plant:", error);
    }
  };

  return <div>sup edit form</div>;
};
