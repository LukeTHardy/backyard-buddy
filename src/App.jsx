import { useState } from "react";
import "./App.css";
import { AppViews } from "./views/AppViews";
import { NavBar } from "./components/misc/NavBar.jsx";
import { Banner } from "./components/misc/Banner.jsx";

export const App = () => {
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [favoriteClicked, setFavoriteClicked] = useState(false);

  const setCurrentUserId = (newUserId) => {
    localStorage.setItem("user_id", newUserId);
    setUserId(newUserId);
  };
  const setToken = (newToken) => {
    localStorage.setItem("auth_token", newToken);
    setTokenState(newToken);
  };

  return (
    <>
      <Banner token={token} setToken={setToken} />
      <NavBar
        token={token}
        setToken={setToken}
        favoriteClicked={favoriteClicked}
        setFavoriteClicked={setFavoriteClicked}
      />
      <AppViews
        token={token}
        setToken={setToken}
        userId={userId}
        setCurrentUserId={setCurrentUserId}
        setFavoriteClicked={setFavoriteClicked}
      />
    </>
  );
};
