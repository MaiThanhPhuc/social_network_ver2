import React, { useState, useRef } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import userService from '../../Services/user.service';
const API_URL = process.env.REACT_APP_BASE_URL;
const Recovery = () => {
   const [showInputToken, setShowInputToken] = useState(false);
   const [emailResend, setEmailResend] = useState();
   const toastId = useRef(null);

   const notify = () =>
      (toastId.current = toast.loading('Verify email address in progress, please wait...', {
         autoClose: false,
         theme: 'dark',
      }));
   const updateSuccessNoti = () =>
      toast.update(toastId.current, {
         render: 'Please check email to reset email!',
         autoClose: 2000,
         type: 'success',
         isLoading: false,
         theme: 'dark',
      });
   const updateFailedNoti = () =>
      toast.update(toastId.current, {
         render: 'Your email address is not found!',
         type: 'error',
         autoClose: 2000,
         isLoading: false,
         theme: 'dark',
      });
   const handleSendCode = () => {
      notify();
      userService
         .sendCodeReset(emailResend)
         .then((res) => {
            if (res.status === 200) {
               updateSuccessNoti();
               setShowInputToken(true);
            }
         })
         .catch((err) => {
            console.log(err);
            updateFailedNoti();
         });
   };

   const formik = useFormik({
      initialValues: {
         token: '',
         newPassword: '',
         confirmNewPassword: '',
      },
      validationSchema: Yup.object({
         token: Yup.string().required('Required'),
         newPassword: Yup.string()
            .required('Required')
            .matches(
               /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
               'Password must be minimum 8 character and  contain at least one letter, one number and not include special character and not include special character',
            ),
         confirmNewPassword: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('newPassword'), null], 'Password must match'),
      }),
      onSubmit: (values) => {
         var myHeaders = new Headers();
         myHeaders.append('Content-Type', 'application/json');

         var raw = JSON.stringify({
            token: values.token,
            newPassword: values.newPassword,
         });

         var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
         };

         fetch(`${API_URL}savePassword`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
               console.log(res);
               if (res.status) {
                  toast('Reset password success', {
                     position: 'bottom-center',
                     type: 'success',
                     autoClose: 2000,
                     theme: 'dark',
                  });
               } else {
                  toast('Reset password failed. Please try again', {
                     position: 'bottom-center',
                     type: 'error',
                     autoClose: 2000,
                     theme: 'dark',
                  });
               }
            })
            .catch((err) => {
               console.log(err);
               toast('Erorr!', {
                  position: 'bottom-center',
                  type: 'error',
                  autoClose: 2000,
                  theme: 'dark',
               });
            });
      },
   });

   return (
      <>
         {showInputToken ? (
            <button
               onClick={() => {
                  setShowInputToken(false);
               }}
               className="hover:bg-black/20 p-2 rounded text-black"
            >
               <AiOutlineArrowLeft />{' '}
            </button>
         ) : null}

         <div className=" max-h-heightRecoveryPass bg-[#fafafb] rounded-xl flex flex-col justify-around items-center">
            <h1 className="text-black font-roboto font-semibold text-2xl mt-6 w-inputRecoveryPassWidth">
               Password Recovery
            </h1>
            <div className="w-inputRecoveryPassWidth sub-heading text-xs pb-4 text-grayText">
               <span>Enter your email to recover your password</span>
            </div>

            {!showInputToken ? (
               <div className="w-inputRecoveryPassWidth email-box flex flex-col">
                  <label className="text-xs font-medium mb-2" htmlFor="email">
                     Email
                  </label>
                  <input
                     onChange={(e) => setEmailResend(e.target.value)}
                     type="email"
                     id="emailrecovery"
                     placeholder="Enter Your Email"
                     className="text-sm w-inputRecoveryPassWidth px-3 py-10 rounded bg-inputColor outline-none font-roboto"
                  />
               </div>
            ) : null}

            {showInputToken ? (
               <div className="w-inputRecoveryPassWidth email-box flex flex-col">
                  <label className="text-xs font-medium mb-2" htmlFor="email">
                     Code
                  </label>
                  <input
                     maxLength={6}
                     name="token"
                     id="token"
                     placeholder="CFD123"
                     onChange={formik.handleChange}
                     value={formik.values.token}
                     className="text-sm w-inputRecoveryPassWidth px-3 py-10 uppercase rounded bg-inputColor outline-none font-roboto"
                  />
               </div>
            ) : null}

            {showInputToken ? (
               <div className="w-inputRecoveryPassWidth email-box flex flex-col">
                  <label className="text-xs font-medium mb-2" htmlFor="email">
                     New Password
                  </label>
                  <input
                     name="newPassword"
                     id="newPassword"
                     type="password"
                     onChange={formik.handleChange}
                     value={formik.values.newPassword}
                     placeholder="Password"
                     className="text-sm w-inputRecoveryPassWidth px-3 py-10 rounded bg-inputColor outline-none font-roboto"
                  />
                  {formik.errors.newPassword && (
                     <span className="errorMsg text-[10px] text-red w-inputRecoveryPassWidth">
                        {formik.errors.newPassword}
                     </span>
                  )}
               </div>
            ) : null}

            {showInputToken ? (
               <div className="w-inputRecoveryPassWidth email-box flex flex-col">
                  <label className="text-xs font-medium mb-2" htmlFor="email">
                     Confirm Password
                  </label>
                  <input
                     type="password"
                     name="confirmNewPassword"
                     id="confirmNewPassword"
                     onChange={formik.handleChange}
                     value={formik.values.confirmNewPassword}
                     placeholder="Retype - Password"
                     className="text-sm w-inputRecoveryPassWidth px-3 py-10 rounded bg-inputColor outline-none font-roboto"
                  />
                  {formik.errors.confirmNewPassword && (
                     <span className="errorMsg text-[10px] text-red w-inputRecoveryPassWidth">
                        {formik.errors.confirmNewPassword}
                     </span>
                  )}
               </div>
            ) : null}

            {showInputToken ? (
               <div className="w-inputRecoveryPassWidth flex justify-center items-center mt-5">
                  <button
                     type="submit"
                     onClick={formik.handleSubmit}
                     className="text-white btn btn-primary btn-block btn-sm h-9 text-sm normal-case mb-4"
                  >
                     Reset Password
                  </button>
               </div>
            ) : (
               <div className="w-inputRecoveryPassWidth flex justify-center items-center mt-8">
                  <button
                     onClick={handleSendCode}
                     className="text-white btn btn-primary btn-block btn-sm h-9 text-sm normal-case mb-4"
                  >
                     Send Code
                  </button>
               </div>
            )}
         </div>
      </>
   );
};

export default Recovery;
