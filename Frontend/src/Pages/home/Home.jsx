import React from 'react';
import Advertisement from './advertisement/Advertisement';
import Banner from './banner/Banner';
import LatestTickets from './latest-tickets/LatestTickets';

const Home = () => {


    return (
        <div className='max-w-7xl mx-auto'>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <LatestTickets></LatestTickets>
        </div>

    );
};

export default Home;