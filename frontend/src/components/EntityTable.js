// components/EntityTable.js

import React, { useState } from "react";

const EntityTable = ({ entries, attributes, onUpdate, onDelete }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const handleUpdateClick = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    onUpdate(selectedEntry.id, selectedEntry);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setSelectedEntry(null);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-4">Existing Entries</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {attributes.map((attribute) => (
                <th
                  key={attribute.name}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {attribute.name}
                </th>
              ))}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-100">
                {attributes.map((attribute) => (
                  <td
                    key={`${entry.id}-${attribute.name}`}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {entry[attribute.name]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleUpdateClick(entry)}
                    className="text-blue-500 hover:underline px-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => onDelete(entry.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && selectedEntry && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              &#8203;
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Edit Entry
                      </h3>
                      <div className="mt-2">
                        {attributes.map((attribute) => (
                          <div key={attribute.name}>
                            <label
                              htmlFor={attribute.name}
                              className="block text-sm font-medium text-gray-700"
                            >
                              {attribute.name}
                            </label>
                            <input
                              type="text"
                              id={attribute.name}
                              name={attribute.name}
                              value={selectedEntry[attribute.name]}
                              onChange={handleInputChange}
                              className="mt-1 p-2 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleUpdate}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntityTable;
