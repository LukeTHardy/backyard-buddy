import { useNavigate } from "react-router-dom";
import "/src/components/plants/PlantsCritters.css";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="comp-container bg-amber-100 flex justify-center relative min-h-[100vh]">
      <div className="home-comp h-[10rem] flex flex-col mt-12 px-8 py-4 pixel-border-green1 items-center">
        <div className="text-2xl">Welcome to Backyard Buddy</div>
        <div className="text-xl">blah blah blah blah</div>
        <br></br>
        <button
          className="text-xl eightbit-btn"
          onClick={() => {
            navigate("/plants");
          }}
        >
          Start Planning
        </button>
      </div>
    </div>
  );
};
