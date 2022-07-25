import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

const ProtecedRoute = ({ children }) => {
    const { user } = UserAuth();
    if (!user) {
        return <Navigate to="/login"></Navigate>;
    }
    return children;
};

export default ProtecedRoute;
