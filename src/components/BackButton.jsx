import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

const BackButton = ({to}) => {
  return (
    <Link className='flex gap-x-2 items-center hover:bg-[#0582ff] hover:text-white text-[0.75rem] text-[#0582ff] border border-[#0582ff] px-3 py-[4px] rounded-[1rem]' to={to ? to : -1}><FaArrowLeftLong /> Back</Link>
  )
}

export default BackButton
