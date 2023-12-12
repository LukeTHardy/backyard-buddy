import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./NavBar.css";
import Logo from "./canteloupe.webp";

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const navbar = useRef();

  return (
    <nav
      className="navbar is-success mb-3"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={Logo} height="3rem" alt="Rare Logo" />{" "}
          <h1 className="title is-4">Rare Publishing</h1>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {token ? (
            <>
              <Link to="/" className="navbar-item">
                Home
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="navbar-start">
          {token ? (
            <>
              <Link to="/plants" className="navbar-item">
                Plants
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="navbar-start">
          {token ? (
            <>
              <Link to="/critters" className="navbar-item">
                Critters
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="navbar-start">
          {token ? (
            <Link to="/favorites" className="navbar-item">
              Favorites
            </Link>
          ) : (
            ""
          )}
        </div>
        {/* <div className="navbar-start">
          {token ? (
            <Link to="/gardenbuilder" className="navbar-item">
              Garden Builder
            </Link>
          ) : (
            ""
          )}
        </div> */}

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {token ? (
                <button
                  className="button is-outlined"
                  onClick={() => {
                    setToken("");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
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
        </div>
      </div>
    </nav>
  );
};
