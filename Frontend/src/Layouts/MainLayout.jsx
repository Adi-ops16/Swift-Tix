import React from 'react';
import Navbar from '../Components/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Shared/Footer';

const MainLayout = () => {
    return (
        <div className='flex flex-col justify-between min-h-screen'>
            <Navbar></Navbar>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;