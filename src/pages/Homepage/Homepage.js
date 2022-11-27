import React from 'react';
import { useEffect } from 'react';
import Signin from '../../components/signin/Signin';
import { useNavigate } from 'react-router-dom';

function Homepage() {
   let navigate = useNavigate();
   const getUrlParameter = (name) => {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

      var results = regex.exec(window.location.href);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
   };
   useEffect(() => {
      const token = getUrlParameter('token');
      const user = { access_token: token };
      if (token) {
         localStorage.setItem('user', JSON.stringify(user));
         console.log(token);
         navigate('/');
      }
   }, []);

   return (
      <div className="bg-gray h-screen">
         <div className="pt-pTopNav bg-gradient-to-br from-primaryblue/30 to-white w-full h-full flex">
            <div className="flex-1 flex justify-center items-center">
               <h1 className=" text-black font-roboto text-4xl font-semibold mb-16">
                  The simple way to <br />
                  connect and look back <br />
                  on moments forever.
               </h1>
            </div>{' '}
            <Signin />
            <div
               className=" bg-no-repeat bg-cover h-full flex-1 "
               style={{
                  backgroundImage: 'url(https://i.ibb.co/vLsw5sT/undraw-Social-update-re-xhjr.png)',
                  opacity: '60%',
               }}
            ></div>
         </div>
      </div>
   );
}

export default Homepage;
