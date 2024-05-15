// components/EntityForm.js

import React from 'react';
import { useForm } from '../hooks/useForm';

const EntityForm = ({ entityName, attributes, onSubmit }) => {
  const { formData, handleInputChange, handleSubmit } = useForm(onSubmit);

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-4">Create New Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {attributes.map((attribute) => (
          <div key={attribute.name}>
            <label htmlFor={attribute.name} className="block font-bold mb-2">{attribute.name}</label>
            <input
              type="text"
              id={attribute.name}
              name={attribute.name}
              value={formData[attribute.name] || ''}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-4 py-2 w-full"
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Entry
        </button>
      </form>
    </div>
  );
};

export default EntityForm;
