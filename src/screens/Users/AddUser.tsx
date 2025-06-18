import React, { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// Define user payload type
interface NewUserPayload {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  status: string;
  avatarUrl: string;
  createdBy: number;
}

// Initial state for form
const initialUserState: NewUserPayload = {
  username: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phone: "",
  status: "Active",
  avatarUrl: "",
  createdBy: 1,
};

const AddUserPage: React.FC = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState<NewUserPayload>(initialUserState);
  const [isSaving, setIsSaving] = useState(false); // loading state

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Simulate a fake API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("✅ Mocked user added:", newUser);
      alert("User added successfully (mocked)!");
      navigate("/users");
    } catch (error) {
      console.error("❌ Error adding user:", error);
      alert("Failed to add user.");
    } finally {
      setIsSaving(false);
    }
  };

  type InputField = keyof Pick<
    NewUserPayload,
    "firstName" | "lastName" | "username" | "email" | "password" | "phone" | "avatarUrl"
  >;

  const inputFields: [label: string, key: InputField][] = [
    ["First Name", "firstName"],
    ["Last Name", "lastName"],
    ["Username", "username"],
    ["Email", "email"],
    ["Password", "password"],
    ["Phone", "phone"],
    ["Avatar URL", "avatarUrl"],
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Add New User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {inputFields.map(([label, key]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={key === "password" ? "password" : "text"}
              value={newUser[key]}
              onChange={(e) =>
                setNewUser((prev) => ({
                  ...prev,
                  [key]: e.target.value,
                }))
              }
              required={key !== "avatarUrl"}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={newUser.status}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, status: e.target.value }))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/UsersPage")}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className={`px-4 py-2 rounded-md text-white transition ${
              isSaving
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSaving ? "Saving..." : "Save User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserPage;
