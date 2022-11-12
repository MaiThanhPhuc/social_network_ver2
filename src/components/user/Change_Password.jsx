import { toast } from 'react-toastify';
import avatarDefault from '../../Resource/Image/avatar.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useOutletContext } from 'react-router-dom';
const API_URL = process.env.REACT_APP_BASE_URL;
const Change_Password = () => {
   const [userData] = useOutletContext();
   const user = JSON.parse(localStorage.getItem('user'));
   const token = user.access_token;
   const formik = useFormik({
      initialValues: {
         email: userData.email,
         currentPass: '',
         newPassword: '',
         confirmPass: '',
      },
      validationSchema: Yup.object({
         currentPass: Yup.string().required('Required'),
         newPassword: Yup.string()
            .required('Required')
            .matches(
               /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
               'Password must be minimum 8 character and  contain at least one letter, one number',
            ),
         confirmPass: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('newPassword'), null], 'Password must match'),
      }),
      onSubmit: (values) => {
         var myHeaders = new Headers();
         myHeaders.append('Content-Type', 'application/json');
         myHeaders.append('Authorization', `Bearer ${token}`);
         var raw = JSON.stringify({
            email: values.email,
            oldPassword: values.currentPass,
            newPassword: values.newPassword,
         });

         var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
         };

         fetch(`${API_URL}changePassword`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
               toast('Password Changed Successfully 🔑🔑!', {
                  position: 'bottom-center',
                  autoClose: 3000,
                  theme: 'dark',
               });
               formik.resetForm();
            })
            .catch((error) => console.log('error', error));
      },
   });

   return (
      <>
         <form onSubmit={formik.handleSubmit}>
            <div className="bg-white rounded h-[600px]">
               <div className="flex flex-col gap-6 py-8 items-center">
                  <div className="avatar-change flex items-center justify-center w-[300px] ">
                     <a className="avatar w-1/4 flex justify-end">
                        <div className="w-9 rounded-full">
                           <img src={userData.imageUrl !== null ? userData.imageUrl : avatarDefault} />
                        </div>
                     </a>
                     <div className="user-name-change-avatar ml-8">
                        <h2 className="font-semibold text-base">{localStorage.getItem('userName')}</h2>
                     </div>
                  </div>
                  <div className="w-[300px] flex flex-col items-center">
                     <div className=" items-edit-user-currentPass flex justify-between w-full mb-4">
                        <label htmlFor="currentPass" className="font-semibold text-right">
                           Current
                        </label>
                        <input
                           type="password"
                           onChange={formik.handleChange}
                           value={formik.values.currentPass}
                           id="currentPass"
                           name="currentPass"
                           className=" p-1  border border-black/20 rounded"
                        />
                     </div>
                     {formik.errors.currentPass && (
                        <span className="errorMsg text-[10px] text-red">{formik.errors.currentPass}</span>
                     )}
                     <div className=" items-edit-user-newPassword flex justify-between w-full  ">
                        <label htmlFor="newPassword" className="font-semibold text-right ">
                           New
                        </label>
                        <input
                           type="password"
                           className=" p-1 border border-black/20 rounded "
                           name="newPassword"
                           onChange={formik.handleChange}
                           value={formik.values.newPassword}
                           id="newPassword"
                        />
                     </div>
                     {formik.errors.newPassword && (
                        <div className=" errorMsg text-[10px] text-red">{formik.errors.newPassword}</div>
                     )}
                     <div className="items-edit-user-confirmPass flex justify-between w-full  mt-4">
                        <label htmlFor="confirmPass" className="font-semibold text-right">
                           Re-type new
                        </label>
                        <input
                           type="password"
                           className=" p-1 border border-black/20 rounded "
                           name="confirmPass"
                           onChange={formik.handleChange}
                           value={formik.values.confirmPass}
                           id="confirmPass"
                        />
                     </div>
                     {formik.errors.confirmPass && (
                        <span className=" errorMsg text-[10px] text-red ">{formik.errors.confirmPass}</span>
                     )}
                  </div>

                  <div className="btn-edit-user flex">
                     <div className="w-1/4 mr-8"></div>
                     <button type="submit" className="px-6 btn text-right btn-sm btn-primary normal-case text-white">
                        Change Password
                     </button>
                  </div>
               </div>
            </div>
         </form>
      </>
   );
};

export default Change_Password;
