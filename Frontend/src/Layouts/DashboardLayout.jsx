import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { motion } from "framer-motion";
import SideBar from "../Components/sidebar/SideBar";
import Logo from "../Components/Shared/Logo";

const DashboardLayout = () => {

    const [isExpanded, setIsExpanded] = useState(false);

    const largeScreenBreakpoint = 1024
    const collapsedPadding = 64;
    const expandedPadding = 256;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < largeScreenBreakpoint && isExpanded) {
                setIsExpanded(false)
            }

        }
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [isExpanded])

    return (
        <div className="min-h-screen bg-base-100 flex">

            <SideBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

            <motion.div
                className="lg:pl-16 flex-1"
                animate={window.innerWidth >= largeScreenBreakpoint ? { paddingLeft: isExpanded ? expandedPadding : collapsedPadding } : {}}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
                <header className="h-16 hidden lg:flex w-full items-center justify-between px-4 border-b border-base-200 bg-base-200">
                    <div className="flex items-center gap-3">
                        <div className="text-sm font-semibold">
                            <Logo />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="btn btn-ghost">Help</button>
                    </div>
                </header>

                <main className="pt-16 lg:pt-0">
                    <Outlet />
                </main>
            </motion.div>
        </div>
    );
};

export default DashboardLayout;
