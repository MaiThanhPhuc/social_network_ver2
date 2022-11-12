import { Link } from 'react-router-dom';
import avatarDefault from '../../Resource/Image/avatar.png';
import userService from '../../Services/user.service';
import { useState } from 'react';
import { useEffect } from 'react';
const API_URL = process.env.REACT_APP_BASE_URL;
const FollowerUser = () => {
   const [followers, setFollowers] = useState([]);
   const temp = JSON.parse(localStorage.getItem('user'));
   const Id = temp.userId;

   const handleRemoveFollow = (userRemoveID) => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${temp.access_token}`);

      var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         redirect: 'follow',
      };

      fetch(`${API_URL}user/follow?userId=${userRemoveID}&userFollowedId=${Id}`, requestOptions)
         .then((response) => response.text())
         .then(() => fetchDataFollower())
         .catch((error) => console.log('error', error));
   };

   const fetchDataFollower = () => {
      userService
         .getFollower(Id)
         .then((res) => {
            setFollowers(res.data.data);
         })
         .catch((err) => {
            console.log(err);
         });
   };
   useEffect(() => {
      fetchDataFollower();
   }, []);

   return (
      <>
         <div className="bg-white rounded h-[600px] overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-4">
               {followers != null
                  ? followers.map((item, i) => (
                       <div key={i} className="wrap-items flex justify-between border border-black/10 rounded p-2">
                          <div className="flex items-center ">
                             <Link to={`/user/${item.id}`} className="avatar">
                                <div className="w-14 rounded">
                                   <img src={item.imageUrl != null ? item.imageUrl : avatarDefault} />
                                </div>
                             </Link>
                             <Link
                                to={`/user/${item.id}`}
                                className="text-base text-black font-semibold ml-2 hover:underline "
                             >
                                {item.lastName + ' ' + item.firstName}
                             </Link>
                          </div>

                          <button
                             onClick={() => {
                                handleRemoveFollow(item.id);
                             }}
                             className=" mr-2 border border-black/20 rounded text-black font-semibold text-sm px-2 my-3 active:text-black/70 "
                          >
                             Remove
                          </button>
                       </div>
                    ))
                  : null}

               {followers[0] == null ? 'You have no follower' : null}
            </div>
         </div>
      </>
   );
};

export default FollowerUser;
