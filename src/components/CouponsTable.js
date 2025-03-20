import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import CouponForm from "./CouponForm";
import { MdAdd } from "react-icons/md";
import { createCoupon, deleteCoupon, getCoupons, updateCoupon } from "../api";

const CouponsTable = () => {
  const [coupons, setCoupons] = useState([]);
  const [editingCoupon, setEditingCoupon] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await getCoupons()
      setCoupons(response.coupons);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCoupon(id);
      fetchCoupons(); // Refresh the list
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };
  const handleSave = async (coupon, couponId) => {
    try {
      await updateCoupon(couponId, coupon);
      setCoupons((prevCategories) =>
        prevCategories.map((c) => (c.id === couponId ? coupon : c))
      );
      setEditingCoupon(null);
    } catch (error) {
      console.error("Error updating coupon:", error);
    }
  };

  const handleCreate = async (coupon) => {
    try {
      await createCoupon(coupon);
      setCoupons((prevBanners) => [...prevBanners, coupon]);

      setEditingCoupon(null);
    } catch (error) {
      console.error("Error creating coupon:", error);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Coupons</h1>{" "}
        <button
          onClick={() => setEditingCoupon({})}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600"
        >
          <MdAdd /> Add Coupon
        </button>
      </div>

      {editingCoupon && (
        <CouponForm
          coupon={editingCoupon}
          onCancel={() => setEditingCoupon(null)}
          onSubmit={(updatedCoupon) => {
            if (updatedCoupon.id) {
              // Update existing coupon
              handleSave(updatedCoupon, editingCoupon.id);
            } else {
              // Add new coupon
              handleCreate(updatedCoupon);
            }
            setEditingCoupon(null);
          }}
        />
      )}
     <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
            <th 
            scope="col"

                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >S No</th>
            <th 
            scope="col"

                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >Code</th>
             <th 
            scope="col"

                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >Discount</th>
             <th 
            scope="col"

                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >Type</th>
             <th 
            scope="col"

                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >Min Order</th>
             <th 
            scope="col"

                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >Status</th>
             <th 
            scope="col"

                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >Actions</th>
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
                {coupon.is_active ? "Active" : "Inactive"}
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

    </div>
  );
};

export default CouponsTable;
