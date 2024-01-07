import { Navigate, Outlet } from "react-router-dom";
import { Banner } from "../components/misc/Banner";
import { NavBar } from "../components/misc/NavBar";

export const Authorized = ({
  token,
  setToken,
  favoriteClicked,
  setFavoriteClicked,
}) => {
  if (token) {
    return (
      <>
        <Banner token={token} setToken={setToken} />
        <NavBar
          token={token}
          setToken={setToken}
          favoriteClicked={favoriteClicked}
          setFavoriteClicked={setFavoriteClicked}
        />
        <Outlet
          favoriteClicked={favoriteClicked}
          setFavoriteClicked={setFavoriteClicked}
        />
      </>
    );
  }
  return <Navigate to="/login" replace />;
};
