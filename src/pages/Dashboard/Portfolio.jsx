import React, {useState, useEffect} from 'react'
import {
        DashboardSideBar, 
        DashboardHeader,  ProgressBar, TableDisplay
    } from '../../components';
import { fetchAllPortfolioList } from '../../services/ReportManagerService'; 
import { FaBriefcase } from "react-icons/fa"; 



const Porfolio = () => {

    const [portfolioList, setPortfolioList] = useState([]);
    const [loading, setLoading] = useState(false);


    // function to call portfolio list
    const loadPortfolioList = async () => {

        try {

            setLoading(true)

            const response = await fetchAllPortfolioList();
            setLoading(false)
            setPortfolioList(response.portfolios);

        }catch(e) {
            setLoading(false)
            console.error(e)
        }
    }

        // fetch data
        useEffect(() => {
            loadPortfolioList()
        }, []);

    return (
        <>
            <ProgressBar loading={loading} />
                <div className="flex min-h-screen">
                 {/* Left Sidebar - 20% */}
                   <DashboardSideBar url='Portfolio' />
                 {/* End of Left Sidebar - 20% */}
                 {/* Main Content - 80% */}
                    <div className="w-4/5 bg-[#eff1ff] p-6">
                                
                    {/* Dashboard Header */}
                    <DashboardHeader type='page' title='Portfolio' />    
                    
                    <br></br>
                    <TableDisplay title='List of Portfolio' icon={<FaBriefcase className='text-[#959595] text-[1.2rem]' />}>
                        <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-[0.8rem] text-left">
                            <th className="px-4">#</th>
                            <th className="px-4 py-3">Porfolio Name</th>
                            <th className="px-4 py-3 text-center">Total Report</th>
                            <th className="px-4 py-3">Date Created</th>
                            <th className="px-4 py-3">Created By</th>
                            <th className="px-4 py-3 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className='text-[0.78rem]'>
                            {portfolioList.length === 0 ? (
                            <tr>
                                <td className="px-4 py-2 text-center" colSpan="8"><div className='bg-[#f8d7da] text-[#721c24] text-[0.8rem] w-[300px] mx-auto p-5 mt-5 rounded-[1.5rem]'>No portfolio list found!</div></td>
                            </tr>
                            ) : (
                              portfolioList.map((report, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3"><a className='text-blue-500 underline' href='#'>{report.portfolioName}</a></td>
                                <td className="px-4 py-3 text-center">{report.totalReports}</td>
                                <td className="px-4 py-3">{new Date(report.dateCreated).toLocaleDateString()}</td>
                                <td className="px-4 py-3">{report.createdBy}</td>
                                <td className='text-center'>
                                    <span className={(report.status == 0) ? `text-green-600` : `text-red-600`}>{(report.status == 0) ? `Active` : `Offline`}</span>
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
    );
}

export default Porfolio;
