export const fetchSoils = async () => {
  const response = await fetch("http://localhost:8000/soils", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};
export const fetchWaters = async () => {
  const response = await fetch("http://localhost:8000/waters", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};
export const fetchLights = async () => {
  const response = await fetch("http://localhost:8000/lights", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};
export const fetchPlantTypes = async () => {
  const response = await fetch("http://localhost:8000/planttypes", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};
export const fetchVeggieCats = async () => {
  const response = await fetch("http://localhost:8000/veggiecats", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};
export const fetchZones = async () => {
  const response = await fetch("http://localhost:8000/zones", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};

export const createPlantZonePairing = (newPairing) => {
  return fetch(`http://localhost:8000/plantzonepairings`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(newPairing),
  });
};
export const createCompanionPairing = (newPairing) => {
  return fetch(`http://localhost:8000/companionpairings`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(newPairing),
  });
};
export const createPlantCritterPairing = (newPairing) => {
  return fetch(`http://localhost:8000/plantcritterpairings`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(newPairing),
  });
};
