import React, {useState, useEffect} from 'react'
import { GrDocumentText } from "react-icons/gr";
import { IoDocuments } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { FaRegCircleCheck } from "react-icons/fa6";
import { CgCloseR } from "react-icons/cg";
import { BsFiletypePdf } from "react-icons/bs";
import { APIBaseUrl } from '../../constants';
import Swal from 'sweetalert2';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
        DashboardSideBar, 
        DashboardHeader, 
        DashboardSummaryBox,
        TableDisplay, ProgressBar
    } from '../../components';
import { loadDashboardSummary, downloadPortfolioReport } from '../../services/ReportManagerService';
import { useSelector } from 'react-redux';


const Dashboard = () => {

    const navigate = useNavigate();
    const subscriberData = useSelector((state) => state.subscriber.subscriberData)
    const [dashData, setDashData] = useState([]);
    const [reportGroups, setReportGroups] = useState([]);
    const [reportHistory, setReportHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reportName, setReportName] = useState('');
    const [portfolioName, setPortfolioName] = useState('');


    // upload files settings
    const [uploadFiles, setUploadFiles] = useState([]);

    const totalSize = uploadFiles.reduce((sum, file) => sum + file.size, 0);

    const removeUploadFile = (fileToRemove) => {
        setUploadFiles((prev) => prev.filter((f) => f !== fileToRemove));
      };

      const truncateFilename = (name, maxLength = 55) => {
        return name.length > maxLength ? name.slice(0, maxLength - 3) + '...' : name;
      };


      // handle upload and merge
      const handleUploadMerge = async () => {
        
        const formData = new FormData();

        for (let file of uploadFiles) {
          formData.append('files', file);
        }

        formData.append('reportName', reportName);
        formData.append('portfolioId', portfolioName);
        formData.append('createdBy', subscriberData.subscriberId);

        try {

          console.log(formData);

          setLoading(true)

          const token = localStorage.getItem('token');

          if(token) {

            const res = await axios.post(`${APIBaseUrl.baseUrl}report-manager/upload`, formData, {
              headers: { 'Content-Type': 'multipart/form-data',
                'Authorization' : `Bearer ${token}`
               },
            });

            console.log(res)
  
            setLoading(false)
            // close modal
            closeModal()

            if(res.status == 200 && res.data.responseCode == 200) {

              Swal.fire({
                title: "Portfolio Report!",
                text: res.data.message,
                icon: "success",
                confirmButtonText: "OK",
              });

              return;
            }

          }else {
            // login again
            navigate('/login')
          }
        
        } catch (err) {
          setLoading(false)
          console.error('Upload and merge failed', err);
        }
      };

      // process create portfolio report
      const processCreatePortfolioReport = () => {

        // validate fields
        if(reportName == '') {
          Swal.fire({
            title: "Portfolio Report!",
            text: "Please provide report name!",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }

        if(portfolioName == '') {
          Swal.fire({
            title: "Portfolio Report!",
            text: "Please select portfolio!",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }

          Swal.fire({
            title: "Portfolio Report?",
            text: "Do you want to create new portfolio report?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0ad13f",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Proceed!",
          }).then((result) => {
            if (result.isConfirmed) {
            
                //submit completed task
                handleUploadMerge();
                return;
              
            }
          });

      }
      // end of create portfolion report


      // handle download
      const handleDownload = async (reportGroupId) => {
        try {
          const token = localStorage.getItem('token'); // or use context/auth store

          if(!token) {
            navigate("/login")
          }
      
          const response = await axios.get(
            `http://localhost:9193/api/v1/report-manager/download-portfolioReport?reportGroupId=${reportGroupId}`,
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



    // handle upload file change
    const handleFileChange = (e) => {
        setUploadFiles(Array.from(e.target.files));
      };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const reordered = Array.from(uploadFiles);
        const [moved] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, moved);
        setUploadFiles(reordered);
      };
    // end of upload file settings

    // modal
    const [isOpen, setIsOpen] = useState(false);


  // Functions to open and close the modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

      
    // load dashboard data
    const loadDashboardSummaryData = async () => {
        try {

            setLoading(true);

            const response = await loadDashboardSummary();

            setLoading(false);

            setDashData(response.dashboardSummary)
            setReportGroups(response.reportGroupList)
            setReportHistory(response.reportHistory)

        }catch(e) {
            console.log(e.error);
        }
    }
    // end of function

    // fetch data
    useEffect(() => {
        loadDashboardSummaryData()
    }, []);

    return (
        <>
        <ProgressBar loading={loading} />
        <div className="flex min-h-screen">

        {/* Left Sidebar - 20% */}
            <DashboardSideBar url='Dashboard' />
         {/* End of Left Sidebar - 20% */}
  
        {/* Main Content - 80% */}
        <div className="w-4/5 bg-[#eff1ff] p-6">
                    
            {/* Dashboard Header */}
             <DashboardHeader type="dash" />    
             
             {/* Dashboard Summary Box */}
             <DashboardSummaryBox data={dashData} modal={openModal} />

             {/* Table window */}
             <div className='flex justify-start items-start mt-8 gap-5'>
                <TableDisplay h_style="h-[400px]" icon={<IoDocuments className='text-[#959595] text-[1.2rem]' />} title="Recent Portfolio Report">
                <div className="overflow-x-auto">
                <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 text-[0.8rem] text-left">
                      <th className="px-4">#</th>
                      <th className="px-4 py-2">Report Name</th>
                      <th className="px-4 py-2">Total Reports</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className='text-[0.78rem]'>
                    {reportGroups.length === 0 ? (
                      <tr>
                        <td className="px-4 py-2 text-center" colSpan="8">No reports found.</td>
                      </tr>
                    ) : (
                      reportGroups.map((report, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2"><a className='text-blue-500 underline' href='#'>{report.reportGroupName}</a></td>
                          <td className="px-4 py-2 text-center">{report.totalReports}</td>
                          <td className="px-4 py-2">{new Date(report.dateCreated).toLocaleDateString()}</td>
                          <td>
                              <button className='' title='Download Report' onClick={() => handleDownload(report.reportGroupId)}>
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

                <TableDisplay h_style="h-[400px]" icon={<GrDocumentText className='text-[#959595] text-[1.2rem]' />} title="Uploaded Report History">
                <div className="overflow-x-auto">
                <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 text-[0.8rem] text-left">
                      <th className="px-4">#</th>
                      <th className="px-4 py-2">Report Name</th>
                      <th className="px-4 py-2">Views</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className='text-[0.78rem]'>
                    {reportHistory.length === 0 ? (
                      <tr>
                        <td className="px-4 py-2 text-center" colSpan="8">No reports found.</td>
                      </tr>
                    ) : (
                      reportHistory.map((report, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">{report.reportName}</td>
                          <td className="px-4 py-2 text-center">{report.views}</td>
                          <td className="px-4 py-2">{new Date(report.date_created).toLocaleDateString()}</td>
                          <td><a title='Download Report'><LuDownload className='text-primaryRed text-[1rem] mx-auto' /></a></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </TableDisplay>
             </div>
        </div>
        {/* End of Main Content - 80% */}
      </div>


       {/* Modal */}
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    overlayClassName="fixed z-40 inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    className="bg-white rounded-[1rem] shadow-lg w-[40%]"
>
     <div className='bg-gray-100 p-5 rounded-tl-[1rem] rounded-tr-[1rem] flex justify-between items-center'>
         <h2 className="font-[500] text-[1rem] text-[#575757] flex items-center gap-x-2"><IoDocuments className='text-primaryRed' /> New Portfolio Report</h2>
         <button onClick={closeModal} className='bg-primaryOrange rounded-full p-1'>
             <CgClose className='text-white text-[1.3rem]' />
         </button>
     </div>

     <div className='py-5 px-5 modal-inner-body overflow-scroll'>

     <div className='mt-1'>
     <h4 className='form-input-label'>Report Name</h4>
     <input className='form-input' value={reportName} onChange={(e) => setReportName(e.target.value)} placeholder='Enter portfolio report name' />
</div>

           <div className='mt-3'>
                    <h4 className='form-input-label'>Portfolio Name</h4>
                    <select onChange={(e) => setPortfolioName(e.target.value)} className='form-input'>
                        <option value='' selected="selected">Select here</option>
                        <option value='08f66268-fef7-42d5-9d49-4b1484624441'>Portfolio One</option>
                    </select>
           </div>

       
           <div className='mt-3'>
                <h4 className='form-input-label'>Upload PDF Report</h4>
                <input
                        type="file"
                        multiple
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="form-input"
                />
           </div>
           
                {uploadFiles.length > 0 && (
                    <>
                <div className='mt-5'>
                <div className='flex items-center justify-between'>
                    <h4 className='form-input-label'>Re-arrange Report Order</h4>
                    <h6 className='text-[0.75rem] mr-3 text-primaryRed'><span className='font-[600]'>{uploadFiles.length}</span> Reports Uploaded</h6>
                </div>
                
                <div className='mt-2 border-[#e4e4e4] overflow-scroll h-[180px] border rounded-[0.7rem] p-3'>
                    <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="pdfList">
                        {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 mb-3">
                            {uploadFiles.map((file, index) => (
                            <Draggable key={file.name} draggableId={file.name} index={index}>
                                {(provided) => (
                                <li
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    className="p-3 bg-[#f1f4fa] rounded-lg text-[0.8rem] text-primaryBlue flex justify-start items-center gap-x-4"
                                >   <BsFiletypePdf className='text-[#2488eb] text-[1.3rem]' />
                                    <span className='flex-1'>{truncateFilename(file.name)}</span>
                                    <span className="text-xs text-gray-400 ml-2">{(file.size / 1024).toFixed(2)} KB</span>
                                    <button
                                    onClick={() => removeUploadFile(file)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Remove"
                                  >
                                    <CgCloseR className='text-primaryRed' size={16} />
                                  </button>
                                </li>
                                )}
                            </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                        )}
                    </Droppable>
                    </DragDropContext>
                </div>
                <p className="text-[0.75rem] mr-3 mt-2 gap-x-2 justify-end text-green-600 flex items-center mb-2"><FaRegCircleCheck className='text-[0.9rem]' /> Total Size: {(totalSize / (1024 * 1024)).toFixed(2)} MB</p>
                </div>

                <div className='mt-2'>
                <h4 className='form-input-label'>Notification Group</h4>
                <select className='form-input'>
                    <option>No Notification</option>
                    <option>SEC Notification Group</option>
                </select>
           </div>
           </>
                )}
     </div>

     <div className="flex justify-between items-center gap-2 p-4 border-t border-[#f0f0f0]">
        
            <button onClick={processCreatePortfolioReport} disabled={(uploadFiles.length > 0 || reportName == '' || portfolioName == '') ? false : true} className={`${(uploadFiles.length > 0) ? `bg-[#435de0]` : `bg-[#bbc4f0]`} px-[30px] py-[10px] text-[0.8rem] flex items-center gap-x-2 rounded-[0.5rem] text-white`}>Create Report <HiDocumentDuplicate className='text-[1.1rem]' /></button>
     </div>
</Modal>
{/* Modal */}
      </>
    );
};

export default Dashboard;