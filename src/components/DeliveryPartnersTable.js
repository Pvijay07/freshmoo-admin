import React, { useEffect, useState } from "react";
import { Trash2, Edit, Filter, X, MapPin } from "lucide-react";
import { getDeliveryPartners } from "../api";

const DeliveryPartnersTable = () => {
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    location: 'all',
    deliveryStatus: 'all'
  });
  const [showAreaAssignment, setShowAreaAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchDeliveryPartners = async () => {
      try {
        setLoading(true);
        const data = await getDeliveryPartners();

        setTimeout(() => {
          setDeliveryPartners(data.partners);
          setFilteredPartners(data.partners);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch delivery partners");
        setLoading(false);
      }
    };
    fetchDeliveryPartners();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = deliveryPartners;

    if (filters.status !== 'all') {
      filtered = filtered.filter(partner => partner.status === filters.status);
    }

    if (filters.location !== 'all') {
      filtered = filtered.filter(partner => partner.location === filters.location);
    }

    if (filters.deliveryStatus !== 'all') {
      filtered = filtered.filter(partner => partner.deliveryStatus === filters.deliveryStatus);
    }

    setFilteredPartners(filtered);
  }, [filters, deliveryPartners]);

  const handleViewDocuments = (partner) => {
    setSelectedPartner(partner);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === 'active') {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  const getDeliveryStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'available':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'busy':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'unavailable':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const handleAreaAssignment = (partnerId, newAreas) => {
    setDeliveryPartners(prev => 
      prev.map(partner => 
        partner.id === partnerId 
          ? { ...partner, assignedAreas: newAreas }
          : partner
      )
    );
    setShowAreaAssignment(null);
  };

  // Get unique values for filter options
  const uniqueLocations = [...new Set(deliveryPartners.map(p => p.location))];
  const deliveryStatuses = ['available', 'busy', 'unavailable'];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading delivery partners...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header section */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-lg md:text-xl font-semibold text-gray-800">
            Delivery Partners ({filteredPartners.length})
          </h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Filter size={16} />
            Filters
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Locations</option>
                  {uniqueLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Status</label>
                <select
                  value={filters.deliveryStatus}
                  onChange={(e) => handleFilterChange('deliveryStatus', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Delivery Status</option>
                  {deliveryStatuses.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Table section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 hidden md:table-header-group">
            <tr>
              {["S No", "Name", "Contact", "Location", "Status", "Delivery Status", "Assigned Areas", "Documents", "Actions"].map((head, i) => (
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
            {filteredPartners && filteredPartners.length > 0 ? (
              filteredPartners.map((partner, index) => (
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
                    <span className={getStatusBadge(partner.status)}>
                      {partner.status}
                    </span>
                  </td>
                  <td className="md:table-cell px-6 py-2 text-sm">
                    <span className="block md:hidden font-semibold">Delivery Status:</span>
                    <span className={getDeliveryStatusBadge(partner.deliveryStatus)}>
                      {partner.deliveryStatus}
                    </span>
                  </td>
                  <td className="md:table-cell px-6 py-2 text-sm">
                    <span className="block md:hidden font-semibold">Assigned Areas:</span>
                    <div className="flex flex-wrap gap-1">
                      {partner.assignedAreas?.map((area, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                          {area}
                        </span>
                      ))}
                      <button
                        onClick={() => setShowAreaAssignment(partner.id)}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 flex items-center gap-1"
                      >
                        <MapPin size={12} />
                        Assign
                      </button>
                    </div>
                  </td>
                  <td
                    onClick={() => handleViewDocuments(partner)}
                    className="md:table-cell px-6 py-2 text-sm text-blue-500 cursor-pointer hover:underline"
                  >
                    <span className="block md:hidden font-semibold">Documents:</span>
                    View ({partner.documents?.length || 0})
                  </td>
                  <td className="md:table-cell px-6 py-2 text-sm font-medium flex md:block space-x-4 mt-2 md:mt-0">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center text-sm">
                  No delivery partners found matching the current filters.
                </td>
                </tr>
              )}
            </tbody>
        </table>
      </div>

      {/* Area Assignment Modal */}
      {showAreaAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Assign Areas</h3>
              <button
                onClick={() => setShowAreaAssignment(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              {['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'].map(zone => {
                const partner = deliveryPartners.find(p => p.id === showAreaAssignment);
                const isAssigned = partner?.assignedAreas?.includes(zone);
                
                return (
                  <label key={zone} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isAssigned}
                      onChange={(e) => {
                        const currentAreas = partner?.assignedAreas || [];
                        const newAreas = e.target.checked
                          ? [...currentAreas, zone]
                          : currentAreas.filter(area => area !== zone);
                        handleAreaAssignment(showAreaAssignment, newAreas);
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{zone}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Documents section */}
      {selectedPartner && (
        <div className="mt-4 p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">
              Documents for {selectedPartner.name}
            </h3>
            <button
              onClick={() => setSelectedPartner(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          {selectedPartner.documents && selectedPartner.documents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedPartner.documents.map((doc, index) => (
                <div key={index} className="bg-white p-3 rounded border">
                  <div className="font-medium text-sm text-gray-700">{doc.document_type}</div>
                  <a
                    href={`https://app.freshmoo.in${doc.document_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm hover:text-blue-800"
                  >
                    View Document
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-4">
              <p>No documents available for this partner</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryPartnersTable;