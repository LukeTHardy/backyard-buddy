import { useNavigate, Link } from "react-router-dom";
import "./NavBar.css";
import plantdude from "/assets/graphics/plant_homie.gif";
// import stars from "/assets/graphics/sparkle.png";

export const NavBar = ({ token, favoriteClicked }) => {
  const navigate = useNavigate();

  return (
    <nav
      className="z-3 flex justify-center w-full relative"
      role="navigation"
      aria-label="main navigation"
    >
      {token ? (
        <div className="z-5 w-full h-12 flex justify-evenly text-logo-green items-center">
          <div className="">
            <div
              onClick={() => navigate("/")}
              className="text-3xl text-center hover:scale-105 cursor-pointer ease-in duration-75"
            >
              Home
            </div>
          </div>
          <div className="">
            <div
              onClick={() => navigate("/plants")}
              className="text-3xl text-center hover:scale-105 cursor-pointer ease-in duration-75"
            >
              Plants
            </div>
          </div>
          <div className="">
            <div
              onClick={() => navigate("/critters")}
              className="text-3xl text-center hover:scale-105 cursor-pointer ease-in duration-75"
            >
              Critters
            </div>
          </div>
          <div className="relative">
            <div
              onClick={() => navigate("/plants/favorites")}
              className={`text-3xl text-center hover:scale-105 cursor-pointer ${
                favoriteClicked
                  ? "fade-in-out-text-color"
                  : "ease-in duration-75"
              }`}
            >
              Favorites
            </div>
            {favoriteClicked && (
              <img
                src={plantdude}
                className={`h-[4rem] absolute bottom-1 right-[-2.5rem] ${
                  favoriteClicked
                    ? "fade-in-out-opacity ease-in-out duration-2000"
                    : ""
                }`}
                alt="plant"
              />
            )}
          </div>
          <div className="">
            <div
              onClick={() => navigate("/gardenbuilder")}
              className="text-3xl text-center hover:scale-105 cursor-pointer ease-in duration-75"
            >
              Garden Builder
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar-end">
          <div className="buttons">
            <Link to="/register" className="button is-link">
              Register
            </Link>
            <Link to="/login" className="button is-outlined">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
