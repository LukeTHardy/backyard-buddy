import "/src/components/plants/PlantsCritters.css";
import "/src/components/plants/PixelBorder.scss";
import { fetchAllPlants } from "../../services/PlantServices";
import { useState, useEffect } from "react";

export const GardenBuilder = () => {
  const [allPlants, setAllPlants] = useState([]);
  const [veggies, setVeggies] = useState([]);
  const [herbs, setHerbs] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [fruit, setFruit] = useState([]);

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

  const grabVeggies = () => {
    const veggiesArr = allPlants.filter(
      (plant) => plant.type.label.toLowerCase() === "veggie"
    );
    setVeggies(veggiesArr);
  };
  const grabHerbs = () => {
    const herbsArr = allPlants.filter(
      (plant) => plant.type.label.toLowerCase() === "herb"
    );
    setHerbs(herbsArr);
  };
  const grabFlowers = () => {
    const flowersArr = allPlants.filter(
      (plant) => plant.type.label.toLowerCase() === "flower"
    );
    setFlowers(flowersArr);
  };
  const grabFruit = () => {
    const fruitArr = allPlants.filter(
      (plant) => plant.type.label.toLowerCase() === "fruit"
    );
    setFruit(fruitArr);
  };

  useEffect(() => {
    if (allPlants.length > 0) {
      grabVeggies();
      grabHerbs();
      grabFlowers();
      grabFruit();
    }
  }, [allPlants]);

  return (
    <div className="comp-container flex flex-col items-center bg-amber-100 justify-start relative min-h-[80vh]">
      <div className="garden-builder-comp flex flex-col items-center">
        <div className="title text-3xl m-4">See Your Garden:</div>
        <div className="dimensions flex flex-col items-center">
          <div className="dimensions-title text-2xl mb-2">
            My garden will be...
          </div>
          <div className="dimensions-inputs h-8 flex justify-evenly items-end text-xl">
            <input
              className="text-xl rounded-lg w-[4rem] mr-1 pl-2"
              type="text"
              placeholder="width"
            />{" "}
            ft. x{" "}
            <input
              className="text-xl rounded-lg w-[4rem] pl-2 ml-6 mr-1 "
              type="text"
              placeholder="length"
            />{" "}
            ft.
          </div>
        </div>
        <div className="plant-buttons flex flex-col items-center mt-8">
          <div className="title text-2xl">I want to grow...</div>
          <div className="subtitle italic text-md text-gray-dark mt-3">
            (Add up to 6 total)
          </div>
          <div className="buttons-container w-[30rem] flex justify-evenly">
            <button
              className="bg-eggshell px-2 py-1 border-2 border-solid border-black rounded-md"
              name="veggies"
            >
              Add Veggie
            </button>
            <button
              className="bg-eggshell px-2 py-1 border-2 border-solid border-black rounded-md"
              name="herbs"
            >
              Add Herb
            </button>
            <button
              className="bg-eggshell px-2 py-1 border-2 border-solid border-black rounded-md"
              name="flowers"
            >
              Add Flower
            </button>
            <button
              className="bg-eggshell px-2 py-1 border-2 border-solid border-black rounded-md"
              name="fruit"
            >
              Add Fruit
            </button>
          </div>
          <div className="selectors-container"></div>
        </div>
      </div>
    </div>
  );
};
