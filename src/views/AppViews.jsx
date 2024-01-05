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
import { GardenBuilder } from "../components/misc/GardenBuilder";

export const AppViews = ({
  token,
  setToken,
  userId,
  setCurrentUserId,
  setFavoriteClicked,
}) => {
  return (
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
        <Route path="plants">
          <Route index element={<PlantList userId={userId} />} />
          <Route path="newplant" element={<NewPlant userId={userId} />} />
          <Route path="favorites" element={<Favorites />} />
          <Route
            path=":plantId"
            element={
              <PlantDetails
                userId={userId}
                setFavoriteClicked={setFavoriteClicked}
              />
            }
          />
          <Route path=":plantId/edit" element={<EditPlant />} />
        </Route>
        <Route path="critters">
          <Route index element={<CritterList />} />
          <Route path=":critterId" element={<CritterDetails />} />
        </Route>
        <Route path="/gardenbuilder" element={<GardenBuilder />} />
      </Route>
    </Routes>
  );
};
