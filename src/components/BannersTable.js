import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import BannerForm from './BannerForm';
import { MdAdd } from 'react-icons/md';

const BannersTable = () => {
  const [banners, setBanners] = useState([]);
  const [editingBanner, setEditingBanner] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/banners');
      const data = await response.json();
      setBanners(data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/banners/${id}`, { method: 'DELETE' });
      fetchBanners(); // Refresh the list
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Banners</h2>
      <button
        onClick={() => setEditingBanner({})}
        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600"
      >
        <MdAdd />Add Banner
      </button>
      {editingBanner && (
        <BannerForm
          banner={editingBanner}
          onCancel={() => setEditingBanner(null)}
          onSubmit={(updatedBanner) => {
            if (updatedBanner.id) {
              // Update existing banner
              setBanners(
                banners.map((banner) =>
                  banner.id === updatedBanner.id ? updatedBanner : banner
                )
              );
            } else {
              // Add new banner
              setBanners([...banners, updatedBanner]);
            }
            setEditingBanner(null);
          }}
        />
      )}
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Link</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner.id}>
              <td className="py-2 px-4 border-b">{banner.id}</td>
              <td className="py-2 px-4 border-b">{banner.title}</td>
              <td className="py-2 px-4 border-b">
                <img src={banner.image_url} alt={banner.title} className="w-16 h-16 object-cover" />
              </td>
              <td className="py-2 px-4 border-b">{banner.link}</td>
              <td className="py-2 px-4 border-b">
                {banner.is_active ? 'Active' : 'Inactive'}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => setEditingBanner(banner)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
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

export default BannersTable;