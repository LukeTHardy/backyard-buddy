import { useState } from "react";
import "./App.css";
import { AppViews } from "./views/AppViews";

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
      <AppViews
        token={token}
        setToken={setToken}
        userId={userId}
        setCurrentUserId={setCurrentUserId}
        setFavoriteClicked={setFavoriteClicked}
        favoriteClicked={favoriteClicked}
      />
    </>
  );
};
