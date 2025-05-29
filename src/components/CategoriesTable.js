import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Search, Filter, X } from "lucide-react";

import CategoryForm from "./CategoryForm";
import {
  deleteCategory,
  getCategories,
  updateCategory,
  createCategory,
} from "../api";



const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isCategorySectionOpen, setIsCategorySectionOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data.categories);
        setFilteredCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Filter and sort categories
  useEffect(() => {
    let filtered = categories.filter((category) =>
      category.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    // Sort categories
    filtered.sort((a, b) => {
      const aValue = a[sortBy]?.toLowerCase();
      const bValue = b[sortBy]?.toLowerCase();
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredCategories(filtered);
  }, [categories, searchTerm, sortBy, sortOrder]);

  // Scroll to form on edit/add
  useEffect(() => {
    if (editingCategory !== null) {
      document.getElementById("category-form")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [editingCategory]);

  // Create category
  const handleCreate = async (newCategory) => {
    try {
      const created = await createCategory(newCategory);
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
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        setCategories((prev) => prev.filter((c) => c.id !== id));
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("name");
    setSortOrder("asc");
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
          <h1 className="text-xl font-semibold text-gray-800">Categories</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIsCategorySectionOpen(!isCategorySectionOpen)}
              className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm"
            >
              {isCategorySectionOpen ? "Hide" : "Show"}
            </button>
            <button
              onClick={() => {
                if (!isCategorySectionOpen) setIsCategorySectionOpen(true);
                setEditingCategory({});
              }}
              className="flex items-center bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Category
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isCategorySectionOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {editingCategory && (
          <div id="category-form" className="p-4 md:p-6 border-b border-gray-200">
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

        {/* Filters */}
        <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filters
            </button>

            {/* Clear Filters */}
            {(searchTerm || sortBy !== "name" || sortOrder !== "asc") && (
              <button
                onClick={clearFilters}
                className="flex items-center text-gray-600 hover:text-gray-800 text-sm"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </button>
            )}
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="mt-4 p-4 bg-white rounded-lg border">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="name">Name</option>
                    <option value="description">Description</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order
                  </label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Results count */}
          <div className="mt-2 text-sm text-gray-600">
            Showing {filteredCategories.length} of {categories.length} categories
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="block sm:hidden">
          {filteredCategories.length > 0 ? (
            <div className="p-4 space-y-4">
              {filteredCategories.map((category, index) => (
                <div key={category.id} className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <img
                        src={`http://app.freshmoo.in/uploads/${category.images}`}
                        alt={category.name}
                        className="w-12 h-12 object-cover rounded-lg"
                       
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-500">ID: {index + 1}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingCategory(category)}
                        className="text-blue-500 hover:text-blue-700 p-1"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No categories found.
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
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
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
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
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      <div className="truncate">{category.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setEditingCategory(category)}
                        className="text-blue-500 hover:text-blue-700 mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
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