import { useNavigate } from "react-router-dom";
import banner from "/assets/graphics/bannernoclouds.svg";
import clouds from "/assets/graphics/scrollingclouds.svg";
import birdbath from "/assets/graphics/croppedbath.gif";
import "./Banner.css";

export const Banner = ({ token, setToken }) => {
  const navigate = useNavigate();

  return (
    <div className="banner-container h-[11rem] bg-light-blue-200 items-center">
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
      <img className="bg-cover z-2 absolute top-0 left-0" src={banner}></img>
      <img
        className="z-3 absolute left-[36.4rem] top-[1.85rem] h-[7.33rem]"
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
