import Navbar from './navbar.jsx'
import { Outlet } from 'react-router-dom';

// Create Private Route to show the navbar only on auth views.
// Pages are essentially inserted into Outlet, that is why navbar will show on all pages that is auth required.
function PrivateLayout() {

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col w-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
}



export default PrivateLayout;
