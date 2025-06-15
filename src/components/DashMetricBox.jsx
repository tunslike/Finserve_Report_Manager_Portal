
import React, { useState } from 'react';
import CountUp from 'react-countup';


const DashMetricBox = ({title, count, style, iconbgColor, textColor, icon}) => {

    return (
        <div className={`w-full ${style} cursor-pointer p-10 rounded-[1rem] flex justify-between items-center}`}>
        <div>
            <h1 className={`${textColor} text-[0.9rem]`}>{title}</h1>
            <h1 className={`text-[1.8rem] ${textColor} mt-1 font-[500]`}>
                   <CountUp end={count} duration={5} />
            </h1>
            
        </div>
        <div className={`h-[60px] w-[60px] text-[1.5rem] ${iconbgColor} flex justify-center items-center rounded-full text-[#ffffff]`}>
            {icon}
        </div>
        </div>

    );
}

export default DashMetricBox;