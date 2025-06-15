import React from 'react';

const TableDisplay = ({title, icon, children}) => {
    return (
        <div className='bg-white w-full min-h-[300px] rounded-[1rem]'>
            <div className='p-5 pl-8 flex justify-start items-center gap-3'>
                {icon}
                <h1 className='text-[0.85rem] text-[#5e5e5e] font-[500]'>{title}</h1>
            </div>
            <div className='border-t p-5 pl-8 border-[#eeeeee]'>
                {children}
            </div>
        </div>
    );
}

export default TableDisplay;