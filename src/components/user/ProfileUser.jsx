import { AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import avatarDefault from '../../Resource/Image/avatar.png';
import { BsPerson } from 'react-icons/bs';

const ProfileUser = ({ userData }) => {
   return (
      <>
         <div className="bg-white mb-4 flex flex-col items-center rounded py-8 gap-6">
            <div className="heading-profile flex flex-col justify-center items-center gap-3 ">
               <div className="avatar ">
                  <div className="w-UserAvatar rounded-full hover:cursor-pointer">
                     <img
                        src={userData.imageUrl !== null ? userData.imageUrl : avatarDefault}
                        className="hover:bg-white"
                     />
                  </div>
               </div>
               <div className="name-user">
                  <h1 className="font-bold text-black text-xl">{localStorage.getItem('userName')}</h1>
               </div>
            </div>
            <div className="border border-b w-5/6 border-grayLight"></div>
            <div className="info-user flex flex-col justify-center items-center w-5/6 gap-2">
               <div className="from-box flex justify-between w-full">
                  <h3 className="label-info font-semibold text-sm">Email</h3>
                  <span className="content-info text-grayText font-medium text-sm">{userData.email}</span>
               </div>
               <div className="from-box flex justify-between w-full">
                  <h3 className="label-info font-semibold text-sm">Address</h3>
                  <span className="content-info text-grayText font-medium text-sm">{userData.address}</span>
               </div>
               <div className="bio-box flex justify-between w-full">
                  <h3 className="label-info font-semibold text-sm">Gender</h3>
                  <span className="content-info text-grayText font-medium text-sm w-2/3 text-right">
                     {userData.gender == 0 ? 'Male' : 'Female'}
                  </span>
               </div>
               <div className="bio-box flex justify-between w-full">
                  <h3 className="label-info font-semibold text-sm">Date of birth</h3>
                  <span className="content-info text-grayText font-medium text-sm w-2/3 text-right">
                     {userData.birthDay}
                  </span>
               </div>
               <div className="bio-box flex justify-between w-full">
                  <h3 className="label-info font-semibold text-sm">Bio</h3>
                  <span className="content-info text-grayText font-medium text-sm w-2/3 text-right">
                     {userData.bio}
                  </span>
               </div>
               <div className="flex gap-9">
                  <div className="flex py-2 px-2  rounded-lg text-black items-center ">
                     <h3 className="label-info font-semibold  text-sm">Follower:</h3>
                     <span className=" font-medium text-sm mx-1 ">{userData.countFollower}</span>
                     <BsPerson />
                  </div>
                  <div className="flex py-2 px-2  rounded-lg text-black items-center ">
                     <h3 className="label-info font-semibold text-sm">Following:</h3>
                     <span className=" font-medium mx-1  text-sm">{userData.countFollowing}</span>
                     <BsPerson />
                  </div>
               </div>
            </div>
            <Link to="/accounts" className="btn btn-primary btn-sm normal-case text-[13px] text-white w-5/6">
               Edit profile
               <AiOutlineEdit className="ml-1 text-lg" />
            </Link>
         </div>
      </>
   );
};

export default ProfileUser;
