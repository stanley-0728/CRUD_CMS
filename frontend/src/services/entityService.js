// services/entityService.js

import axios from "axios";

const API_URL = "http://localhost:8000/api/entities";

export const createEntry = async (entityName, data) => {
  try {
    await axios.post(`${API_URL}/${entityName}/entries`, data);
  } catch (error) {
    console.error("Error creating entry:", error);
    throw error;
  }
};

export const updateEntry = async (entityName, id, data) => {
  console.log(id);
  try {
    await axios.put(`${API_URL}/${entityName}/entries/${id}`, data);
  } catch (error) {
    console.error("Error updating entry:", error);
    throw error;
  }
};

export const deleteEntry = async (entityName, id) => {
  try {
    await axios.delete(`${API_URL}/${entityName}/entries/${id}`);
  } catch (error) {
    console.error("Error deleting entry:", error);
    throw error;
  }
};
