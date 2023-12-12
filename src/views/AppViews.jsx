import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Home } from "../components/misc/Home";
import { PlantList } from "../components/plants/PlantList";
import { PlantDetails } from "../components/plants/PlantDetails";
import { NewPlant } from "../components/plants/NewPlant";
import { EditPlant } from "../components/plants/EditPlant";
import { Favorites } from "../components/plants/Favorites";
import { CritterList } from "../components/critters/CritterList";
import { CritterDetails } from "../components/critters/CritterDetails";

export const AppViews = ({ token, setToken, userId, setCurrentUserId }) => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <Login setToken={setToken} setCurrentUserId={setCurrentUserId} />
          }
        />
        <Route
          path="/register"
          element={
            <Register setToken={setToken} setCurrentUserId={setCurrentUserId} />
          }
        />
        <Route element={<Authorized token={token} userId={userId} />}>
          <Route path="/" element={<Home />} />
          <Route path="/plants" element={<PlantList />}>
            <Route path="newplant" element={<NewPlant userId={userId} />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path=":plantId" element={<PlantDetails />} />
            <Route path=":plantId/edit" element={<EditPlant />} />
          </Route>
          <Route path="/critters" element={<CritterList />}>
            <Route path=":critterId" element={<CritterDetails />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
