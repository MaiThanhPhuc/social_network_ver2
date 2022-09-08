import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import * as Yup from 'yup';
import { registerUser } from '~/redux/apiRequets';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';
import { useFormik } from 'formik';
const cx = classNames.bind(styles);

const Register = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const formik = useFormik({
      initialValues: {
         fname: '',
         lname: '',
         email: '',
         password: '',
         rePassword: '',
      },
      validationSchema: Yup.object({
         fname: Yup.string().required('Required'),
         lname: Yup.string().required('Required'),
         email: Yup.string()
            .required('Required')
            .matches(/^[\w-]+@([\w-]+)+[\w-]{2,4}$/, 'Please enter a valid email address'),
         password: Yup.string()
            .required('Required')
            .matches(
               /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
               'Password must be minimun 8 characters and contain at least one letter and one number',
            ),
         rePassword: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('password'), null], 'Password must match'),
      }),
      onSubmit: (values) => {
         const newUser = {
            email: values.email,
            password: values.password,
            firstName: values.fname,
            lastName: values.lname,
         };
         registerUser(newUser, dispatch, navigate);
      },
   });
   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('form')}>
               <div className={cx('form-header')}>
                  <div className={cx('form-header-heading')}>Register</div>
                  <div className={cx('form-header-subheading')}>Let’s discover together new opportunities</div>

                  <div className={cx('form-header-divider')}>
                     <span className={cx('form-header-divider-line')}></span>
                  </div>
               </div>
               <form className={cx('form-body')} onSubmit={formik.handleSubmit}>
                  <div className={cx('form-body-name')}>
                     <div className={cx('form-body-name-fname')}>
                        <label htmlFor="fname">First Name</label>
                        <input
                           value={formik.values.fname}
                           onChange={formik.handleChange}
                           id="fname"
                           type="fname"
                           placeholder="Fisrt Name"
                           className={'form-body-fname-input'}
                        />
                        {formik.errors.fname && <p className={cx('errorMsg')}>{formik.errors.fname} </p>}
                     </div>
                     <div className={cx('form-body-name-lname')}>
                        <label htmlFor="lname">Last Name</label>
                        <input
                           value={formik.values.lname}
                           onChange={formik.handleChange}
                           id="lname"
                           type="lname"
                           placeholder="Last Name"
                           className={'form-body-lname-input'}
                        />
                        {formik.errors.lname && <p className={cx('errorMsg')}>{formik.errors.lname} </p>}
                     </div>
                  </div>

                  <div className={cx('form-body-email')}>
                     <label htmlFor="email">Email</label>
                     <input
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        id="email"
                        type="email"
                        placeholder="mail@mail.com"
                        className={'form-body-email-input'}
                     />
                     {formik.errors.email && <p className={cx('errorMsg')}>{formik.errors.email} </p>}
                  </div>
                  <div className={cx('form-body-password')}>
                     <label htmlFor="password">Password</label>
                     <input
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        id="password"
                        type="password"
                        placeholder="Min 8 character"
                        className={'form-body-password-input'}
                     />
                     {formik.errors.password && <p className={cx('errorMsg')}>{formik.errors.password} </p>}
                  </div>
                  <div className={cx('form-body-repassword')}>
                     <label htmlFor="rePassword">Confirm Password</label>
                     <input
                        value={formik.values.rePassword}
                        onChange={formik.handleChange}
                        id="rePassword"
                        type="password"
                        placeholder="Min 8 character"
                        className={'form-body-repassword-input'}
                     />
                     {formik.errors.rePassword && <p className={cx('errorMsg')}>{formik.errors.rePassword} </p>}
                  </div>
                  <div className={cx('form-body-recover')}>
                     <Button type="button" className={cx('form-body-recover-text')} to={'/recover'}>
                        Forget password ?
                     </Button>
                  </div>
                  <div className={cx('form-body-register')}>
                     <Button
                        type="submit"
                        onClick={formik.handleSubmit}
                        className={cx('form-body-register-button')}
                        primary
                     >
                        Register
                     </Button>
                  </div>
                  <div className={cx('form-body-login')}>
                     Already have an account?{' '}
                     <Button type="button" className={cx('form-body-login-button')} to={'/login'}>
                        Log In
                     </Button>
                  </div>
               </form>
            </div>
            <div className={cx('footer')}>&copy; qp network All rights reserved</div>
         </div>
      </>
   );
};

export default Register;
