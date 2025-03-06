import React, { useState } from "react";
import { getProducts } from "../api";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import ProductForm from "./ProductForm";

const Products = () => {
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { id: products.length + 1, ...newProduct }]);
    setIsAddingProduct(false);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
  };
  // Fetch products on component mount
  // React.useEffect(() => {
  //   const fetchProducts = async () => {
  //     const products = await getProducts();
  //     setProducts(products);
  //     // Set the first product as the selected product
  //     setSelectedProduct(products[0]);
  //   };
  //   fetchProducts();
  // }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <button
        onClick={() => setIsAddingProduct(true)}
        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600"
      >
        <MdAdd /> Add Product
      </button>
      {isAddingProduct && (
        <ProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setIsAddingProduct(false)}
        />
      )}
      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleEditProduct}
          onCancel={() => setEditingProduct(null)}
        />
      )}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">S No</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products ? products.map((product, index) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">
                <img
                  src={product.image} // Assuming product has an `image` field
                  alt={product.name}
                  className="w-10 h-10 object-cover"
                />
              </td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">₹{product.price}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                  <MdEdit />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))
        : null}
        </tbody>
      </table>

      {/* Display selected product details */}
      {selectedProduct && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold">{selectedProduct.name}</h3>
          <p>Price: ₹{selectedProduct.price}</p>
          <p>Description: {selectedProduct.description}</p>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-20 h-20 object-cover mt-2"
          />
          <button
            onClick={() => setSelectedProduct(null)}
            className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
