import React, { useState } from 'react';

const BannerForm = ({ banner, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(banner ? banner.title : '');
  const [description, setDescription] = useState(banner ? banner.description : '');
  const [imageUrl, setImageUrl] = useState(banner ? banner.image_url : '');
  const [link, setLink] = useState(banner ? banner.link : '');
  const [isActive, setIsActive] = useState(banner ? banner.is_active : true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: banner?.id,
      title,
      description,
      image_url: imageUrl,
      link,
      is_active: isActive,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">
        {banner?.id ? 'Edit Banner' : 'Add Banner'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Banner Title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Banner Description"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Image URL"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Link"
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
            {banner?.id ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BannerForm;