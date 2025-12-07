import React from 'react';
import useRole from '../../Hooks/useRole';

const Home = () => {

    const { role } = useRole()
    console.log(role)

    return (
        <div className='grid grid-cols-2 gap-5'>

        </div>

    );
};

export default Home;