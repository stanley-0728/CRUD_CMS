// src/hooks/useApi.js
import { useState } from "react";
import axios from "axios";

const useApi = () => {
  const [error, setError] = useState(null);

  const get = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      setError(error.response.data.error || "An error occurred");
      throw error;
    }
  };

  const post = async (url, data) => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      setError(error.response.data.error || "An error occurred");
      throw error;
    }
  };

  const put = async (url, data) => {
    try {
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      setError(error.response.data.error || "An error occurred");
      throw error;
    }
  };

  const del = async (url) => {
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      setError(error.response.data.error || "An error occurred");
      throw error;
    }
  };

  const clearError = () => {
    setError(null);
  };

  return { error, get, post, put, del, clearError };
};

export default useApi;
