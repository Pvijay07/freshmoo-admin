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
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          Banners
        </h1>
        <button
          onClick={() => setEditingBanner(true)}
          className="flex items-center justify-center bg-green-500 text-white px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg hover:bg-green-600"
        >
          <MdAdd className="mr-2" /> Add Banner
        </button>
      </div>

      {/* Form */}
      {editingBanner && (
        <div className="px-4 md:px-6 py-4">
          <BannerForm
            banner={editingBanner}
            onCancel={() => setEditingBanner(null)}
            onSubmit={(updatedBanner) => {
              if (updatedBanner.id) {
                handleSave(updatedBanner, editingBanner.id);
              } else {
                handleCreate(updatedBanner);
              }
              setEditingBanner(null);
            }}
          />
        </div>
      )}

      {/* Table with overflow for mobile */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="bg-gray-50 text-xs md:text-sm">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                S No
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                Link
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {banners.map((banner, index) => (
              <tr key={banner.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">{index + 1}</td>
                <td className="px-4 py-3 whitespace-nowrap">{banner.title}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    {banner.images ? (
                      JSON.parse(banner.images).map((image, i) => (
                        <img
                          key={i}
                          src={`http://app.freshmoo.in/uploads/${image}`}
                          alt={banner.title}
                          className="w-10 h-10 object-cover rounded border"
                        />
                      ))
                    ) : (
                      <span className="text-gray-400">No Images</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{banner.link}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      banner.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {banner.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap flex space-x-2">
                  <button
                    onClick={() => setEditingBanner(banner)}
                    className="text-blue-500 hover:text-blue-700"
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
    </div>
  );
};

export default BannersTable;
