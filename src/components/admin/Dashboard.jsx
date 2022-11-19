import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsFillFilePostFill } from 'react-icons/bs';
const API_URL_ADMIN = process.env.REACT_APP_ADMIN_URL;
const Dashboard = () => {
   const [users, setUsers] = useState();
   const [posts, setposts] = useState();
   const user = JSON.parse(sessionStorage.getItem('user'));

   useEffect(() => {
      fetchUsers();
      fetchPosts();
   }, []);

   const fetchUsers = async () => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${user.access_token}`);

      var requestOptions = {
         method: 'GET',
         headers: myHeaders,
         redirect: 'follow',
      };
      fetch(`${API_URL_ADMIN}user?page=0&size=10`, requestOptions)
         .then((response) => response.text())
         .then((result) => {
            const payload = JSON.parse(result)?.data;
            setUsers(payload.totalElements);
         })
         .catch((error) => console.log('error', error));
   };

   const fetchPosts = async () => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${user.access_token}`);

      var requestOptions = {
         method: 'GET',
         headers: myHeaders,
         redirect: 'follow',
      };

      fetch(`${API_URL_ADMIN}post?page=0&size=50`, requestOptions)
         .then((response) => response.text())
         .then((result) => {
            const payload = JSON.parse(result);
            setposts(payload.length);
         })
         .catch((error) => console.log('error', error));
   };

   return (
      <>
         <div className="">
            <div className="heading flex justify-center pt-8 ">
               <div className="stats shadow">
                  <div className="stat bg-red/20">
                     <div className="stat-figure text-secondary">
                        <AiOutlineUser size={30} color="#000" />
                     </div>
                     <div className="stat-title text-black font-medium">Total User</div>
                     <div className="stat-value">{users}</div>
                  </div>

                  <div className="stat bg-[#3330E4]/20">
                     <div className="stat-figure text-secondary">
                        <BsFillFilePostFill size={30} color="#000" />
                     </div>
                     <div className="stat-title text-black font-medium">Total Post</div>
                     <div className="stat-value">{posts}</div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Dashboard;
