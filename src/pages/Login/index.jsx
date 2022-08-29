import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { Icon } from '@iconify/react';
const cx = classNames.bind(styles);

const Login = () => {
   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('inner')}>
               <div className={cx('left-image')}></div>
               <div className={cx('right-form')}>
                  <div className={cx('right-form-header')}>
                     <div className={cx('right-form-header-heading')}>Welcome back</div>
                     <div className={cx('right-form-header-buttons')}>
                        <Button outline leftIcon={<Icon icon="flat-color-icons:google" />}>
                           {' '}
                           Sign in with Google
                        </Button>
                     </div>
                     <div className={cx('right-form-header-divider')}>
                        <span className={cx('right-form-header-divider-line')}></span>
                        <span className={cx('right-form-header-divider-text')}>or login with Email</span>
                        <span className={cx('right-form-header-divider-line')}></span>
                     </div>
                  </div>
                  <form className={cx('right-form-body')}>
                     <div className={cx('right-form-body-email')}>
                        <label htmlFor="email">Email</label>
                        <input
                           id="email"
                           type="email"
                           placeholder="mail@mail.com"
                           className={'right-form-body-email-input'}
                        />
                     </div>
                     <div className={cx('right-form-body-password')}>
                        <label htmlFor="password">Password</label>
                        <input
                           id="password"
                           type="password"
                           placeholder="Min 8 character"
                           className={'right-form-body-email-input'}
                        />
                     </div>
                     <div className={cx('right-form-body-recover')}>
                        <Button className={cx('right-form-body-recover-text')} to={'/recover'}>
                           Forget password ?
                        </Button>
                     </div>
                     <div className={cx('right-form-body-login')}>
                        <Button className={cx('right-form-body-login-button')} primary>
                           Login
                        </Button>
                     </div>
                     <div className={cx('right-form-body-register')}>
                        Not registered yet?{' '}
                        <Button className={cx('right-form-body-register-button')} to={'/register'}>
                           Create an Account
                        </Button>
                     </div>
                  </form>
               </div>
               <div className={cx('footer')}>&copy; qp network All rights reserved</div>
            </div>
         </div>
      </>
   );
};

export default Login;
