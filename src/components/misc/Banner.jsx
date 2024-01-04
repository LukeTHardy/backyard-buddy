import { useNavigate } from "react-router-dom";
import banner from "/assets/graphics/bannernoclouds.svg";
import clouds from "/assets/graphics/scrollingclouds.svg";
import birdbath from "/assets/graphics/croppedbath.gif";
import flyingbird from "/assets/graphics/flying_bird2.gif";
import "./Banner.css";

export const Banner = ({ token, setToken }) => {
  const navigate = useNavigate();

  return (
    <div className="banner-container h-[11.5rem] bg-light-blue-200 items-center overflow-hidden">
      <div className="infinite-scroll-wrapper">
        <img
          src={clouds}
          alt="Infinite Scroll Image"
          className="infinite-scroll-image z-1"
        />
        <img
          src={clouds}
          alt="Infinite Scroll Image"
          className="infinite-scroll-image z-1"
        />
      </div>
      <img className="bg-cover z-5 absolute top-0 left-0" src={banner}></img>
      <img
        className="z-4 absolute left-[36.4rem] top-[1.85rem] h-[7.33rem]"
        src={birdbath}
      ></img>
      {/* <div className="bird-wrapper">
        <img className="flying-bird z-2" src={flyingbird} />
      </div> */}
      <div className="self-end absolute top-0 right-1 text-logo-green text-lg">
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
