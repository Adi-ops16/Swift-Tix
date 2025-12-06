import React, { useState } from "react";
import { NavLink } from "react-router";
import { FaThLarge, FaSignOutAlt, FaUser } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import Logo from "../Shared/Logo";

const SideBar = () => {
    const { user, logOut } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    const links = <>
        <li>
            <NavLink to="/dashboard"
                className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 hover:bg-base-200">
                <span className="text-lg">
                    <FaThLarge />
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Dashboard

                </span>
            </NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/profile"
                className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 hover:bg-base-200">
                <span className="text-lg">
                    <FaUser />
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    My Profile
                </span>
            </NavLink>
        </li>
    </>

    return (
        <>
            <div className="lg:hidden flex items-center px-3 py-2 bg-base-100 border-b border-base-200">
                <button
                    aria-label="Open sidebar"
                    className="btn btn-ghost"
                    onClick={() => setMobileOpen(true)}
                >
                    ☰
                </button>
                <div className="ml-3 font-bold"><Logo></Logo></div>
            </div>

            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                >
                    <div className="absolute inset-0 bg-black/40" />
                </div>
            )}

            {/* Sidebar container */}
            <aside className={`fixed left-0 top-0 h-screen z-50
                w-16 hover:w-[260px] group transition-[width] duration-300 ease-in-out bg-base-200 border-r border-base-200 hidden lg:block`}
                aria-label="Sidebar">

                <div className="h-full flex flex-col">

                    <div className="flex items-center gap-3 px-3 py-4">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="font-bold">Swift-Tix</div>
                            <div className="text-xs text-base-content/60">Book with ease</div>
                        </div>
                    </div>

                    {/* Menu */}
                    <nav className="flex-1 px-1 mt-4">
                        <ul className="flex flex-col gap-1">
                            {links}
                        </ul>
                    </nav>

                    {/* Footer area */}
                    <div className="px-3 pb-6">
                        <div className="border-t border-base-200 pt-4">
                            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-base-200">
                                <img
                                    src={user?.photoURL}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <div className="font-medium">{user?.displayName}</div>
                                    <div className="text-xs text-base-content/60">Role: {user?.role || "user"}</div>
                                </div>
                            </div>

                            <div className="mt-3 flex items-center gap-2">
                                <button
                                    onClick={logOut}
                                    className="btn btn-ghost w-full justify-start gap-3 rounded-lg"
                                >
                                    <FaSignOutAlt />
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-base-200 border-r border-base-200 transform transition-transform duration-250 lg:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="font-bold">
                            Swift-Tix
                        </div>
                        <button className="btn btn-ghost" onClick={() => setMobileOpen(false)}>✕</button>
                    </div>

                    <nav className="mt-6">
                        <ul className="flex flex-col gap-2">
                            {links}
                        </ul>
                    </nav>

                    <div className="mt-6">
                        <button onClick={logOut} className="btn btn-outline w-full">Logout</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;
