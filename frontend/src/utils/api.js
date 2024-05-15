// utils/api.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/entities';

export const fetchAttributes = async (entityName) => {
  try {
    const response = await axios.get(`${API_URL}/${entityName}/attributes`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching attributes for ${entityName}:`, error);
    throw error;
  }
};

export const fetchEntries = async (entityName) => {
  try {
    const response = await axios.get(`${API_URL}/${entityName}/entries`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching entries for ${entityName}:`, error);
    throw error;
  }
};
