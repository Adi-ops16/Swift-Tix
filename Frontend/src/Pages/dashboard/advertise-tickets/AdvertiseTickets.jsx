import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AdvertiseTickets = () => {
    const axiosSecure = useAxiosSecure()
    const { data: tickets = [] } = useQuery({
        queryKey: ['tickets', 'accepted'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets?status=accepted')
            return res.data
        }
    })
    console.log(tickets)
    return (
        <div>
            <h2 className="text-2xl font-bold">Advertise tickets</h2>
        </div>
    );
};

export default AdvertiseTickets;