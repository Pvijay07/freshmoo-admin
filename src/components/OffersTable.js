import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import OfferForm from './OfferForm';
import { MdAdd } from 'react-icons/md';

const OffersTable = () => {
  const [offers, setOffers] = useState([]);
  const [editingOffer, setEditingOffer] = useState(null);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch('/api/offers');
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/offers/${id}`, { method: 'DELETE' });
      fetchOffers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Offers</h2>
      <button
        onClick={() => setEditingOffer({})}
        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600"
      >
       <MdAdd /> Add Offer
      </button>
      {editingOffer && (
        <OfferForm
          offer={editingOffer}
          onCancel={() => setEditingOffer(null)}
          onSubmit={(updatedOffer) => {
            if (updatedOffer.id) {
              // Update existing offer
              setOffers(
                offers.map((offer) =>
                  offer.id === updatedOffer.id ? updatedOffer : offer
                )
              );
            } else {
              // Add new offer
              setOffers([...offers, updatedOffer]);
            }
            setEditingOffer(null);
          }}
        />
      )}
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Discount</th>
            <th className="py-2 px-4 border-b">Start Date</th>
            <th className="py-2 px-4 border-b">End Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td className="py-2 px-4 border-b">{offer.id}</td>
              <td className="py-2 px-4 border-b">{offer.name}</td>
              <td className="py-2 px-4 border-b">{offer.discount}%</td>
              <td className="py-2 px-4 border-b">{offer.start_date}</td>
              <td className="py-2 px-4 border-b">{offer.end_date}</td>
              <td className="py-2 px-4 border-b">
                {offer.is_active ? 'Active' : 'Inactive'}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => setEditingOffer(offer)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(offer.id)}
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

export default OffersTable;