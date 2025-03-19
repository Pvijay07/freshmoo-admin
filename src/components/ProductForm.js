import React, { useState, useEffect } from "react";
import { getCategories } from "../api";

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [image, setImage] = useState(product ? product.image : "");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category_id);
      setImage(product.image);
    }
  }, [product]);
  const [images, setImages] = useState([]);
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to Array
    setImages(selectedFiles);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(images);
    const formData = new FormData();
    formData.append("id", product?.id);
    formData.append("category", category);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    // Append multiple images correctly
    images.forEach((file, index) => {
      formData.append(`files`, file); // Use array notation for multiple files
    });
    onSubmit(formData);
  };

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
          <label className="block text-sm font-medium mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Product Price"
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
