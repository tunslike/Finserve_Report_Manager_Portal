import React, {useState, useEffect} from 'react'
import {
        DashboardSideBar, 
        DashboardHeader,  ProgressBar, TableDisplay
    } from '../../components';
import { APIBaseUrl } from '../../constants';
import axios from 'axios';
import { MdOutlineListAlt } from "react-icons/md";
import { LuDownload } from "react-icons/lu";
import { loadPortfolioReportList } from '../../services/ReportManagerService';  


const Reports = () => {
    
    const [portfolioReportList, setPortfolioReportList] = useState([]);
    const [loading, setLoading] = useState(false);


      // handle download
      const handleDownload = async (reportGroupId) => {
        try {
          const token = localStorage.getItem('token'); // or use context/auth store

          if(!token) {
            navigate("/login")
          }
      
          const response = await axios.get(
            `${APIBaseUrl.baseUrl}report-manager/download-portfolioReport?reportGroupId=${reportGroupId}`,
            {
              responseType: 'blob', // important for binary download
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
       // ✅ Extract filename from header
    let filename = reportGroupId+'_report.pdf';
    const disposition = response.headers['content-disposition'];

    if (disposition) {
      const filenameStarMatch = disposition.match(/filename\*\s*=\s*UTF-8''([^;\n]*)/i);
      if (filenameStarMatch && filenameStarMatch[1]) {
        filename = decodeURIComponent(filenameStarMatch[1]);
      } else {
        const filenameMatch = disposition.match(/filename\s*=\s*"?([^;\n"]+)"?/i);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }
    }

    // ✅ Trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
  }
};



    // function to call portfolio list
    const fetchPortfolioReportList = async () => {

        try {

            setLoading(true)

            const response = await loadPortfolioReportList();
            setLoading(false)

            console.log(response)
            setPortfolioReportList(response.portfolioReportList);

        }catch(e) {
            setLoading(false)
            console.error(e)
        }
    }

        // fetch data
        useEffect(() => {
            fetchPortfolioReportList()
        }, []);

    return (
        <>
        <ProgressBar loading={loading} />
        <div className="flex min-h-screen">
             {/* Left Sidebar - 20% */}
               <DashboardSideBar  url='Reports' />
             {/* End of Left Sidebar - 20% */}
             {/* Main Content - 80% */}
                <div className="w-4/5 bg-[#eff1ff] p-6">
                            
                {/* Dashboard Header */}
                <DashboardHeader type='page' title='Porfolio Reports' />    

                <br></br>
                <TableDisplay title='List of Portfolio Reports' icon={<MdOutlineListAlt className='text-[#959595] text-[1.2rem]' />}>
                    <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 text-[0.8rem] text-left">
                        <th className="px-4">#</th>
                        <th className="px-4 py-3">Portfolio</th>
                        <th className="px-4 py-3">Report Name</th>
                        <th className="px-4 py-3 text-center">Total Report</th>
                        <th className="px-4 py-3">Date Created</th>
                        <th className="px-4 py-3">Created By</th>
                        <th className="px-4 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-[0.78rem]'>
                        {portfolioReportList.length === 0 ? (
                        <tr>
                            <td className="px-4 py-2 text-center" colSpan="8"><div className='bg-[#f8d7da] text-[#721c24] text-[0.8rem] w-[300px] mx-auto p-5 mt-5 rounded-[1.5rem]'>No portfolio report found!</div></td>
                        </tr>
                        ) : (
                            portfolioReportList.map((report, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="px-4 py-3">{index + 1}</td>
                            <td className="px-4 py-3"><a className='text-blue-500 underline' href='#'>{report.portfolioReportName}</a></td>
                            <td className="px-4 py-3">{report.portfolioName}</td>
                            <td className="px-4 py-3 text-center">{report.totalReports}</td>
                            <td className="px-4 py-3">{new Date(report.dateCreated).toLocaleDateString()}</td>
                            <td className="px-4 py-3">{report.createdBy}</td>
                            <td>
                            <button className='' title='Download Report' onClick={() => handleDownload(report.portfolioReportId)}>
                              <LuDownload className='text-primaryRed ml-7 text-[1rem]' />
                            </button>
                        </td>
                            </tr>
                        ))
                        )}
                    </tbody>
                    </table>
                </div>
                </TableDisplay>
            
            </div>
            {/* End of Main Content - 80% */}
        </div>
    </>
    )
}

export default Reports;
