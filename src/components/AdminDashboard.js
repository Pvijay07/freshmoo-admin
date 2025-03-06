import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import ProductForm from "./ProductForm";

const AdminDashboard = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product A",
      price: 1000,
      description: "Description of Product A",
    },
    {
      id: 2,
      name: "Product B",
      price: 2000,
      description: "Description of Product B",
    },
  ]);
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

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="flex-1 p-6">
      <h2 className="text-xl font-bold mb-6">Manage Data</h2>

      {/* Products Section */}
      <div id="products">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FaShoppingCart className="mr-2" /> Products
        </h3>
        <button
          onClick={() => setIsAddingProduct(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600"
        >
          <MdAdd className="inline-block mr-2" /> Add Product
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
        <div className="bg-white p-4 rounded-lg shadow">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Product ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="py-2 px-4 border-b">{product.id}</td>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">₹{product.price}</td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
