export const fetchAllPlants = async () => {
  const response = await fetch("http://localhost:8000/plants", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};

export const fetchMyFavorites = async () => {
  const response = await fetch("http://localhost:8000/favorites?user=current", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};

export const fetchPlant = async (plantId) => {
  const response = await fetch(`http://localhost:8000/plants/${plantId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};

export const createPlant = async (newPlant) => {
  const response = await fetch("http://localhost:8000/plants", {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlant),
  });
  return response;
};

export const updatePlant = async (plant) => {
  await fetch(`http://localhost:8000/categories/${plant.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plant),
  });
};

export const deletePlant = async (plantId) => {
  const response = await fetch(`http://localhost:8000/plants/${plantId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const createFavorite = (newFavorite) => {
  return fetch(`http://localhost:8000/favorites`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(newFavorite),
  });
};

export const deleteFavoriteById = (favoriteId) => {
  return fetch(`http://localhost:8000/favorites/${favoriteId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  });
};
