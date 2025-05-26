import React, { useState, useEffect } from "react";
import { MdAdd, MdEdit, MdDelete, MdSearch, MdFilterList } from "react-icons/md";
import ProductForm from "./ProductForm";
import { deleteProduct, getProducts, updateProduct } from "../api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();
        setProducts(data.products);
        setFilteredProducts(data.products);
        if (data.products.length > 0) {
          setSelectedProduct(data.products[0]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters whenever search term, category or price range changes
  useEffect(() => {
    let result = products;
    
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter !== "all") {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(result);
  }, [searchTerm, categoryFilter, priceRange, products]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { id: products.length + 1, ...newProduct }]);
    setIsAddingProduct(false);
  };

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

      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === productId ? data.product : p))
      );

      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Get unique categories for filter dropdown
  const categories = ["all", ...new Set(products.map(p => p.category))];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-800">Products</h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setEditingProduct(true)}
              className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm"
            >
              <MdAdd className="mr-2" /> Add Product
            </button>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="mt-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm"
            >
              <MdFilterList /> Filters
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-3 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat?.charAt(0).toUpperCase() + cat?.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      {editingProduct && (
        <div className="p-4 border-b border-gray-200">
          <ProductForm
            product={editingProduct}
            onCancel={() => setEditingProduct(null)}
            onSubmit={(updateProduct) =>
              editingProduct.id
                ? handleEditProduct(updateProduct, editingProduct.id)
                : handleCreate(updateProduct)
            }
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "S No",
                  "Category",
                  "Name",
                  "Image",
                  "Price",
                  "Description",
                  "Actions",
                ].map((title) => (
                  <th
                    key={title}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 truncate max-w-[120px]">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex flex-wrap gap-1">
                      {product.image &&
                      Array.isArray(JSON.parse(product.image)) ? (
                        JSON.parse(product.image)
                          .slice(0, 2)
                          .map((image, i) => (
                            <img
                              key={i}
                              src={`http://app.freshmoo.in/uploads/${image}`}
                              alt={product.name}
                              className="w-8 h-8 object-cover rounded"
                              loading="lazy"
                            />
                          ))
                      ) : (
                        <span className="text-xs text-gray-400">No Images</span>
                      )}
                      {product.image &&
                        Array.isArray(JSON.parse(product.image)) &&
                        JSON.parse(product.image).length > 2 && (
                          <span className="text-xs bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                            +{JSON.parse(product.image).length - 2}
                          </span>
                        )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 whitespace-nowrap">
                    ₹{product.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 break-words max-w-[200px] line-clamp-2">
                    {product.description}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50"
                        title="Edit"
                      >
                        <MdEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                        title="Delete"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">
              {searchTerm || categoryFilter !== "all" || priceRange[0] > 0 || priceRange[1] < 10000
                ? "No products match your filters."
                : "No products found."}
            </p>
            {searchTerm || categoryFilter !== "all" || priceRange[0] > 0 || priceRange[1] < 10000 ? (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setPriceRange([0, 10000]);
                }}
                className="mt-2 text-blue-500 hover:text-blue-700 text-sm"
              >
                Clear filters
              </button>
            ) : null}
          </div>
        )}
      </div>

      {/* Mobile Cards - shown only on small screens */}
      <div className="md:hidden p-4 space-y-4">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                    {product.category}
                  </span>
                </div>
                <span className="font-semibold">₹{product.price.toLocaleString()}</span>
              </div>
              
              <div className="mt-2 flex gap-2 overflow-x-auto py-2">
                {product.image && Array.isArray(JSON.parse(product.image)) ? (
                  JSON.parse(product.image).map((image, i) => (
                    <img
                      key={i}
                      src={`http://app.freshmoo.in/uploads/${image}`}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                      loading="lazy"
                    />
                  ))
                ) : (
                  <span className="text-xs text-gray-400">No Images</span>
                )}
              </div>
              
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {product.description}
              </p>
              
              <div className="mt-3 flex justify-end space-x-2">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50"
                  title="Edit"
                >
                  <MdEdit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                  title="Delete"
                >
                  <MdDelete size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center">
            <p className="text-gray-500">
              {searchTerm || categoryFilter !== "all" || priceRange[0] > 0 || priceRange[1] < 10000
                ? "No products match your filters."
                : "No products found."}
            </p>
            {searchTerm || categoryFilter !== "all" || priceRange[0] > 0 || priceRange[1] < 10000 ? (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setPriceRange([0, 10000]);
                }}
                className="mt-2 text-blue-500 hover:text-blue-700 text-sm"
              >
                Clear filters
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;