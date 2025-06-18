import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaChartBar,
  FaUsers,
  FaDollarSign,
  FaCogs,
  FaMagento,
} from "react-icons/fa";
import logo from "../../assets/logo-remove-extra-spaces.png";
import favicon from "../../assets/fevicon.png";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import './Dashboard.css'
import './../../index.css'

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-primary text-white w-60 p-5">
      <img src={logo} alt="logo" className="bg-white img-logo" />
        <ul className="space-y-3">
          <li>
            <a href="#" className="flex items-center gap-2 hover:bg-red-600 p-2 rounded">
              <FaChartBar />
              Overview
            </a>
          </li>
          <li>
            <Link to="UsersPage" className="flex items-center gap-2 hover:bg-red-600 p-2 rounded">
              <FaUsers />
              Users
            </Link>
          </li>
          <li>
            <a href="#" className="flex items-center gap-2 hover:bg-red-600 p-2 rounded">
              <FaDollarSign />
              Sales
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-2 hover:bg-red-600 p-2 rounded">
              <FaCogs />
              Settings
            </a>
          </li>
          <li>
            <Link to="permissions" className="flex items-center gap-2 hover:bg-red-600 p-2 rounded">
              <FaCogs />
              Permissions
            </Link>
          </li>
          <li>
            <Link to="role_permission" className="flex items-center gap-2 hover:bg-red-600 p-2 rounded">
              <FaCogs />
              Role Permissions
            </Link>
          </li>
          <li>
            <Link to="user_profile" className="flex items-center gap-2 hover:bg-red-600 p-2 rounded">
              <FaMagento />
              User Profile
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Topbar */}
        <nav className="bg-secondary text-black shadow px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-semibold">Dashboard</span>
          <div className="flex items-center gap-3">
          
             <img src={favicon} alt="avatar" className="rounded-full border-2 border-primary avatar-img" />
             
            
          </div>


        </nav>

        
        {/* Breadcrumb */}
        <div className="px-6 pt-4">
          <Breadcrumb />
        </div>

        <main className="p-6 bg-light flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
