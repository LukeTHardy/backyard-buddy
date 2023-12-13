import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="comp-container flex justify-center">
      <div className="home-comp flex flex-col mt-10 p-12 bg-green-300 items-center rounded-3xl">
        <div className="text-2xl">Welcome to Backyard Buddy</div>
        <div className="text-xl">blah blah blah blah blah</div>
        <br></br>
        <button
          className="text-3xl border-double border-4 border-green-900 rounded-xl p-4"
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
