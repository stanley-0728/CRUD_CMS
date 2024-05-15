// src/components/Homepage.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [tableNames, setTableNames] = useState([]);
  const [entityName, setEntityName] = useState("");
  const [attributes, setAttributes] = useState({});
  const [newAttributeName, setNewAttributeName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTableNames();
  }, []);

  const fetchTableNames = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/entities");
      setTableNames(response.data);
    } catch (error) {
      console.error("Error fetching table names:", error);
    }
  };

  const handleInputChange = (e) => {
    setEntityName(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [name]: checked ? "VARCHAR(50)" : undefined, // Default data type is VARCHAR(50)
    }));
  };

  const handleNewAttributeChange = (e) => {
    setNewAttributeName(e.target.value);
  };

  const addNewAttribute = () => {
    if (newAttributeName) {
      setAttributes((prevAttributes) => ({
        ...prevAttributes,
        [newAttributeName]: "VARCHAR(50)", // Default data type is VARCHAR(50)
      }));
      setNewAttributeName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEntityName(entityName.toLowerCase());
    try {
      const response = await axios.post("http://localhost:8000/api/entities/", {
        entityName,
        attributes,
      });
      console.log("Entity created successfully:", response.data);
      navigate(`/${entityName}`); // Redirect to the newly created entity page
    } catch (error) {
      console.error("Error creating entity:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">List of Tables</h1>
      <ul>
        {tableNames.map((tableName) => (
          <li key={tableName} className="mb-2 text-xl ">
            <Link
              to={`/${tableName}`}
              className="text-blue-500 hover:underline"
            >
              {tableName.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Create New Entity</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="entityName" className="block font-bold mb-2">
              Entity Name:
            </label>
            <input
              type="text"
              id="entityName"
              value={entityName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-4 py-2 w-full"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block font-bold">Attributes:</label>
            {Object.entries(attributes).map(([attributeName, dataType]) => (
              <div key={attributeName}>
                <input
                  type="checkbox"
                  name={attributeName}
                  id={attributeName}
                  checked={true} // For display purposes only, can be modified
                  onChange={handleCheckboxChange}
                  className="mr-2"
                  disabled
                />
                <label htmlFor={attributeName}>{attributeName}</label>
                <span className="ml-2 text-gray-500">({dataType})</span>
              </div>
            ))}
            <div className="flex items-center">
              <input
                type="text"
                value={newAttributeName}
                onChange={handleNewAttributeChange}
                placeholder="New Attribute Name"
                className="border border-gray-300 rounded px-4 py-2 w-60"
              />
              <button
                type="button"
                onClick={addNewAttribute}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Attribute
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create Entity
          </button>
        </form>
      </div>
    </div>
  );
};

export default Homepage;
