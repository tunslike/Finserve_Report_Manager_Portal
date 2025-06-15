import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { IoNotificationsSharp } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { useSelector } from 'react-redux';


const DashboardHeader = () => {

    const subscriberData = useSelector((state) => state.subscriber.subscriberData)
    const [searchText, setSearchText] = useState('');
    const [notCount, setNotCount] = useState(1);

    return (
        <div className='bg-white rounded-[1rem] w-full flex justify-between p-5 items-center'>
            <div className='ml-5'>
                <h1 className='text-[1.3rem] font-[500] text-primaryBlue'>Welcome, {subscriberData.firstname}</h1>
                <h5 className='text-[0.7rem] text-[#2b7ec6]'>Last Login: 29 May 2025</h5>
            </div>
            <div className='w-[50%] flex justify-between items-center border border-[#e4e4e4] rounded-[1.5rem] px-7 py-3'>
                <input type='text' value={searchText} onChange={(e) => setSearchText(e.target.value)} className='placeholder-[#a8a8a8] text-[0.85rem] w-full' placeholder='Enter report name to search...' />
                <FiSearch className='text-[#ababab] text-[1.2rem]' />
            </div>
            <div className='flex justify-start items-center gap-5 mr-5'>
                <div className='relative dash-header-icon'>
                    <IoNotificationsSharp className='text-[1.3rem] text-primaryBlue' />
                    {notCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-ping-slow">
                          {notCount}
                        </span>
                      )}
                </div>
                <div className='dash-header-icon'>
                    <LuUserRound className='text-[1.3rem] text-primaryBlue' />
                
                </div>
            </div>
        </div>
    )

}

export default DashboardHeader;