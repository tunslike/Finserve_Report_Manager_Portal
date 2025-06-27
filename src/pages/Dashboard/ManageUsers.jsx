import React, {useState, useEffect} from 'react'
import {
        DashboardSideBar, 
        DashboardHeader,  ProgressBar, TableDisplay
    } from '../../components';
    import { FaPlus } from "react-icons/fa";
    import { FaRegEdit } from "react-icons/fa";
    import { FaUserAlt } from "react-icons/fa";
    import { MdCancelPresentation } from "react-icons/md";
    import { FiEdit } from "react-icons/fi";
    import Swal from 'sweetalert2';
    import Modal from 'react-modal';
    import { CgClose } from "react-icons/cg";
    import { ImUsers } from "react-icons/im";
    import { useSelector } from 'react-redux'; 
    import { FaUserPen } from "react-icons/fa6";
    import { IoMdCheckboxOutline } from "react-icons/io";

import { fetchSubscribers, createNewSubscriber, updateSubscriberProfile } from '../../services/SubscriberService';

const ManageUsers = () => {

 

    const subscriberData = useSelector((state) => state.subscriber.subscriberData)
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [resetPassword, setResetPassword] = useState(null);
    const [lockAccount, setLockAccount] = useState(null);
    const [createUser, setCreateUser] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [uname, setUname] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [rolem, setRolem] = useState('');
    const [isLocked, setIsLocked] = useState('');
    const [userId, setUserId] = useState('');
    const [role, setRole] = useState('');

    // Functions to open and close the modal
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [isOpen, setIsOpen] = useState(false);

        // Functions to open and close the modal
     const openModalManage = (uname, fname, lname, role, isLocked, userId) => {

        setFname(fname);
        setLname(lname);
        setRolem(role);
        setUname(uname);
        setLockAccount(isLocked)
        setUserId(userId);
        
        setIsOpenManage(true)
    };
     const closeModalManage = () => setIsOpenManage(false);
     const [isOpenManage, setIsOpenManage] = useState(false);

    // function to load all users
    const loadAllSubscribers = async () => {
        try {
                setLoading(true)
                const response = await fetchSubscribers();

                setLoading(false)

                setUsers(response)

        }catch(e) {
            console.error(e)
        }
    }
    // end of function

    // function to validate update User profile
    const validateUpdateUserProfile = () => {

        //check role
        if(rolem == '') {

            Swal.fire({
                title: "Update User Profile!",
                text: "Role cannot be empty!",
                icon: "error",
                confirmButtonText: "OK",
              });
            return;
        }

        // confirm request
        Swal.fire({
            title: "Notification Setup?",
            text: "Do you want to update user profile?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0ad13f",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Proceed!",
          }).then((result) => {
            if (result.isConfirmed) {
            
                //submit completed task
                updateUserProfile();
                return;
            }
          });



    }

    // end of function

    // function to validate lock user profile
    const processLockUserAccount = () => {

        Swal.fire({
            title: "Disable User Account?",
            text: "Do you want to disable user account? User will not be able to access the platform any longer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0ad13f",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Proceed!",
          }).then((result) => {
            if (result.isConfirmed) {
            
                //submit completed task
                lockUserAccountProfile();
                loadAllSubscribers();
                return;
            }
          });

    }
    // end of function

    // function to validate lock user profile
    const processResetUserAccount = () => {

        Swal.fire({
            title: "Reset User Password?",
            text: "Do you want to reset user password?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0ad13f",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Proceed!",
          }).then((result) => {
            if (result.isConfirmed) {
            
                //submit completed task
                resetUserPasswordAccount();
                loadAllSubscribers();
                return;
            }
          });
    }
    // end of function


    // function to lock user account
    const lockUserAccountProfile = async () => {

        try {

            const data = {
                subscriberId : userId,
                role : rolem,
                resetPassword : 0,
                lockAccount : 1,
                profileUpdate : 0,
                updatedBy : subscriberData.subscriberId
            }

            // set loading
            setLoading(true)

            const response = await updateSubscriberProfile(data);

            setLoading(false)
            closeModal();

            if(response.responseCode == 200) {
                Swal.fire({
                    title: "Disable User Account!",
                    text: "User account has been disabled!",
                    icon: "success",
                    confirmButtonText: "OK",
                  });
            }else {
                Swal.fire({
                    title: "Disable User Account!",
                    text: "Unable to process your request, please retry!",
                    icon: "error",
                    confirmButtonText: "OK",
                  });
            }

            
        }catch(e) {
            setLoading(false)
            console.error(e)
        }
    }
    // end of function

    // function to reset user password
    const resetUserPasswordAccount = async () => {

        try {

            const data = {
                subscriberId : userId,
                role : rolem,
                resetPassword : 1,
                lockAccount : 0,
                profileUpdate : 0,
                updatedBy : subscriberData.subscriberId
            }

            // set loading
            setLoading(true)

            const response = await updateSubscriberProfile(data);

            setLoading(false)
            closeModal();

            if(response.responseCode == 200) {
                Swal.fire({
                    title: "Reset User Password!",
                    text: "User password has been reset successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                  });
            }else {
                Swal.fire({
                    title: "Reset User Password!",
                    text: "Unable to process your request, please retry!",
                    icon: "error",
                    confirmButtonText: "OK",
                  });
            }

            
        }catch(e) {
            setLoading(false)
            console.error(e)
        }
    }
    // end of function

    // function to update and manage user profile
    const updateUserProfile = async () => {

     
        try {

            const data = {
                subscriberId : userId,
                role : rolem,
                resetPassword : 0,
                lockAccount : (lockAccount) ? 1 : 0,
                profileUpdate : (lockAccount) ? 0 : 1,
                updatedBy : subscriberData.subscriberId
            }

            // set loading
            setLoading(true)

            const response = await updateSubscriberProfile(data);

            setLoading(false)
            loadAllSubscribers()

            if(response.responseCode == 200) {
                Swal.fire({
                    title: "Update User Profile!",
                    text: "User profile updated successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                  });
            }else {
                Swal.fire({
                    title: "Update User Profile!",
                    text: "Unable to process your request, please retry!",
                    icon: "error",
                    confirmButtonText: "OK",
                  });
            }

        }catch(e) {
            setLoading(false)
            console.error(e)
        }
    }
    // end of function


    // create new user function ///
    const CreateNewUser = async () => {

        try {

            const data = {
                firstName : firstName,
                lastName : lastName,
                username : username,
                role : role,
                createdBy : subscriberData.subscriberId
            }

            setLoading(true)
            const response = await createNewSubscriber(data);

            setLoading(false)

            if(response.responseCode == 200) {
                Swal.fire({
                    title: "New User Profile!",
                    text: "User created successfully! Check mail for details",
                    icon: "success",
                    confirmButtonText: "OK",
                  });
            }else {
                Swal.fire({
                    title: "New User Profile!",
                    text: "Unable to process your request, please retry!",
                    icon: "error",
                    confirmButtonText: "OK",
                  });
            }

        }catch(e) {
            setLoading(false)
            console.error(e)
        }
    }

    // function to process create new users
    const processCreateNewUser = () => {

        if(firstName == '') {
            Swal.fire({
                title: "New User Profile!",
                text: "Please enter first name!",
                icon: "error",
                confirmButtonText: "OK",
              });
              return;
        }

        if(lastName == '') {
            Swal.fire({
                title: "New User Profile!",
                text: "Please enter last name!",
                icon: "error",
                confirmButtonText: "OK",
              });
              return;
        }

        if(role == '') {
            Swal.fire({
                title: "New User Profile!",
                text: "Please select role!",
                icon: "error",
                confirmButtonText: "OK",
              });
              return;
        }

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
                CreateNewUser();
                return;
            }
          });
    }

    // handle first name change
    const handleFirstnameChange = (e) => {
        const name = e.target.value;
        setFirstName(name);
    
        // Generate username
        const cleaned = name.trim().toLowerCase().replace(/\s+/g, '');
        setUsername(cleaned ? `${cleaned}@finserveinvestment.com` : '');
      };

        // fetch data
        useEffect(() => {
            loadAllSubscribers();
        }, []);    

    return (
        <>
        <ProgressBar loading={loading} />
        <div className="flex min-h-screen">
             {/* Left Sidebar - 20% */}
               <DashboardSideBar url='User Management' />
             {/* End of Left Sidebar - 20% */}
             {/* Main Content - 80% */}
                <div className="w-4/5 bg-[#eff1ff] p-6">
                            
                {/* Dashboard Header */}
                <DashboardHeader type='page' title='Manage Users' />    
                
                <br></br>
                    <TableDisplay title='Available Users' icon={<ImUsers className='text-[#959595] text-[1.2rem]' />}>

                    <div>
                    <button onClick={() => openModal()} className={` ${(!isUpdate) ? `bg-[#435de0]` : `bg-green-600`}  text-[0.85rem] flex items-center gap-x-3 text-white px-[40px] py-3 mb-6 rounded-[1rem]`}>
                        New User
                    <FaUserAlt />
        </button>
                </div>

                        <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-[0.8rem] text-left">
                            <th className="px-4">#</th>
                            <th className="px-4 py-3">Username</th>
                            <th className="px-4 py-3">First Name</th>
                            <th className="px-4 py-3">Last Name</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Date Created</th>
                            <th className="px-4 py-3">Created By</th>
                            <th className="px-4 py-3">Last Login Date</th>
                            <th className="px-4 py-3">Login Status</th>
                            <th className="px-4 py-3 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className='text-[0.78rem]'>
                            {users.length === 0 ? (
                            <tr>
                                <td className="px-4 py-2 text-center" colSpan="8"><div className='bg-[#f8d7da] text-[#721c24] text-[0.8rem] w-[300px] mx-auto p-5 mt-5 rounded-[1.5rem]'>No user list found!</div></td>
                            </tr>
                            ) : (
                                users.map((report, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3"><button onClick={() => openModalManage(report.username, report.firstName, report.lastName, report.role, report.status, report.subscriberId)} title='Update profile' className='text-blue-500 underline' href='#'>{report.username}</button></td>
                                <td className="px-4 py-3">{report.firstName}</td>
                                <td className="px-4 py-3">{report.lastName}</td>
                                <td className="px-4 py-3">{report.role}</td>
                                <td className="px-4 py-3 text-center">{new Date(report.dateCreated).toLocaleDateString()}</td>
                                <td className="px-4 py-3">{report.createdBy}</td>
                                <td className="px-4 py-3 text-center">{new Date(report.dateUpdated).toLocaleDateString()}</td>
                                <td className='text-center'>
                                    <span className={(report.loginStatus == 1) ? `text-green-600` : `text-red-600`}>{(report.loginStatus == 1) ? `Online` : `Offline`}</span>
                                </td>
                                <td className='text-center'>
                                    <span className={(report.status == 0) ? `text-green-600` : `text-red-600`}>{(report.status == 0) ? `Active` : `Disabled`}</span>
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

         {/* Modal */}
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    overlayClassName="fixed z-40 inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    className="bg-white rounded-[1rem] shadow-lg w-[40%]"
>
     <div className='bg-gray-100 p-5 rounded-tl-[1rem] rounded-tr-[1rem] flex justify-between items-center'>
         <h2 className="font-[500] text-[1rem] text-[#575757] flex items-center gap-x-2"><FaUserAlt className='text-primaryRed' /> New User Profile</h2>
         <button onClick={closeModal} className='bg-primaryOrange rounded-full p-1'>
             <CgClose className='text-white text-[1.3rem]' />
         </button>
     </div>

     <div className='py-5 px-5 modal-inner-body overflow-scroll'>

     <div className='flex justify-between items-center gap-x-4 mt-2'>

            <div className='mt-1'>
                <h4 className='form-input-label'>First Name</h4>
                <input 
                    value={firstName}
                    onChange={handleFirstnameChange} 
                    className='row-form-input' placeholder='Enter first name' />
            </div>

            <div className='mt-1'>
                <h4 className='form-input-label'>Last Name</h4>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} className='row-form-input' placeholder='Enter last name' />
            </div>
     </div>



     <div className='flex justify-between items-center gap-x-4 mt-2'>

     <div className='mt-1'>
     <h4 className='form-input-label'>Username</h4>
     <input value={username} className='row-form-input' readOnly placeholder='System generated' />
 </div>


 <div className='mt-3'>
 <h4 className='form-input-label'>Role</h4>
 <select value={role} onChange={(e) => setRole(e.target.value)} className='row-form-input'>
     <option value='' selected="selected">Select here</option>
     <option value='Admin'>Admin</option>
     <option value='Supervisor'>Supervisor</option>
     <option value='Regular'>Regular</option>
 </select>
</div>
     </div>

     </div>

     <div className="flex justify-between items-center gap-2 p-4 border-t border-[#f0f0f0]">
            <button onClick={() => processCreateNewUser()} className={` ${(!isUpdate) ? `bg-[#435de0]` : `bg-green-600`}  text-[0.85rem] flex items-center gap-x-3 text-white px-[40px] py-3 mb-6 rounded-[1rem]`}>
                Create User
                <FaUserAlt />
            </button>
     </div>
</Modal>
{/* Modal */}



         {/* Modal Manage Users*/}
         <Modal
         isOpen={isOpenManage}
         onRequestClose={closeModalManage}
         overlayClassName="fixed z-40 inset-0 bg-black bg-opacity-50 flex items-center justify-center"
         className="bg-white rounded-[1rem] shadow-lg w-[40%]"
     >
          <div className='bg-gray-100 p-5 rounded-tl-[1rem] rounded-tr-[1rem] flex justify-between items-center'>
              <h2 className="font-[500] text-[1rem] text-[#575757] flex items-center gap-x-2"><FaUserPen className='text-primaryRed' /> Manage User Profile</h2>
              <button onClick={closeModal} className='bg-primaryOrange rounded-full p-1'>
                  <CgClose className='text-white text-[1.3rem]' />
              </button>
          </div>
     
          <div className='py-5 px-5 modal-inner-body overflow-scroll'>
     
          <div className='flex justify-between items-center gap-x-4 mt-2'>
     
                 <div className='mt-1'>
                     <h4 className='form-input-label'>First Name</h4>
                     <input 
                        readOnly
                         value={fname}
                         onChange={handleFirstnameChange} 
                         className='row-form-input' placeholder='Enter first name' />
                 </div>
     
                 <div className='mt-1'>
                     <h4 className='form-input-label'>Last Name</h4>
                     <input readOnly value={lname} onChange={(e) => setLname(e.target.value)} className='row-form-input' placeholder='Enter last name' />
                 </div>
          </div>
     
     
     
          <div className='flex justify-between items-center gap-x-4 mt-2'>
     
          <div className='mt-1'>
          <h4 className='form-input-label'>Username</h4>
          <input value={uname} className='row-form-input' readOnly placeholder='System generated' />
      </div>
     
     
      <div className='mt-3'>
      <h4 className='form-input-label'>Role</h4>
      <select value={rolem} onChange={(e) => setRolem(e.target.value)} className='row-form-input'>
          <option value='' selected="selected">Select here</option>
          <option value='Admin'>Admin</option>
          <option value='Supervisor'>Supervisor</option>
          <option value='Regular'>Regular</option>
      </select>
     </div>
          </div>

          <div className='flex items-center mt-3 gap-x-2'>
                <label className='text-[0.8rem] text-[#525252] ml-2'>Reset Password</label>
                <input type='checkbox' checked={resetPassword} name='resetPwd' onChange={(e) => setResetPassword(e.target.checked)} />
          </div>

          <div className='flex items-center justify-start gap-x-4 mt-2'>

          <div className='flex items-center mt-3 gap-x-2'>
          <label className='text-[0.8rem] text-red-600 ml-2'>Disable User</label>
          <input type='checkbox' name='lockAcct' checked={lockAccount} onChange={(e) => setLockAccount(e.target.checked)} />
    </div>

          </div>
     
     
          </div>
     
          <div className="p-4 border-t border-[#f0f0f0]">

                            {(!lockAccount && resetPassword) && 
                                <button onClick={() => processResetUserAccount()} className='bg-green-700 text-[0.85rem] flex items-center gap-x-2 text-white px-[40px] py-3 rounded-[1rem]'>
                                    Reset Password
                                    <IoMdCheckboxOutline className='text-[1rem]' />
                                </button>
                            }

                            {
                                (!resetPassword) &&
                                <button onClick={() => validateUpdateUserProfile()} className='bg-green-700 text-[0.85rem] flex items-center gap-x-2 text-white px-[40px] py-3 rounded-[1rem]'>
                                    Update Profile
                                    <IoMdCheckboxOutline className='text-[1rem]' />
                                </button>

                            }
                            
          </div>
     </Modal>
     {/* Modal */}
    </>
    );
}

export default ManageUsers;
