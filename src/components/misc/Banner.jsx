import { useNavigate } from "react-router-dom";
import banner from "/assets/graphics/fixedV0.svg";
import clouds from "/assets/graphics/scrollingclouds.svg";
import birdbath from "/assets/graphics/croppedbath.gif";
import "./Banner.css";

export const Banner = ({ token, setToken }) => {
  const navigate = useNavigate();

  return (
    <div className="banner-container h-[12rem] bg-light-blue-200 items-center z-0">
      <img className="bg-cover z-2" src={banner}></img>
      <div
        className="z-1 clouds bg-repeat-x"
        style={{ backgroundImage: `url(${clouds})` }}
      ></div>
      <img
        className="z-2 absolute left-[36.4rem] top-[1.85rem] h-[7.33rem]"
        src={birdbath}
      ></img>

      <div className="self-end">
        {token ? (
          <button
            className="z-2"
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
    </div>
  );
};
