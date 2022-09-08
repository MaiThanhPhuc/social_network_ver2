import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { loginUser } from '~/redux/apiRequets';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';
const cx = classNames.bind(styles);

const Login = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema: Yup.object({
         email: Yup.string()
            .required('Required')
            .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'),
         password: Yup.string()
            .required('Required')
            .matches(
               /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
               'Password must be minimun 8 characters and contain at least one letter and one number',
            ),
      }),
      onSubmit: (values) => {
         const newUser = {
            email: values.email,
            password: values.password,
         };
         loginUser(newUser, dispatch, navigate);
      },
   });

   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('form')}>
               <div className={cx('form-header')}>
                  <div className={cx('form-header-heading')}>Welcome back</div>
                  <div className={cx('form-header-buttons')}>
                     <Button type="button" outline leftIcon={<Icon icon="flat-color-icons:google" />}>
                        {' '}
                        Sign in with Google
                     </Button>
                  </div>
                  <div className={cx('form-header-divider')}>
                     <span className={cx('form-header-divider-line')}></span>
                     <span className={cx('form-header-divider-text')}>or login with Email</span>
                     <span className={cx('form-header-divider-line')}></span>
                  </div>
               </div>
               <form className={cx('form-body')}>
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
                        className={'form-body-email-input'}
                     />
                     {formik.errors.password && <p className={cx('errorMsg')}>{formik.errors.password} </p>}
                  </div>
                  <div className={cx('form-body-recover')}>
                     <Button type="button" className={cx('form-body-recover-text')} to={'/recover'}>
                        Forget password ?
                     </Button>
                  </div>
                  <div className={cx('form-body-login')}>
                     <Button
                        type="submit"
                        onClick={formik.handleSubmit}
                        className={cx('form-body-login-button')}
                        primary
                     >
                        Login
                     </Button>
                  </div>
                  <div className={cx('form-body-register')}>
                     Not registered yet?{' '}
                     <Button type="button" className={cx('form-body-register-button')} to={'/register'}>
                        Create an Account
                     </Button>
                  </div>
               </form>
            </div>
            <div className={cx('footer')}>&copy; qp network All rights reserved</div>
         </div>
      </>
   );
};

export default Login;
