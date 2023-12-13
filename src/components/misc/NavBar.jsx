import { useRef } from "react";
import { Link } from "react-router-dom";

export const NavBar = ({ token }) => {
  const navbar = useRef();

  return (
    <nav className="" role="navigation" aria-label="main navigation">
      <div className="h-12 flex justify-evenly items-center" ref={navbar}>
        <div className="">
          {token ? (
            <>
              <Link to="/" className="text-xl">
                Home
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="">
          {token ? (
            <>
              <Link to="/plants" className="text-xl">
                Plants
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="">
          {token ? (
            <>
              <Link to="/critters" className="text-xl">
                Critters
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="">
          {token ? (
            <Link to="/plants/favorites" className="text-xl">
              Favorites
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="">
          {token ? (
            <Link to="/gardenbuilder" className="text-xl">
              Garden Builder
            </Link>
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
