// hooks/useFetchEntries.js

import { useEffect, useState } from "react";
import { fetchEntries } from "../utils/api";

export const useFetchEntries = (entityName) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntriesData = async () => {
      try {
        const data = await fetchEntries(entityName);
        setEntries(data);
      } catch (error) {
        console.error(`Error fetching entries for ${entityName}:`, error);
      }
    };

    fetchEntriesData();
  }, [entityName]);

  return entries;
};
