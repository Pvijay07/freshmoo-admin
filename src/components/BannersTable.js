import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import BannerForm from "./BannerForm";
import { MdAdd } from "react-icons/md";
import { createBanner, deleteBanner, getbanners, updateBanner } from "../api";

const BannersTable = () => {
  const [banners, setBanners] = useState([]);
  const [editingBanner, setEditingBanner] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await getbanners();
      setBanners(response.banners);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBanner(id);
      fetchBanners(); // Refresh the list
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  const handleSave = async (banner, bannerId) => {
    try {
      await updateBanner(bannerId, banner);
      setBanners((prevCategories) =>
        prevCategories.map((c) => (c.id === bannerId ? banner : c))
      );
      setEditingBanner(null);
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  const handleCreate = async (banner) => {
    try {
      await createBanner(banner);
      // setBanners(data);
      setBanners((prevBanners) => [...prevBanners, banner]);

      setEditingBanner(null);
    } catch (error) {
      console.error("Error creating banner:", error);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Banners</h1>
        <button
          onClick={() => setEditingBanner(true)}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          <MdAdd className="mr-2" /> Add Banner
        </button>
      </div>
      {editingBanner && (
        <BannerForm
          banner={editingBanner}
          onCancel={() => setEditingBanner(null)}
          onSubmit={(updatedBanner) => {
            if (updatedBanner.id) {
              // Update existing banner
              handleSave(updatedBanner, editingBanner.id);
            } else {
              // Add new banner
              handleCreate(updatedBanner);
            }
            setEditingBanner(null);
          }}
        />
      )}
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr>
          <th 
            scope="col"

                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >S No</th>
             <th 
            scope="col"

                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >Title</th>
            <th 
            scope="col"

                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >Image</th>
             <th 
            scope="col"

                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >Link</th>
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
          {banners.map((banner, index) => (
            <tr key={banner.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{banner.title}</td>
              <td className="py-2 px-4 border-b">
                <img
                  src={banner.image_url}
                  alt={banner.title}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="py-2 px-4 border-b">{banner.link}</td>
              <td className="py-2 px-4 border-b">
                {banner.is_active ? "Active" : "Inactive"}
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
