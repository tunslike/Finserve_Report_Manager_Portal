import React, {useState, useEffect} from 'react'
import {
        DashboardSideBar, 
        DashboardHeader,  ProgressBar, Tabs
    } from '../../components';
import { FaPlus } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Swal from 'sweetalert2';
import { IoMdCheckboxOutline } from "react-icons/io";
import { fetchAllPortfolioList, 
         createNewNotificationSetup, loadNotificationSetups,
        updateNotificationSetup, updateNotificationSetupStatus } from '../../services/ReportManagerService'; 
import { useSelector } from 'react-redux'; 


const System = () => {


    // notification tab
    const NotificationTab = () => {

        const subscriberData = useSelector((state) => state.subscriber.subscriberData)
        const [loading, setLoading] = useState(false);
        const [emails, setEmails] = useState('');
        const [notificationId, setNotificationId] = useState('');
        const [notification, setNotification] = useState([]);
        const [isEditMode, setIsEditMode] = useState(false);

        const [portfolioList, setPortfolioList] = useState([]);
        const [selectedId, setSelectedId] = useState('');

        // create new notification
        const createNotificationSetup = async () => {

            try {

                setLoading(true)

                const data = {
                    portfolioId : selectedId,
                    emailAddresses : emails,
                    createdBy : subscriberData.subscriberId
                }

                const response = await createNewNotificationSetup(data);

                setLoading(false)

                if(response.responseCode == 200) {

                    // load new notification
                    loadNotificationSetupsList();

                    // show alert
                    Swal.fire({
                        title: "Notification Setup!",
                        text: "Notification setup created successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                      });
                      return;
                }else {

                    Swal.fire({
                        title: "Notification Setup!",
                        text: "Unable to process your request, please retry!",
                        icon: "error",
                        confirmButtonText: "OK",
                      });
                      return;
                }

               

            }catch(e) {
                setLoading(false)
                console.error(e);
            }
        }
        // end of function

        // create new notification
         const updateNewNotificationSetup = async () => {

            try {

                setLoading(true)

                const data = {
                    notificationId : notificationId,
                    portfolioId : selectedId,
                    emailAddresses : emails,
                    updatedBy : subscriberData.subscriberId
                }

                const response = await updateNotificationSetup(data);

                setLoading(false)

                if(response.responseCode == 200) {

                    // disable Edit
                    setIsEditMode(false);
                    setSelectedId('');
                    setEmails('');

                    // load new notification
                    loadNotificationSetupsList();

                    // show alert
                    Swal.fire({
                        title: "Notification Setup!",
                        text: "Notification setup updated successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                      });
                      return;
                }else {

                    Swal.fire({
                        title: "Notification Setup!",
                        text: "Unable to process your request, please retry!",
                        icon: "error",
                        confirmButtonText: "OK",
                      });
                      return;
                }
            }catch(e) {
                setLoading(false)
                console.error(e);
            }
        }
        // end of function

        const processDisableNotificationSetup = async (notificationId, status) => {
            try {

                const data = {
                    notificationId : notificationId,
                    updatedBy : subscriberData.subscriberId,
                    status : status
                }
            
                //submit completed task
                const response = await updateNotificationSetupStatus(data);

                loadNotificationSetupsList();

                if(response.responseCode == 200) {

                    if(status == 1) {

                         // show alert
                         Swal.fire({
                            title: "Notification Setup!",
                            text: "Notification setup disabled successfully!",
                            icon: "success",
                            confirmButtonText: "OK",
                        });

                    }else if(status == 0) {

                         // show alert
                         Swal.fire({
                            title: "Notification Setup!",
                            text: "Notification setup enabled successfully!",
                            icon: "success",
                            confirmButtonText: "OK",
                        });

                    }
                    
                }else {
                    
                      // show alert
                      Swal.fire({
                        title: "Notification Setup!",
                        text: "Notification setup disabled successfully!",
                        icon: "error",
                        confirmButtonText: "OK", })
                }

            }catch(e) {
                console.error(e)
            }
        }

        // disable function 
        const disableNotificationSetup = async (notificationId, status) => {

            try {

                if(status === 0) {

                    Swal.fire({
                        title: "Notification Setup?",
                        text: "Do you want to disable notification setup?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#0ad13f",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, Proceed!",
                      }).then((result) => {
                        if (result.isConfirmed) {

                          
                            processDisableNotificationSetup(notificationId, 1);
                            return;
                          
                        }
                      });

                }else if(status === 1) {

                    Swal.fire({
                        title: "Notification Setup?",
                        text: "Do you want to enable notification setup?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#0ad13f",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, Proceed!",
                      }).then((result) => {
                        if (result.isConfirmed) {

                            processDisableNotificationSetup(notificationId, 0);
                            return;

                        }
                      });

                }

            }catch(e){
                console.error(e)
            }
        }
        // end of function

        // function to initiate new notification
        const handleNewNotificationSetup = async () => {

            if(selectedId == '') {
                Swal.fire({
                    title: "Notification Setup!",
                    text: "Please select portfolio name to proceed!",
                    icon: "error",
                    confirmButtonText: "OK",
                  });
                  return;
            }

            if(emails == '') {
                Swal.fire({
                    title: "Notification Setup!",
                    text: "Please enter at least one email to proceed!",
                    icon: "error",
                    confirmButtonText: "OK",
                  });
                  return;
            }

            if(!isEditMode) {


            Swal.fire({
                title: "Notification Setup?",
                text: "Do you want to create new notification setup?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0ad13f",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Proceed!",
              }).then((result) => {
                if (result.isConfirmed) {
                
                    //submit completed task
                    createNotificationSetup();
                    return;
                  
                }
              });

            }else if(isEditMode) {

            Swal.fire({
                title: "Notification Setup?",
                text: "Do you want to update notification setup?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0ad13f",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Proceed!",
              }).then((result) => {
                if (result.isConfirmed) {
                
                    //submit completed task
                    updateNewNotificationSetup();
                    return;
                  
                }
              });
            }


        }
        // end of function 


        // load notification setup
        const loadNotificationSetupsList = async () => {
            try {
                    setLoading(true)

                    const response = await loadNotificationSetups();
                    setNotification(response.notificationSetupList)

                    setLoading(false)

            }catch(e) {
                setLoading(false)
                console.error(e)
            }
        }
        // end of function

    
        // function to call portfolio list
        const loadPortfolioList = async () => {
    
            try {
    
                setLoading(true)
    
                const response = await fetchAllPortfolioList();
                console.log(response.portfolios)
                setLoading(false)
                setPortfolioList(response.portfolios);
    
            }catch(e) {
                setLoading(false)
                console.error(e)
            }
        }

        // edit setup
        const processEditSetup = (notificationId, id, emailList) => {

            try {
                    setNotificationId(notificationId);
                    setEmails(emailList);
                    setSelectedId(id);
                    setIsEditMode(true);
            }catch(e) {
                console.error(e)
            }
        }
    
            // fetch data
            useEffect(() => {
                loadPortfolioList()
                loadNotificationSetupsList();
            }, []);

        return (
            <>
            <ProgressBar loading={loading} />
            <div className='pl-5'>
                <div className='mt-1'>
                            <h4 className='form-input-label'>Portfolio Name</h4>
                            <select
                            id="portfolio"
                            className='form-input'
                            value={selectedId}
                            onChange={(e) => setSelectedId(e.target.value)}
                          >
                            <option value="">-- Choose a portfolio --</option>
                            {portfolioList.map((item) => (
                              <option key={item.portfolioId} value={item.portfolioId}>
                                {item.portfolioName}
                              </option>
                            ))}
                          </select>
                </div>

                <div className='mt-5'>
                <h4 className='form-input-label'>Email Addresses <span className='text-red-600 text-[0.75rem] ml-3'>[Seperate with semi colons ; for multiple emails]</span></h4>
                <input className='form-input' value={emails} onChange={(e) => setEmails(e.target.value)} placeholder='Enter email adddress, seperate with commas' />
            </div>


                <button onClick={handleNewNotificationSetup} className={` ${(!isEditMode) ? `bg-[#435de0]` : `bg-green-600`}  text-[0.85rem] text-white px-[40px] py-3 mt-8 rounded-[1rem]`}>
                
                            {(!isEditMode) && 
                               <div className='flex items-center '>
                                    Create Setup
                                    <FaPlus className='ml-2' />
                               </div>
                               
                            }
                            
                            {
                                (isEditMode) &&
                                <div className='flex items-center'>
                                    Edit Setup
                                    <FiEdit className='ml-2' />
                                </div>
                            }
                </button>


                <div className="overflow-x-auto mt-10 h-[340px] overflow-scroll">

                <h5 className='mb-3 font-[500] text-[#494949]'>Available Setups</h5>
                <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 text-[0.8rem] text-left">
                      <th className="px-4">#</th>
                      <th className="px-4 py-2 w-[100px]">Portfolio Name</th>
                      <th className="px-4 py-2">Email Addresses</th>
                      <th className="px-4 py-2">Date Created</th>
                      <th className="px-4 py-2">Created By</th>
                      <th className="px-4 py-2">Date Updated</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className='text-[0.78rem]'>
                    {notification.length === 0 ? (
                      <tr>
                        <td className="px-4 py-2 text-center" colSpan="8">No reports found.</td>
                      </tr>
                    ) : (
                        notification.map((report, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2 w-[100px]" colSpan="1">{report.portfolioName}</td>
                          <td className="px-4 py-2text-wrap">{report.emailAddresses}</td>
                          <td className="px-4 py-2">{new Date(report.dateCreated).toLocaleDateString()}</td>
                          <td className="px-4 py-2">{report.createdBy}</td>
                          <td className="px-4 py-2">{new Date(report.dateUpdated).toLocaleDateString()}</td>
                          <td className={`px-4 py-2 ${(report.status === 0) ? `text-green-600` : `text-red-600`}`}>{(report.status === 0) ? 'Active' : 'Disabled'}</td>
                          <td className='text-center flex items-center gap-x-5 p-5'>
                              <button onClick={() => processEditSetup(report.notificationId, report.portfolioId, report.emailAddresses)} className='text-blue-500 text-[1.2rem]' title='Edit Setup'>
                                    <FaRegEdit />
                              </button>
                              <button onClick={() => disableNotificationSetup(report.notificationId, report.status)} >

                                    {(report.status === 0) && 
                                        <MdCancelPresentation className='text-primaryRed text-[1.2rem]' title='Disable Setup' />
                                    }

                                    {(report.status === 1) && 
                                        <IoMdCheckboxOutline className='text-green-500 text-[1.2rem]' title='Enable Setup' />
                                    }
                                    
                              </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div></>
        )
    }

    const tabItems = [
        {
            label: 'Notification',
            content: <NotificationTab />,
          },
        {
          label: 'Settings',
          content: <p>This is the overview section.</p>,
        },
     
      ];

    return (
        <>
        <div className="flex min-h-screen">
             {/* Left Sidebar - 20% */}
               <DashboardSideBar url='System' />
             {/* End of Left Sidebar - 20% */}
             {/* Main Content - 80% */}
                <div className="w-4/5 bg-[#eff1ff] p-6">
                            
                {/* Dashboard Header */}
                <DashboardHeader type='page' title='System Setup' />    

                <Tabs tabs={tabItems} />


            
            </div>
            {/* End of Main Content - 80% */}
        </div>
    </>
    )
}

export default System;
