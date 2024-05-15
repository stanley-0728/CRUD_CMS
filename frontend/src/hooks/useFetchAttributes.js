// hooks/useFetchAttributes.js

import { useEffect, useState } from 'react';
import { fetchAttributes } from '../utils/api';

export const useFetchAttributes = (entityName) => {
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const fetchAttributesData = async () => {
      try {
        const data = await fetchAttributes(entityName);
        setAttributes(data);
      } catch (error) {
        console.error(`Error fetching attributes for ${entityName}:`, error);
      }
    };

    fetchAttributesData();
  }, [entityName]);

  return attributes;
};
