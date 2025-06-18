// src/Routes/Route.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../screens/LoginScreen/Login";
import Dashboard from "../screens/Dashboard/Dashboard";
import AddPermissionForm from "../components/AddPermission/AddPermission";
import UserProfile from "../components/UserProfile/UserProfile";
import UsersPage from "../screens/Users/UsersPage";
import AddUserPage from "../screens/Users/AddUser";
import EditUserPage from "../screens/Users/EditUser";


// import ForgetPassword from '../Components/ForgetPassword/ForgetPassword';
// import OtpVerification from '../Components/OtpVerification/OtpVerification';
// import ChangePassword from '../Components/ChangePassword/ChangePassword';

// import Dashboard from '../Components/Dashboard/Dashboard';

// import UsersPage from '../Components/UsersPage/UsersPage';
// import Permissions from '../Components/Permissions/Permissions';
// import RolePermissionsPage from '../Components/Role_Permission/Role_Permission';
// import UserProfile from '../Components/UserProfile/UserProfile';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Redirect to login by default */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/verify-otp" element={<OtpVerification />} />
      <Route path="/change-password" element={<ChangePassword />} /> */}

      {/* Dashboard and nested routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        {/* <Route index element={<DefaultContent />} /> */}
        <Route path="permissions" element={<AddPermissionForm />} />
        <Route path="user_profile" element={<UserProfile />} />
        <Route path="UsersPage" element={<UsersPage />} />
        <Route path="UsersPage/add" element={<AddUserPage />} />
        <Route path="edit/:id" element={<EditUserPage/>}/>
        {/* <Route path="role_permission" element={<RolePermissionsPage />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
