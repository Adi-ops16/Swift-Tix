import React from 'react';
import banner1 from '../../../assets/banner1.png';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const Banner = () => {
    return (
        <div className="flex justify-center my-10">
            <figure>
                <img className='h-92 w-full' src={banner1} alt="" />
            </figure>
        </div>
    );
};

export default Banner;
