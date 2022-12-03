import { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authService from '../../Services/auth.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
   const toastId = useRef(null);
   const notify = () => {
      toastId.current = toast.loading('Register in progress, please wait...', {
         autoClose: false,
         theme: 'dark',
      });
   };

   const updateNoti = () =>
      toast.update(toastId.current, {
         render: 'Register success please check Email to verify',
         autoClose: 2000,
         isLoading: false,
         theme: 'dark',
      });

   const updateFailedNoti = (mess) =>
      toast.update(toastId.current, {
         render: mess,
         autoClose: 2000,
         isLoading: false,
         theme: 'dark',
      });

   const formik = useFormik({
      initialValues: {
         fname: '',
         lname: '',
         email: '',
         birthDay: '',
         gender: '',
         password: '',
         repassword: '',
      },
      validationSchema: Yup.object({
         fname: Yup.string().required('Required'),
         lname: Yup.string().required('Required'),

         email: Yup.string()
            .required('Required')
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'),
         birthDay: Yup.string().required('Required'),
         gender: Yup.string().required('Required'),
         password: Yup.string()
            .required('Required')
            .matches(
               /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
               'Password must be minimum 8 character and  contain at least one letter, one number',
            ),
         repassword: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('password'), null], 'Password must match'),
      }),
      onSubmit: (values) => {
         notify();

         authService
            .register(values.fname, values.lname, values.email, values.birthDay, values.gender, values.password)
            .then((result) => {
               if (result.data.status === 200) {
                  updateNoti();
               } else {
                  updateFailedNoti(result.data.message);
               }
            })
            .catch((error) => {
               console.log(error);
               updateFailedNoti('Your email have already existed');
            });
      },
   });

   return (
      <>
         <form onSubmit={formik.handleSubmit}>
            <div className=" h-signupHeight bg-[#fafafb] rounded-xl flex flex-col justify-evenly items-center ">
               <h1 className="text-black font-roboto font-semibold text-2xl mt-8 ">Let's Go!</h1>
               <div className="flex flex-col gap-[10px]">
                  <div className="name-box flex w-iW justify-between">
                     <div className="fname w-[150px] ">
                        <label className="text-xs font-medium" htmlFor="fname">
                           Fisrt Name
                        </label>
                        <input
                           className="text-sm w-[150px] px-3 py-[10px] rounded bg-inputColor outline-none font-roboto text-black/90"
                           type="text"
                           id="fname"
                           name="fname"
                           value={formik.values.fname}
                           onChange={formik.handleChange}
                           placeholder="First Name"
                        />
                        {formik.errors.fname && <p className="errorMsg text-[10px] text-red">{formik.errors.fname}</p>}
                     </div>
                     <div className="lname w-[150px] ">
                        <label className="text-xs font-medium" htmlFor="lname">
                           Last Name
                        </label>
                        <input
                           className="text-sm w-[150px] px-3 py-[10px] rounded bg-inputColor outline-none font-roboto text-black/90"
                           type="text"
                           placeholder="Last Name"
                           name="lname"
                           id="lname"
                           value={formik.values.lname}
                           onChange={formik.handleChange}
                        />
                        {formik.errors.lname && <p className="errorMsg text-[10px] text-red">{formik.errors.lname}</p>}
                     </div>
                  </div>
                  <div className="email-box flex flex-col">
                     <label className="text-xs font-medium" htmlFor="email">
                        Email
                     </label>
                     <input
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        placeholder="Enter Your Email"
                        className="text-sm w-iW px-3 py-10 rounded bg-inputColor outline-none font-roboto text-black/90"
                     />
                     {formik.errors.email && (
                        <p className="errorMsg text-[10px] text-red w-iW">{formik.errors.email}</p>
                     )}
                  </div>
                  <div className="name-box flex w-iW justify-between">
                     <div className="birthDay w-[150px] ">
                        <label className="text-xs font-medium" htmlFor="birthDay">
                           BirthDay
                        </label>
                        <input
                           className="text-sm w-[150px] px-3 py-[9px] rounded bg-inputColor outline-none font-roboto text-black/90"
                           type="date"
                           id="birthDay"
                           name="birthDay"
                           value={formik.values.birthDay}
                           onChange={formik.handleChange}
                        />
                        {formik.errors.birthDay && (
                           <p className="errorMsg text-[10px] text-red">{formik.errors.birthDay}</p>
                        )}
                     </div>
                     <div className="gender w-[150px] ">
                        <label className="text-xs font-medium">Gender</label>
                        <select
                           value={formik.values.gender}
                           onChange={formik.handleChange}
                           id="gender"
                           name="gender"
                           className="text-sm w-[150px] px-2 py-[10px] rounded bg-inputColor outline-none font-roboto text-black/90"
                        >
                           <option value="" disabled defaultValue></option>
                           <option value="0">Male</option>
                           <option value="1">Female</option>
                        </select>
                        {formik.errors.gender && (
                           <p className="errorMsg text-[10px] text-red">{formik.errors.gender}</p>
                        )}
                     </div>
                  </div>
                  <div className="password-box flex flex-col">
                     <label className="text-xs font-medium" htmlFor="password">
                        Password
                     </label>
                     <input
                        type="password"
                        name="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder="Enter Your Password"
                        className="text-sm w-iW px-3 py-10 rounded bg-inputColor outline-none font-roboto text-black/90"
                     />
                     {formik.errors.password && (
                        <p className="errorMsg text-[10px] text-red w-iW">{formik.errors.password}</p>
                     )}
                  </div>
                  <div className="password-box flex flex-col">
                     <label className="text-xs font-medium" htmlFor="repassword">
                        Confirm Password
                     </label>
                     <input
                        type="password"
                        name="repassword"
                        id="repassword"
                        value={formik.values.repassword}
                        onChange={formik.handleChange}
                        placeholder="Confirm Your Password"
                        className="text-sm w-iW px-3 py-10 rounded bg-inputColor outline-none font-roboto text-black/90"
                     />
                     {formik.errors.repassword && (
                        <p className="errorMsg text-[10px] text-red w-iW">{formik.errors.repassword}</p>
                     )}
                  </div>

                  <div className="text-xs policy-box w-iW flex items-start ">
                     <p htmlFor="policy">
                        By clicking Sign Up, you agree to our{' '}
                        <a className="text-primaryblue font-semibold" href="/#">
                           Terms of Service
                        </a>{' '}
                        <br /> and{' '}
                        <a className="text-primaryblue font-semibold" href="/#">
                           Privacy Policy
                        </a>
                     </p>
                  </div>

                  <div className="w-iW flex justify-center items-center mt-5">
                     <button type="submit" className="text-white btn btn-primary btn-block btn-sm h-9 normal-case mb-4">
                        Sign Up
                     </button>
                  </div>
               </div>
            </div>
         </form>
      </>
   );
};

export default Signup;
