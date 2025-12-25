import { Navigate } from "react-router-dom";
import { UseAuth } from "./Auth.jsx";

const PublicRoute = () => {
    const { user } = UseAuth();

    return user ? <Navigate to="/homepage" replace /> : <Navigate to="/login" replace />;
};


export default PublicRoute