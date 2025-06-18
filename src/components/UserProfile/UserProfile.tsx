import React, { useState } from 'react';
import type {ChangeEvent } from 'react';
import {
  FaUserCircle,
  FaTrashAlt,
  FaUpload,
  FaPlus,
  FaTimes,
} from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';

interface Notification {
  id: number;
  text: string;
}

interface User {
  name: string;
  userId: string;
  gender: string;
  address: string;
  role: string;
  permissions: string[];
}

const UserProfile: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<(string | Notification)[]>([
    'Welcome to your profile!',
    'Your role was updated recently.',
    'New permission added: can_manage_users',
  ]);
  const [showTodo, setShowTodo] = useState<boolean>(false);
  const [todoText, setTodoText] = useState<string>('');
  const [todoTime, setTodoTime] = useState<string>('');

  const user: User = {
    name: 'Santhosh Kumar',
    userId: 'USR12345',
    gender: 'Male',
    address: 'No. 42, Gandhi Street, Sholinghur, Tamil Nadu',
    role: 'Admin',
    permissions: ['create_user', 'read_user', 'delete_user', 'manage_roles'],
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handlePhotoDelete = () => {
    setPhoto(null);
  };

  const handleAddTodo = () => {
    if (todoText && todoTime) {
      const newNotification: Notification = {
        id: Date.now(),
        text: `📝 Task: "${todoText}" at ${todoTime}`,
      };
      setNotifications([...notifications, newNotification]);
      setTodoText('');
      setTodoTime('');
    }
  };

  const handleDeleteTodo = (id: number) => {
    setNotifications(notifications.filter((item) => {
      return typeof item === 'string' || item.id !== id;
    }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* User Profile */}
      <div className="bg-white shadow rounded-2xl">
        <div className="bg-primary text-white px-6 py-4 rounded-t-2xl flex items-center gap-2">
          <FaUserCircle />
          <h4 className="text-lg font-semibold">User Profile</h4>
        </div>
        <div className="p-6 flex flex-col md:flex-row gap-6">
          {/* Profile Photo */}
          <div className="text-center">
            {photo ? (
              <img
                src={photo}
                alt="User"
                className="rounded-full border-4 border-gray-300 w-36 h-36 object-cover mx-auto"
              />
            ) : (
              <FaUserCircle size={150} className="text-gray-400 mx-auto" />
            )}
            <div className="mt-4 flex justify-center gap-3">
              <label className="inline-flex items-center px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded cursor-pointer hover:bg-blue-600 hover:text-white transition">
                <FaUpload className="mr-1" />
                Upload
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </label>
              {photo && (
                <button
                  className="inline-flex items-center px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
                  onClick={handlePhotoDelete}
                >
                  <FaTrashAlt className="mr-1" />
                  Delete
                </button>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Name:</p>
              <p className="text-gray-600">{user.name}</p>
            </div>
            <div>
              <p className="font-semibold">User ID:</p>
              <p className="text-gray-600">{user.userId}</p>
            </div>
            <div>
              <p className="font-semibold">Gender:</p>
              <p className="text-gray-600">{user.gender}</p>
            </div>
            <div>
              <p className="font-semibold">Address:</p>
              <p className="text-gray-600">{user.address}</p>
            </div>
            <div>
              <p className="font-semibold">Role:</p>
              <p className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">{user.role}</p>
            </div>
            <div>
              <p className="font-semibold">Permissions:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.permissions.map((perm, i) => (
                  <span key={i} className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white shadow rounded-2xl">
        <div className="bg-yellow-400 text-black px-6 py-4 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <IoIosNotifications size={24} />
            <h5 className="text-md font-semibold">Notifications</h5>
          </div>
          <button
            onClick={() => setShowTodo(!showTodo)}
            className="text-sm flex items-center gap-1 border border-black px-3 py-1 rounded hover:bg-black hover:text-white transition"
          >
            {showTodo ? <><FaTimes /> Close Task</> : <><FaPlus /> Add Task</>}
          </button>
        </div>
        <div className="p-6">
          {notifications.length === 0 ? (
            <p className="text-gray-500">No notifications yet.</p>
          ) : (
            <ul className="space-y-2 mb-4">
              {notifications.map((note) => (
                <li
                  key={typeof note === 'string' ? note : note.id}
                  className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded"
                >
                  <span>{typeof note === 'string' ? note : note.text}</span>
                  {typeof note === 'object' && (
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteTodo(note.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* To-Do Form */}
          {showTodo && (
            <div className="border-t pt-4 mt-4">
              <h6 className="font-semibold mb-2">Add a Task</h6>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="What to do?"
                  className="col-span-2 border px-3 py-2 rounded"
                  value={todoText}
                  onChange={(e) => setTodoText(e.target.value)}
                />
                <input
                  type="time"
                  className="border px-3 py-2 rounded"
                  value={todoTime}
                  onChange={(e) => setTodoTime(e.target.value)}
                />
                <button
                  className="bg-green-600 text-white rounded px-3 py-2 hover:bg-green-700 transition w-full"
                  onClick={handleAddTodo}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
