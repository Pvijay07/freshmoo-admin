import React, { useState, useEffect } from "react";
import { getCategories } from "../api";

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [image, setImage] = useState(product ? product.image : "");
  const [recommandable, setRecommandable] = useState(
    product ? product.recommandable : false // Changed to boolean default
  );
  const [actualPrice, setActualPrice] = useState(
    product ? product.actual_price : ""
  );
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(product ? product.category_id : ""); // Fixed initialization
  const [images, setImages] = useState([]);

  // Effect to populate form when product changes
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setDescription(product.description || "");
      setCategory(product.category_id || "");
      setImage(product.image || "");
      setActualPrice(product.actual_price || "");
      setRecommandable(Boolean(product.recommandable)); // Ensure boolean
    } else {
      // Reset form for new product
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage("");
      setActualPrice("");
      setRecommandable(false);
      setImages([]);
    }
  }, [product]);

  // Effect to fetch categories
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

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("id", product?.id);
    formData.append("category", category);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("actual_price", actualPrice);
    formData.append("description", description);
    formData.append("recommandable", recommandable ? 1 : 0);

    // Append multiple images correctly
    images.forEach((file) => {
      formData.append(`files`, file);
    });
    
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {product ? "Edit Product" : "Add Product"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select a Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Product Name"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Actual Price</label>
          <input
            type="number"
            value={actualPrice}
            onChange={(e) => setActualPrice(e.target.value)} // Fixed: was updating price instead
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Product Actual Price"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Selling Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Product Selling Price"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Images</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            accept="image/*"
            multiple
          />
          {product && product.image && (
            <p className="text-sm text-gray-500 mt-1">
              Current image: {product.image}
            </p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Product Description"
            rows="4"
            required
          />
        </div>
        
        <div className="mb-4 flex items-center space-x-2">
          <label className="text-sm font-medium">Recommandable</label>
          <input
            type="checkbox"
            checked={recommandable}
            onChange={(e) => setRecommandable(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
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
            {product ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;