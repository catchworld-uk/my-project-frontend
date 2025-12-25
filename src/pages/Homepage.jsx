import React from 'react';
import {UseAuth} from "../components/Auth.jsx"


// function HomePage() {
//     const { user, logout } = UseAuth();
//
//     return (
//         <div>
//             <h1>Welcome to the dashboard!</h1>
//
//             <p>User: {user?.userDetails.email}</p>
//             {/*<p>First: {user?.userDetails.firstName}</p>*/}
//             {/*<button onClick={logout}>Logout</button>*/}
//         </div>
//     );
// }


function HomePage() {
    const { user, logout } = UseAuth();

    return (
        <div>
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-700 rounded-2xl p-8 mb-8 border border-slate-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-center">
                            <div className="max-w-2xl">
                                <h1 className="text-4xl font-bold text-white mb-4">
                                    Welcome Back, <span className="text-blue-400">{user?.userDetails.fullName}</span>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default HomePage;

