// src/layouts/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router";
import SideBar from "../Components/sidebar/SideBar";
import Logo from "../Components/Shared/Logo";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-base-100">
            {/* side bar */}
            <SideBar />

            <div className="lg:pl-16">
                <header className="h-16 hidden lg:flex items-center justify-between px-4 border-b border-base-200 bg-base-200">
                    <div className="flex items-center gap-3">
                        <div className="text-sm font-semibold">
                            <Logo></Logo>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="btn btn-ghost">Help</button>
                    </div>
                </header>

                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
