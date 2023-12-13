export const fetchAllCritters = async () => {
  const response = await fetch("http://localhost:8000/critters", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};

export const fetchCritter = async (id) => {
  const response = await fetch(`http://localhost:8000/critters/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};
