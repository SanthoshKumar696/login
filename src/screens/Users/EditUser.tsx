import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios"; // ✅ Add axios import (optional for now)
import type { User } from "../../types/types";
import { useUserContext } from "../../context/UserContext"; // ⬅️ assuming you use context or lift state from parent

const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [users, setUsers] = useUserContext(); // or replace with props
  const [form, setForm] = useState<User | null>(null);

  useEffect(() => {
    const user = users.find((u) => u.id === Number(id));
    if (user) setForm(user);
    else navigate("/users");

    // TODO: Replace with API call to fetch user
    /*
    axios.get(`/api/users/${id}`)
      .then(res => setForm(res.data))
      .catch(() => navigate("/users"));
    */
  }, [id, users]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    // ✅ For frontend-only testing
    const updatedUsers = users.map((u) =>
      u.id === form.id ? form : u
    );
    setUsers(updatedUsers);
    navigate("/users");

    // TODO: Replace with axios PUT request in future
    /*
    try {
      await axios.put(`/api/users/${form.id}`, form);
      navigate("/users");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
    */
  };

  if (!form) return <div className="text-center mt-10">Loading user...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {(["firstName", "lastName", "email", "phone", "role", "permissions"] as (keyof User)[]).map((key)=> (
          <div key={key}>
            <label className="block text-gray-600 capitalize mb-1">
              {key}
            </label>
            <input
              type="text"
              value={form [key]}
              onChange={(e) =>
                setForm((prev) => ({ ...(prev as User), [key]: e.target.value }))
              }
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div>
          <label className="block text-gray-600 mb-1">Status</label>
          <select
            value={form.status}
            onChange={(e) =>
              setForm((prev) => ({
                ...(prev as User),
                status: e.target.value as "Active" | "Inactive",
              }))
            }
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
