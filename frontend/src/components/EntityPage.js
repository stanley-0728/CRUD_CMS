import React, { useState, useEffect } from "react";
import EntityForm from "../components/EntityForm";
import EntityTable from "../components/EntityTable";
import { useFetchAttributes } from "../hooks/useFetchAttributes";
import { useFetchEntries } from "../hooks/useFetchEntries";
import {
  createEntry,
  updateEntry,
  deleteEntry,
} from "../services/entityService";
import { useParams } from "react-router-dom";
const EntityPage = ({ match }) => {
  const [entityEntries, setEntityEntries] = useState([]);
  const { entityName } = useParams();
  const attributes = useFetchAttributes(entityName);
  const entries = useFetchEntries(entityName);

  useEffect(() => {
    setEntityEntries(entries);
  }, [entries]);

  const handleCreateEntry = async (data) => {
    try {
      await createEntry(entityName, data);
      // Refresh entries after creating a new one
      setEntityEntries([...entityEntries, data]);
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  };

  const handleUpdateEntry = async (id, data) => {
    try {
      await updateEntry(entityName, id, data);
      // Refresh entries after updating an existing one
      const updatedEntries = entityEntries.map((entry) =>
        entry.id === id ? { ...entry, ...data } : entry
      );
      setEntityEntries(updatedEntries);
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await deleteEntry(entityName, id);
      // Refresh entries after deleting an entry
      const updatedEntries = entityEntries.filter((entry) => entry.id !== id);
      setEntityEntries(updatedEntries);
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {entityName.toUpperCase()} ENTRIES
      </h1>
      <EntityForm
        entityName={entityName}
        attributes={attributes}
        onSubmit={handleCreateEntry}
      />
      <EntityTable
        entries={entityEntries}
        attributes={attributes}
        onUpdate={handleUpdateEntry}
        onDelete={handleDeleteEntry}
      />
    </div>
  );
};

export default EntityPage;
