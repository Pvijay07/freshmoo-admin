import React, { useState } from "react";

import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import ProductForm from "./ProductForm";
import { deleteProduct, getProducts, updateProduct } from "../api";
const Products = () => {
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { id: products.length + 1, ...newProduct }]);
    setIsAddingProduct(false);
  };

  React.useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data.products);
      // Set the first product as the selected product
      setSelectedProduct(products[0]);
    };
    fetchProducts();
  }, []);
  // Create a new category
  const handleCreate = async (formData) => {
    try {
      const response = await fetch(
        "https://app.freshmoo.in/api/admin/createProduct",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to create product");

      const data = await response.json();
      console.log("Product Created:", data);

      setProducts((prevProducts) => [...prevProducts, data.product]);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // Update existing category
  const handleEditProduct = async (formData, productId) => {
    try {
      const response = await fetch(
        `https://app.freshmoo.in/api/admin/updateProduct/${productId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product");
      }

      const data = await response.json();
      console.log("Product Updated:", data);

      // Ensure the response structure matches what you expect
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === productId ? data.product : p))
      );

      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      // Optionally, show an error message to the user
    }
  };

  // Delete category
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((category) => category.id !== id)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header section */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-800">Products</h1>
        <button
          onClick={() => setEditingProduct(true)}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          <MdAdd className="mr-2" /> Add Product
        </button>
      </div>
      {/* Form for Create/Edit */}
      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onCancel={() => setEditingProduct(null)}
          onSubmit={(updateProduct) =>
            editingProduct.id
              ? handleEditProduct(updateProduct, editingProduct.id)
              : handleCreate(updateProduct)
          }
        />
      )}
      {/* Table section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
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
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.category}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      {product.image ? (
                        JSON.parse(product.image).map((image, index) => (
                          <img
                            key={index}
                            src={`http://app.freshmoo.in/uploads/${image}`}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ))
                      ) : (
                        <span>No Images</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 whitespace-nowrap text-center"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
