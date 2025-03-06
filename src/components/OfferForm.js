import React, { useState } from 'react';

const OfferForm = ({ offer, onSubmit, onCancel }) => {
  const [name, setName] = useState(offer ? offer.name : '');
  const [description, setDescription] = useState(offer ? offer.description : '');
  const [discount, setDiscount] = useState(offer ? offer.discount : '');
  const [startDate, setStartDate] = useState(offer ? offer.start_date : '');
  const [endDate, setEndDate] = useState(offer ? offer.end_date : '');
  const [isActive, setIsActive] = useState(offer ? offer.is_active : true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: offer?.id,
      name,
      description,
      discount,
      start_date: startDate,
      end_date: endDate,
      is_active: isActive,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">
        {offer?.id ? 'Edit Offer' : 'Add Offer'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Offer Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Offer Description"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Discount (%)</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Discount Percentage"
            required
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
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            value={isActive}
            onChange={(e) => setIsActive(e.target.value === 'true')}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
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
            {offer?.id ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OfferForm;