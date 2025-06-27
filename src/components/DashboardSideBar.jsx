import React, { useState, useEffect } from 'react';
import { FiHome, FiUser } from 'react-icons/fi';
import { FaBriefcase } from "react-icons/fa";
import { MdOutlineListAlt } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { FaUsersCog } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const menuItems = [
  { label: 'Dashboard', icon: <FiHome />, url: '/dashboard' },
  { label: 'Portfolio', icon: <FaBriefcase />, url: '/portfolio' },
  { label: 'Reports', icon: <MdOutlineListAlt />, url: '/reports' },
  { label: 'System', icon: <LuSettings />, url: '/system' },
  { label: 'User Management', icon: <FaUsersCog />, url: '/manage-users' },
];

const DashboardSideBar = ({url}) => {


  const subscriberData = useSelector((state) => state.subscriber.subscriberData)

  const { user, logout } = useAuth();
  const [active, setActive] = useState('');
  const navigate = useNavigate();


  const handleLogout = async () => {

    // logout user
    const response = await logout();
    navigate('/login')
}

  // logout user
  const logoutUser = () => {

    Swal.fire({
      title: "Do you want to Logout?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0ad13f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
      
          //submit completed task
          handleLogout();
          return;
        
      }
    });

  }
  // end logout user


  const navigatePage = (url, activeTab) => {
    setActive(activeTab)
    navigate(url)
  }

     // fetch data
     useEffect(() => {
      setActive(url)
  }, []);

  return (
    <>
    <div className="w-1/5 bg-[#eff1ff] text-white p-3">
    <div className='bg-[#1b2536] min-h-screen p-3 rounded-[1.5rem] mb-[5rem]'>

        <div className='bg-[#273245] rounded-[1rem] p-5 flex items-center justify-start gap-5'>
            <img className='w-[40px] rounded-md' src='./images/icon.png' />
            <h1 className='font-[600] text-white text-[1rem]'>Report Management <span className='text-primaryRed'>Portal</span></h1>
        </div>
        <div className='flex justify-start items-center gap-5 ml-10 mt-5'>
            <FaUserAlt className='text-[#ff9305] text-[1rem]' />
            <h1 className='text-[#c1d3f7] text-[0.85rem]'>{subscriberData.role}</h1>
        </div>

        <div className='p-3 mt-8'>
            <h1 className='text-[#6a82ad] flex items-center gap-2 text-[0.85rem]'><HiMenuAlt2 className='text-[1.2rem]' /> MENU</h1>
        </div>

    <ul className="space-y-3 mt-2">
      {menuItems.map((item) => {

        const isActive = active === item.label;

        return (
          <li>
            <Link 
              key={item.label}
              className={`group flex items-center space-x-3 px-4 py-3 rounded-[0.5rem] text-[0.85rem] cursor-pointer transition-all duration-200 transform 
              ${isActive ? 'bg-[#f0f5ff] text-[0.9rem] text-primaryBlue' : 'text-[#cacaca]'}
              hover:bg-white hover:text-primaryBlue hover:translate-x-2`}
              to={item.url}>
                  <span className={`text-lg transition-colors duration-200 ${isActive ? 'text-primaryRed' : 'text-[1rem] text-[#6a82ad]'} group-hover:text-primaryRed`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
            </Link>
     
          </li>
        );
      })}
    </ul>

    <div className='ml-3 mt-[5rem]'>
      <button onClick={() => logoutUser()} className='bg-primaryRed py-3 text-[0.85rem] px-[6rem] hover:bg-[#f34848] rounded-lg flex gap-x-2 items-center justify-start'>Logout
          <LuLogOut className='font-semibold text-[1rem]'/>
      </button>
    </div>
    </div>
    </div>
    </>
  );
};

export default DashboardSideBar;
