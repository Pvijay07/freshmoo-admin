import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { getDeliveryPartners } from "../api";

const DeliveryPartnersTable = () => {
  const [deliveryPartners, setDeliveryPartners] = useState([]);
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
      <div className="p-4 md:p-6 border-b border-gray-200">
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          Delivery Partners
        </h1>
      </div>

      {/* Table section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 hidden md:table-header-group">
            <tr>
              {["S No", "Name", "Contact", "Location", "Status", "Documents", "Actions"].map((head, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deliveryPartners && deliveryPartners.length > 0 ? (
              deliveryPartners.map((partner, index) => (
                <tr
                  key={partner.id}
                  className="hover:bg-gray-50 flex flex-col md:table-row border-b md:border-0 px-4 py-4 md:px-0 md:py-0"
                >
                  <td className="md:table-cell px-6 py-2 text-sm font-medium text-gray-900">
                    <span className="block md:hidden font-semibold">S No:</span>
                    {index + 1}
                  </td>
                  <td className="md:table-cell px-6 py-2 text-sm text-gray-900">
                    <span className="block md:hidden font-semibold">Name:</span>
                    {partner.name}
                  </td>
                  <td className="md:table-cell px-6 py-2 text-sm text-gray-500">
                    <span className="block md:hidden font-semibold">Contact:</span>
                    {partner.number}
                  </td>
                  <td className="md:table-cell px-6 py-2 text-sm text-gray-500">
                    <span className="block md:hidden font-semibold">Location:</span>
                    {partner.location}
                  </td>
                  <td className="md:table-cell px-6 py-2 text-sm">
                    <span className="block md:hidden font-semibold">Status:</span>
                    {partner.status}
                  </td>
                  <td
                    onClick={() => handleViewDocuments(partner)}
                    className="md:table-cell px-6 py-2 text-sm text-blue-500 cursor-pointer hover:underline"
                  >
                    <span className="block md:hidden font-semibold">Documents:</span>
                    View
                  </td>
                  <td className="md:table-cell px-6 py-2 text-sm font-medium flex md:block space-x-4 mt-2 md:mt-0">
                    <button className="text-blue-500 hover:text-blue-700">
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
                <td colSpan="7" className="px-6 py-4 text-center text-sm">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Documents section */}
      {selectedPartner && (
        <div className="mt-4 p-4 border rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">
            Documents for {selectedPartner.name}
          </h3>
          <ul className="list-disc pl-5 mt-2">
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
  );
};

export default DeliveryPartnersTable;
