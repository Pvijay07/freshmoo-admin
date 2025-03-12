import React, { useEffect, useState } from 'react';
import { getDeliveryPartners } from '../api';

const AssignOrderModal = ({ order, onClose }) => {
    const [deliveryPartners, setDeliveryPartners] = useState([]);
  
  useEffect(() => {
     const fetchUsers = async () => {
       const data = await getDeliveryPartners();
       setDeliveryPartners(data.partners);
     };
     fetchUsers();
   }, []);

  const handleAssign = (partnerId) => {
    console.log(`Order ${order.id} assigned to Partner ${partnerId}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Assign Order #{order.id}</h2>
        <p className="mb-4">Select a delivery partner:</p>
        <ul>
          {deliveryPartners.map((partner) => (
            <li key={partner.id} className="mb-2">
              <button
                onClick={() => handleAssign(partner.id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                {partner.name}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AssignOrderModal;