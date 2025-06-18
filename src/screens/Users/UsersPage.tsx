import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

import SearchBar from "../../components/SearchBar/SearchBar";
import UserTable from "../../components/UserTable/UserTable";
import Pagination from "../../components/Pagination/Pagination";

import type { User, RawUser } from "../../types/types";

const UsersPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useUserContext();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    if (users.length === 0) fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const rawData: RawUser[] = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "1234567890",
        username: "admin",
        status: "Active",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        phone: "9876543210",
        username: "user",
        status: "Inactive",
      },
    ];

    const apiUsers: User[] = rawData.map((u) => ({
      ...u,
      role: u.username === "admin" ? "Admin" : "User",
      permissions: "Read, Write",
      status: u.status === "Active" ? "Active" : "Inactive",
    }));

    setUsers(apiUsers);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  function setEditUserAndShow(user: User) {
    navigate(`/dashboard/edit/${user.id}`); // or simply `/users/edit/${user.id}`
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <button
          onClick={() => navigate("add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add User
        </button>
      </div>

      <SearchBar search={search} setSearch={setSearch} />
      <UserTable
        users={paginatedUsers}
        onEdit={setEditUserAndShow}
        onDelete={handleDelete}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default UsersPage;
