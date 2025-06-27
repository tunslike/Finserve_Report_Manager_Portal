import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ChangePassword, Dashboard, ForgotPassword, Login, ManageUsers, Porfolio, Reports, System } from "../pages";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/resetPassword" element={<ForgotPassword />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/portfolio" element={<Porfolio />} />
                <Route path="/manage-users" element={<ManageUsers />} />
                <Route path="/system" element={<System />} />
                <Route path="/reports" element={<Reports />} />
            </Route>
            <Route path="*" element={<Login />}></Route>
        </Routes>
    )
}

export default AppRoutes;