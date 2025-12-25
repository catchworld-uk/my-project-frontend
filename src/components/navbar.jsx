import { Link } from 'react-router-dom'
import { UseAuth } from "./Auth.jsx";
import {ChevronDown, ChevronUp, Plane, Settings, FileText, User, UserCircle, LogOut} from "lucide-react";
import React, {useState} from "react";


function Dropdown({sectionToggle, dropdownSection, sectionState, navbarSectionTitle}) {
    const handleItemClick = () => {
        sectionToggle();
    };

    return (
        <div className="relative">
            <button onClick={sectionToggle}
                    className="flex cursor-pointer items-center space-x-2 px-3 py-2 text-slate-300 hover:text-white transition-colors"
            >
                <span>{navbarSectionTitle}</span>
                {sectionState ? <ChevronUp className="h-4 w-4 transition-transform"/> :
                    <ChevronDown className="h-4 w-4 transition-transform"/>
                }
            </button>
            {sectionState && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-700 border border-slate-600 rounded-lg shadow-xl z-50">
                    <div className="py-2">
                        {dropdownSection.map((dropdownItem) => (
                            <Link
                                key={dropdownItem.id}
                                to={dropdownItem.url}
                                onClick={handleItemClick}
                                className="block w-full px-4 py-2 text-left text-white hover:bg-slate-600 transition-colors"
                            >
                                {dropdownItem.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )

}

function Navbar() {
    const {logout, user} = UseAuth();
    const [openDropdown, setOpenDropdown] = useState(null);

    const dispatchers = [
        {
            id: 1, title: "Handover", url: "/handover"
        },
        {
            id: 2, title: "Handover List", url: "/handover-list"
        },
    ]

    const cdd = [
        {
            id: 1, title: "CDD Handover", url: "/"
        },
        {
            id: 2, title: "Handover List", url: "/"
        },
        {
            id: 3, title: "RBN", url: "/"
        }

    ]

    const userSettings = [
        {
            id: 1, title: "Settings", url: "/", icon: Settings
        },
        {
            id: 2, title: "Profile", url: "/", icon: UserCircle
        },
        {
            id: 3, title: "Logout", url: "/login", icon: LogOut, function: logout
        }
    ]


    function handleToggle(sectionId) {
        setOpenDropdown((prev) => (prev === sectionId ? null : sectionId));
    }

    return (
        <div className="bg-slate-800 border-b border-slate-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="block">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-600 rounded-lg">
                                <Plane className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">FlairDispatch</h1>
                                <p className="text-sm text-slate-400">Flair Airlines</p>
                            </div>
                        </div>
                        </Link>
                    </div>


                    <div className="flex items-center space-x-6">
                        {/*Handover Dropdown Section*/}
                        <Dropdown
                            sectionToggle={() => handleToggle("handover")}
                            sectionState={openDropdown === "handover"}
                            dropdownSection={dispatchers}
                            navbarSectionTitle={
                                <span className="flex items-center space-x-1">
                                    <FileText className="h-4 w-4 mr-1" />
                                    <span>Dispatchers</span>
                                </span>
                            }
                        />
                        <Dropdown
                            sectionToggle={() => handleToggle("CDD")}
                            sectionState={openDropdown === "CDD"}
                            dropdownSection={cdd}
                            navbarSectionTitle={
                                <span className="flex items-center space-x-1">
                                    <Settings className="h-4 w-4 mr-1" />
                                    <span>CDD</span>
                                </span>
                            }
                        />
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button
                                    onClick={() => handleToggle("profile")}
                                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 rounded-full text-white cursor-pointer select-none"
                                >
                                    <User className="h-4 w-4" />
                                    <span className="text-sm font-medium">Hi, {user.userDetails.firstName}</span>
                                    {openDropdown === "profile" ? (
                                        <ChevronUp className="h-4 w-4 transition-transform" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4 transition-transform" />
                                    )}
                                </button>
                                {openDropdown === "profile" && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-xl z-50">
                                        <div className="p-4 border-b border-slate-200">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-blue-600 rounded-full">
                                                    <User className="h-5 w-5 text-white" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-900">{user.userDetails.fullName}{}</div>
                                                    <div className="text-sm text-slate-600">User Role</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-2">
                                            {userSettings.map((user) => {
                                                const Icon = user.icon;
                                                return (
                                                    <Link
                                                        key={user.id}
                                                        to={user.url}
                                                        onClick={() => { if (user.function) user.function()}}
                                                        className={
                                                            user.id === 3
                                                                ? "w-full px-4 py-2 text-left text-red-600 hover:bg-slate-50 transition-colors flex items-center space-x-3"
                                                                : "w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 transition-colors flex items-center space-x-3"
                                                        }

                                                    >
                                                        <Icon
                                                            className={
                                                                user.id === 3
                                                                    ? "h-4 w-4 text-red-600 mr-1"
                                                                    : "h-4 w-4 text-slate-600 mr-1"
                                                            }
                                                        />
                                                        {user.title}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}


export default Navbar