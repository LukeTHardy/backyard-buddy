import { useNavigate, Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ token }) => {
  const navigate = useNavigate();
  return (
    <nav
      className="z-3 flex justify-center w-full relative"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="z-3 w-full h-12 flex justify-evenly text-logo-green items-center">
        <div className="">
          {token ? (
            <>
              <div
                onClick={() => navigate("/")}
                className="text-3xl text-center hover:scale-105 cursor-pointer ease-in duration-75"
              >
                Home
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="">
          {token ? (
            <>
              <div
                onClick={() => navigate("/plants")}
                className="text-3xl text-center hover:scale-105 cursor-pointer ease-in duration-75"
              >
                Plants
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="">
          {token ? (
            <>
              <div
                onClick={() => navigate("/critters")}
                className="text-3xl text-center hover:scale-105 cursor-pointer ease-in duration-75"
              >
                Critters
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="">
          {token ? (
            <div
              onClick={() => navigate("/plants/favorites")}
              className="text-3xl text-center hover:scale-105 cursor-pointer ease-in duration-75"
            >
              Favorites
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="">
          {token ? (
            <div
              onClick={() => navigate("/gardenbuilder")}
              className="text-3xl text-center hover:scale-105 cursor-pointer ease-in duration-75"
            >
              Garden Builder
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="navbar-end">
        <div className="buttons">
          {token ? (
            ""
          ) : (
            <>
              <Link to="/register" className="button is-link">
                Register
              </Link>
              <Link to="/login" className="button is-outlined">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
