import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import CouponForm from './CouponForm';
import { MdAdd } from 'react-icons/md';

const CouponsTable = () => {
  const [coupons, setCoupons] = useState([]);
  const [editingCoupon, setEditingCoupon] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch('/api/coupons');
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/coupons/${id}`, { method: 'DELETE' });
      fetchCoupons(); // Refresh the list
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Coupons</h2>
      <button
        onClick={() => setEditingCoupon({})}
        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600"
      >
       <MdAdd /> Add Coupon
      </button>
      {editingCoupon && (
        <CouponForm
          coupon={editingCoupon}
          onCancel={() => setEditingCoupon(null)}
          onSubmit={(updatedCoupon) => {
            if (updatedCoupon.id) {
              // Update existing coupon
              setCoupons(
                coupons.map((coupon) =>
                  coupon.id === updatedCoupon.id ? updatedCoupon : coupon
                )
              );
            } else {
              // Add new coupon
              setCoupons([...coupons, updatedCoupon]);
            }
            setEditingCoupon(null);
          }}
        />
      )}
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Code</th>
            <th className="py-2 px-4 border-b">Discount</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Min Order</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td className="py-2 px-4 border-b">{coupon.id}</td>
              <td className="py-2 px-4 border-b">{coupon.code}</td>
              <td className="py-2 px-4 border-b">{coupon.discount}</td>
              <td className="py-2 px-4 border-b">{coupon.discount_type}</td>
              <td className="py-2 px-4 border-b">{coupon.min_order_amount}</td>
              <td className="py-2 px-4 border-b">
                {coupon.is_active ? 'Active' : 'Inactive'}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => setEditingCoupon(coupon)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(coupon.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CouponsTable;