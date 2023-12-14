import { fetchCritter } from "../../services/CritterServices";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const CritterDetails = () => {
  const [chosenCritter, setChosenCritter] = useState({
    type: { id: 0, label: "" },
    plants: [],
  });
  const { critterId } = useParams();

  const fetchAndSetCritter = async () => {
    const critter = await fetchCritter(critterId);
    setChosenCritter(critter);
  };

  useEffect(() => {
    fetchAndSetCritter();
  }, []);

  const displayCritter = () => {
    if (chosenCritter) {
      return (
        <div className="card-container flex justify-center">
          <div className="image-card flex flex-col w-[35rem] items-center">
            <img
              src={`${chosenCritter.image}`}
              className="critter-image border-double border-4 border-amber-900 rounded-xl w-[30rem]"
            />
          </div>
          <div className="details-card flex flex-col items-center border-solid round-xl bg-amber-100 w-[40rem] h-[30rem] rounded-3xl">
            <div className="critter-name text-3xl underline m-4">
              {chosenCritter.name}
            </div>
            <div className="critter-description text-2xl italic m-4">
              -{chosenCritter.description}
            </div>
            <div className="critter-status text-2xl m-4">
              Status: {chosenCritter.type.label}
            </div>
            <div className="critter-size text-2xl m-4">
              Size: {chosenCritter.size} in.
            </div>
            <div className="critter-management text-2xl italic m-4">
              -{chosenCritter.management}
            </div>
            <br></br>
            <div className="critter-plants text-2xl">
              May be found on: <br></br>
              {chosenCritter.plants.map((plant) => {
                return (
                  <div key={plant.id} className="plant-link">
                    <Link to={`/plants/${plant.id}`}>
                      <div className="plant-name hover:font-medium">
                        {plant.name}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return <h3 className="">Loading Critter...</h3>;
  };

  return <div className="detail-comp-container mt-8">{displayCritter()}</div>;
};

// name
// status
// size
// description
// management
// may be found on
