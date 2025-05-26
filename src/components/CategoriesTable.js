import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import CategoryForm from "./CategoryForm";
import {
  deleteCategory,
  getCategories,
  updateCategory,
  createCategory,
} from "../api";

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isCategorySectionOpen, setIsCategorySectionOpen] = useState(true);

  // Fetch categories
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

  // Scroll to form on edit/add
  useEffect(() => {
    if (editingCategory !== null) {
      document.getElementById("category-form")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [editingCategory]);

  // Create category
  const handleCreate = async (newCategory) => {
    try {
      const created = await createCategory(newCategory); // Make sure API returns created object
      setCategories((prev) => [...prev, created]);
      setEditingCategory(null);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  // Update category
  const handleSave = async (category, categoryId) => {
    try {
      await updateCategory(categoryId, category);
      setCategories((prev) =>
        prev.map((c) => (c.id === categoryId ? { ...c, ...category } : c))
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
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Categories</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsCategorySectionOpen(!isCategorySectionOpen)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            {isCategorySectionOpen ? "Hide" : "Show"}
          </button>
          <button
            onClick={() => {
              if (!isCategorySectionOpen) setIsCategorySectionOpen(true);
              setEditingCategory({});
            }}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            <MdAdd className="mr-2" /> Add Category
          </button>
        </div>
      </div>

      {/* Collapsible content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isCategorySectionOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {editingCategory && (
          <div id="category-form" className="p-6 border-b border-gray-200">
            <CategoryForm
              category={editingCategory}
              onCancel={() => setEditingCategory(null)}
              onSubmit={(category) =>
                editingCategory.id
                  ? handleSave(category, editingCategory.id)
                  : handleCreate(category)
              }
            />
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 break-words">
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
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesTable;
