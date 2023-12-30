import { useNavigate } from "react-router-dom";
import bannerV3 from "/assets/graphics/bannerV3.svg";

export const Banner = ({ token, setToken }) => {
  const navigate = useNavigate();

  return (
    <div className="h-40 bg-light-blue-100 flex flex-col items-center z-0">
      <img className="bg-cover z-1" src={bannerV3}></img>
      <div className="self-end">
        {token ? (
          <button
            className=""
            onClick={() => {
              setToken("");
              navigate("/login");
            }}
          >
            Logout
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="flex-col justify-center">
        <h1 className="text-3xl mt-8 text-green-900">BACKYARD BUDDY 🥬</h1>
      </div>
    </div>
  );
};
