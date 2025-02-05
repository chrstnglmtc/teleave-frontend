import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const phone = localStorage.getItem("phone");

    return phone ? <Outlet /> : <Navigate to="/login" />;
};
