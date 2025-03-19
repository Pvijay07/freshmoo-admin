import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import CategoryForm from "./CategoryForm";
import { MdAdd } from "react-icons/md";
import {
  deleteCategory,
  getCategories,
  updateCategory,
  createCategory,
} from "../api"; // Ensure createCategory is imported

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Create a new category
  const handleCreate = async (newCategory) => {
    try {
      console.log(newCategory);
      await createCategory(newCategory);
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      setEditingCategory(null);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  // Update existing category
  const handleSave = async (category,categoryId) => {
    console.log(categoryId)
    try {
      await updateCategory(categoryId, category);
      setCategories((prevCategories) =>
        prevCategories.map((c) => (c.id === categoryId ? category : c))
      );
      setEditingCategory(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header section */}
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Categories</h1>
        <button
          onClick={() => setEditingCategory({})} // Open form for new category
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          <MdAdd className="mr-2" /> Add Category
        </button>
      </div>

      {/* Form for Create/Edit */}
      {editingCategory && (
        <CategoryForm
          category={editingCategory}
          onCancel={() => setEditingCategory(null)}
          onSubmit={(category) =>
            editingCategory.id ? handleSave(category,editingCategory.id) : handleCreate(category)
          }
        />
      )}

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1} {/* Use index + 1 for numbering */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <img
                      src={`http://app.freshmoo.in/uploads/${category.images}`}
                      alt={category.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setEditingCategory(category)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 whitespace-nowrap text-center"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesTable;
