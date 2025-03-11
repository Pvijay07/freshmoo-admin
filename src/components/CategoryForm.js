import React, { useState } from 'react';

const CategoryForm = ({ category, onSubmit, onCancel }) => {
  const [name, setName] = useState(category ? category.name : '');
  const [description, setDescription] = useState(category ? category.description : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: category?.id,
      name: name.trim() || null,
      description: description.trim() || null
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">
        {category?.id ? 'Edit Category' : 'Add Category'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Category Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Category Description"
            rows="4"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {category?.id ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;