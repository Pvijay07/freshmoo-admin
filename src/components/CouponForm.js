import React, { useState } from "react";

const CouponForm = ({ coupon, onSubmit, onCancel }) => {
  const [code, setCode] = useState(coupon ? coupon.code : "");
  const [discount, setDiscount] = useState(coupon ? coupon.discount : "");
  const [usageLimit, setUsageLimit] = useState(
    coupon ? coupon.usage_limit : ""
  );

  const [description, setDescription] = useState(
    coupon ? coupon.description : ""
  );
  const [discountType, setDiscountType] = useState(
    coupon?.discount_type || "percentage"
  );

  const [maxDiscount, setMaxDiscount] = useState(
    coupon ? coupon.max_discount : ""
  );
  const [minOrderAmount, setMinOrderAmount] = useState(
    coupon ? coupon.min_order_amount : ""
  );
  const [startDate, setStartDate] = useState(coupon ? coupon.start_date : "");
  const [endDate, setEndDate] = useState(coupon ? coupon.end_date : "");
  const [isActive, setIsActive] = useState(
    coupon?.is_active !== undefined ? coupon.is_active : true
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the payload object
    const payload = {
      id: coupon?.id,
      code,
      discount,
      discount_type: discountType,
      max_discount: maxDiscount,
      min_order_amount: minOrderAmount,
      start_date: startDate,
      end_date: endDate,
      is_active: isActive,
      usage_limit: usageLimit,
      description: description,
    };

    console.log("Submitting payload:", payload);
    onSubmit(payload);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">
        {coupon?.id ? "Edit Coupon" : "Add Coupon"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Coupon Code"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Discount</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Discount"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Discount Type
          </label>
          <select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Max Discount</label>
          <input
            type="number"
            value={maxDiscount}
            onChange={(e) => setMaxDiscount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Max Discount"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Min Order Amount
          </label>
          <input
            type="number"
            value={minOrderAmount}
            onChange={(e) => setMinOrderAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Min Order Amount"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Usage Limit</label>
          <input
            type="number"
            value={usageLimit}
            onChange={(e) => setUsageLimit(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Usage limit"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Description"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            value={isActive.toString()}
            onChange={(e) => setIsActive(e.target.value === "true")}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
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
            {coupon?.id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CouponForm;
