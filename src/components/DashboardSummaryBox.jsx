import React, { useState, useEffect } from 'react';
import { IoDocumentsOutline } from "react-icons/io5";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { FaBriefcase } from "react-icons/fa";
import { MdOutlineListAlt } from "react-icons/md";
import { DashMetricBox } from '../components'
import { IoDocuments } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";

const DashboardSummaryBox = ({data, modal}) => {

    return (
        <>
        <div className='bg-white rounded-[1rem]'>
                <div className='mt-5 ml-3 rounded-[1rem] flex justify-between items-center'>
                    <div className='flex justify-between p-5 items-center w-full mr-4'>
                        <h1 className='text-[1.1rem] flex gap-3 justify-start items-center text-[#302f2f] font-[500]'><MdSpaceDashboard className='text-[#959595]' /> Dashboard</h1>
                        <button onClick={modal} className='bg-blue-500 flex items-center gap-2 text-white py-3 text-[0.85rem] px-7 hover:bg-blue-900 rounded-[0.6rem] font-[500]'>Create Portfolio Report
                            <HiDocumentDuplicate className='text-[1.1rem]' />
                        </button>
                    </div>
                </div>

                <div className='border-t border-[#eeeeee] p-5 flex justify-between gap-6 items-center'>
                        <DashMetricBox title="Total Portfolio" textColor='text-[#222e50]' iconbgColor='bg-[#222e50]' style='bg-[#d9e2fc]' count={data.totalPortfolio} icon={<FaBriefcase />} />
                        <DashMetricBox title="Report Groups" style='bg-[#daebe9]' iconbgColor='bg-[#122f2b]'  textColor='text-[#122f2b]' count={data.totalReportGroups} icon={<IoDocuments />} />
                        <DashMetricBox title="Total Reports" style='bg-[#f9e0e3]' iconbgColor='bg-[#65262d]' textColor='text-[#65262d]' count={data.totalReports} icon={<MdOutlineListAlt />} />
                </div>
        </div>
        </>
    );
}

export default DashboardSummaryBox;