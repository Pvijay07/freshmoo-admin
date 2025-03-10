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
  const handleDeleteProduct=()=>{
    setProducts(products.filter(product=>product.id!==selectedProduct.id))
    
  }
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
 
        <div className='bg-white rounded-lg shadow'>
          {/* Header section */}
          <div className='p-6 border-b border-gray-200 flex justify-between items-center'>
            <h1 className='text-xl font-semibold text-gray-800'>Products</h1>
            <button
              onClick={() => setIsAddingProduct(true)}
              className='flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600'
            >
              <MdAdd className='mr-2' /> Add Product
            </button>
          </div>
          {/* Table section */}
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>S No</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Image</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Description</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {products.map((product, index) => (
                  <tr key={product.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{index + 1}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{product.category}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                      <img src={product.image} alt={product.name} className='w-10 h-10 object-cover rounded' />
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{product.name}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>₹{product.price}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{product.description}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <button
                        onClick={() => handleEditProduct(product)}
                        className='text-blue-500 hover:text-blue-700 mr-2'
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className='text-red-500 hover:text-red-700'
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
 
    
  );
};

export default Products;
