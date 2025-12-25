import { Navigate, Outlet } from "react-router-dom";
import { UseAuth} from "./Auth.jsx";

function PrivateRoute() {
    const { user, loading } = UseAuth();

    // if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return <Outlet />;
}

export default PrivateRoute;