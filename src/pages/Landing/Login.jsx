import React, {useState, useEffect} from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { Preloader } from '../../components';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RiInformation2Line } from "react-icons/ri";
import { useSearchParams } from 'react-router-dom';

const Login = () => {

  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();
  const changeStatus = searchParams.get('chpwd_status');

  const validationSchema = Yup.object({
      subscriberId: Yup.string().email("Invalid email").required("Email is required"),
      accessCode: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

  const handleSubmit = async (values, { setSubmitting }) => {

      setIsError(false);

      const success = await login(values);

      if (success == 1) navigate("/dashboard");

      if(success == 2) navigate("/changePassword")

      setSubmitting(false);
      setIsError(true);
    };
  


    return (
        <div
          className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('./images/bg.jpg')" }}
        >
              <div className='bg-white min-h-[150px] flex flex-col md:flex-row gap-4 rounded-[1rem] p-3 w-[50%]'>
                  <div className='bg-[#f4f5fe] rounded-[1rem] p-7 flex-1'>
                      <img className='w-[55px]' src='./images/icon.png' />
                      <h1 className='mt-8 font-[600] text-primaryBlue text-[1.3rem]'>Report Management <span className='text-primaryRed'>Portal</span></h1>
                      <h5 className='text-[#a1acdc] text-[0.85rem] mt-1'>An Enterprise Porfolio Report Management System</h5>
                      <ul className='text-[0.85rem] mt-6 ml-2 feat-list'>
                          <li><FaLongArrowAltRight className='feat-list-icon' /> Portfolio Reports</li>
                          <li><FaLongArrowAltRight className='feat-list-icon' /> Report Merging and Grouping</li>
                          <li><FaLongArrowAltRight className='feat-list-icon' /> Historical Report Tracking</li>
                          <li><FaLongArrowAltRight className='feat-list-icon' /> Authorized Accessibility</li>
                          <li><FaLongArrowAltRight className='feat-list-icon' /> Report Workflow and Automation</li>
                          <li><FaLongArrowAltRight className='feat-list-icon' /> Real-time Notification</li>
                      </ul>

                      <h5 className='mt-10 text-[0.8rem] text-primaryBlue'>By Finserve Investment Limited</h5>
                  </div>
                  <div className='flex-1 p-7'>
                      <h1 className='font-[600] text-[#1d2328] text-[1.1rem] mt-[4rem]'>Login to Account</h1>
                      <h5 className='text-[#5c6794] text-[0.85rem] mt-1'>Provide your account details to login</h5>

                      {(isError) &&
                        <div className='flex items-center text-[0.75rem] rounded-lg font-[400] p-2 mt-5 justify-start gap-x-3 bg-[#f8d7db] border-[#f5c6cc] border text-[#721c25]'>
                            <RiInformation2Line className='text-[2rem]' />
                            Incorrect Username or Password!
                        </div>
                      }


                      {(changeStatus) &&
                        <div className='flex items-center text-[0.75rem] rounded-lg font-[400] p-2 mt-5 justify-start gap-x-3 bg-[#d4eddb] border-[#c3e7cb] border text-[#155724]'>
                            <RiInformation2Line className='text-[2rem]' />
                            Change password was successful! Please login
                        </div>
                      }

                      <Formik
                          initialValues={{ subscriberId: "", accessCode: "" }}
                          validationSchema={validationSchema}
                          onSubmit={handleSubmit}
                      >
                        {({ isSubmitting }) => (

                        <Form className='mt-10'>
                                <div className='flex items-center gap-x-3 border border-[#e4e4e4] rounded-[0.6rem] px-4 py-2 w-full'>
                                <FaUserAlt className='text-primaryBlue' />
                                <Field type='email' name='subscriberId' className='text-primaryBlue font-[400] h-[35px] !outline-none placeholder-[#777777] w-full text-[0.85rem]' placeholder='Username' />
                            </div>
                            <p className='flex items-center gap-x-2 text-[0.75rem] ml-10 mt-2'>
                                <ErrorMessage name="subscriberId" component="div" className="text-red-500" />
                            </p>
                          
            
                            <div className='mt-[3px] flex items-center gap-x-3 border border-[#e4e4e4] rounded-[0.6rem] px-4 py-2 w-full'>
                                <IoMdLock className='text-primaryBlue text-[1.27rem]' />
                                <Field type={showPassword ? "text" : "password"} name='accessCode' className='text-primaryBlue flex-1 font-[400] h-[35px] !outline-none placeholder-[#777777] w-full text-[0.85rem]' placeholder='Password' />
            
                                <button type='button' onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ?
                                        <FiEye title='Hide Password' className='text-primaryRed cursor-pointer text-[1.2rem]' /> :
            
                                        <FiEyeOff  title='Show Password' className='text-primaryRed cursor-pointer text-[1.2rem]' /> 
                                    }
                                </button>
                            </div>
                            <p className='flex items-center gap-x-2 text-[0.75rem] ml-10 mt-2'> 
                                <ErrorMessage name="accessCode" component="div" className="text-red-500" />
                            </p>
            
            
                        <div className='text-right'>
                        <Link to="/resetPassword" className='text-[0.8rem] text-primaryBlue font-[400] hover:underline'>Forgot Password?</Link>
                        </div>
            
                        <div className='mt-10'>
                                <button type='submit' disabled={isSubmitting} className='bg-primaryRed py-[13px] px-[5rem] hover:bg-[#a52c32] text-[0.85rem] font-[500] justify-center mx-auto flex items-center gap-x-2 rounded-[0.7rem] text-white'>
            
                                    {!isSubmitting ? 'Log In' : 'Please wait...'}
                                    {!isSubmitting ? <FaArrowRightLong className='text-[1.1rem]' /> : <Preloader />}
                                
                                </button>
                        </div>

                        </Form>
                        )}
                      </Formik>
                  </div>
              </div>
        </div>
      );
};

export default Login;