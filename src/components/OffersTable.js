import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import OfferForm from "./OfferForm";
import { MdAdd } from "react-icons/md";
import { createOffer, deleteOffer, getOffers, updateOffer } from "../api";

const OffersTable = () => {
  const [offers, setOffers] = useState([]);
  const [editingOffer, setEditingOffer] = useState(null);
  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await getOffers();
      setOffers(response.offers);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  // Create a new category
  const handleCreate = async (newOffer) => {
    try {
      console.log(newOffer);
      await createOffer(newOffer);
      setOffers((prevOffers) => [...prevOffers, newOffer]);
      setEditingOffer(null);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  // Update existing category
  const handleSave = async (offer) => {
    try {
      await updateOffer(offer.id, offer);
      setOffers((prevOffers) =>
        prevOffers.map((c) => (c.id === offer.id ? offer : c))
      );
      setEditingOffer(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    try {
      await deleteOffer(id);
      fetchOffers();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header section */}

      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">Offers</h1>
        <button
          onClick={() => setEditingOffer({})}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          <MdAdd className="mr-2" /> Add Offer
        </button>
      </div>
      {editingOffer && (
        <OfferForm
        offer={editingOffer}
          onCancel={() => setEditingOffer(null)}
          onSubmit={(offer) =>
            offer.id ? handleSave(offer) : handleCreate(offer)
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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {offers.map((offer, index) => (
              <tr key={offer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {offer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {offer.discount}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(offer.start_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(offer.end_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {offer.is_active ? "Active" : "Inactive"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
    </div>
  );
};

export default OffersTable;
