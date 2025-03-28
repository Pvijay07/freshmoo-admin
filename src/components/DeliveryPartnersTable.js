import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { getDeliveryPartners } from "../api";

const DeliveryPartnersTable = () => {
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPartner, setEditingPartner] = useState({});
  const [newPartner, setNewPartner] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingPartner, setDeletingPartner] = useState({});
  const [isDeletingConfirmed, setIsDeletingConfirmed] = useState(false);
  const [isDeletingConfirmedPartner, setIsDeletingConfirmedPartner] =
    useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getDeliveryPartners();
      setDeliveryPartners(data.partners);
    };
    fetchUsers();
  }, []);

  const handleViewDocuments = (partner) => {
    setSelectedPartner(partner);
  };
  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header section */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">
          Delivery Partners
        </h1>
      </div>
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
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Documents
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deliveryPartners && deliveryPartners.length > 0 ? (
              deliveryPartners.map((partner, index) => (
                <tr key={partner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {partner.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {partner.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {partner.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {partner.status}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 cursor-pointer hover:underline"
                    onClick={() => handleViewDocuments(partner)}
                  >
                    View
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                      <MdEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {selectedPartner && (
          <div className="mt-4 p-4 border rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">
              Documents for {selectedPartner.name}
            </h3>
            <ul className="list-disc pl-5">
              {selectedPartner.documents.length > 0 ? (
                selectedPartner.documents.map((doc, index) => (
                  <li key={index}>
                    <a
                      href={`https://app.freshmoo.in${doc.document_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {doc.document_type}
                    </a>
                  </li>
                ))
              ) : (
                <p>No documents available</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryPartnersTable;
