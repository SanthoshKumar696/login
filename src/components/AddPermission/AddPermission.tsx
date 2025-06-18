import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import API_ENDPOINTS from '../../utils/ApiEndPoints';
import { FaLock } from 'react-icons/fa';
import './AddPermission.css'

interface PermissionData {
  id: number;
  name: string;
  slug: string;
  description: string;
  module: string;
  action: string;
  resource: string;
  isSystemPermission: boolean;
  createdAt: string;
  updatedAt: string;
}

const AddPermissionForm: React.FC = () => {
  const [formData, setFormData] = useState<PermissionData>({
    id: 0,
    name: '',
    slug: '',
    description: '',
    module: '',
    action: '',
    resource: '',
    isSystemPermission: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type} = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post(API_ENDPOINTS.ADD_PERMISSIONS_ENDPOINT, formData);
      setSuccess('Permission created successfully!');
      console.log('Response:', res.data);

      // Reset form
      setFormData({
        id: 0,
        name: '',
        slug: '',
        description: '',
        module: '',
        action: '',
        resource: '',
        isSystemPermission: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error:', err);
      setError('Error creating permission.');
    }
  };

  return (
  <div className="max-w-3xl mx-auto p-6 bg-primary shadow-xl rounded-2xl">
    <div className="flex items-center mb-6">
      <FaLock className="text-2xl text-yellow-600 mr-2" />
      <h2 className="text-2xl font-semibold text-secondary">Add New Permission</h2>
    </div>

    {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}
    {success && <div className="mb-4 text-green-600 font-medium">{success}</div>}

    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Slug</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Module</label>
        <input
          type="text"
          name="module"
          value={formData.module}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Action</label>
        <input
          type="text"
          name="action"
          value={formData.action}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Resource</label>
        <input
          type="text"
          name="resource"
          value={formData.resource}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isSystemPermission"
          checked={formData.isSystemPermission}
          onChange={handleChange}
          className="h-5 w-5 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
        />
        <label className="text-sm text-gray-700">System Permission</label>
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
      >
        Create Permission
      </button>
    </form>
  </div>
);

};

export default AddPermissionForm;
