import { Link } from 'react-router-dom';
import avatarDefault from '../../Resource/Image/avatar.png';

const Account = ({ data }) => {
   const user = JSON.parse(sessionStorage.getItem('user'));
   const Id = user.userId;
   return (
      <>
         <Link to={Id !== `${data.id}` ? `/user/${data.id}` : `/user`} className="template cursor-pointer ">
            <div className="flex w-full bg-white border-b-[1px] border-gray border-indigo-500 p-1 hover:bg-black/10">
               <div className="w-14 flex flex-col">
                  <div className="flex items-center">
                     <button className="avatar">
                        <div className="w-8 rounded-full m-2">
                           <img src={data.imageUrl !== null ? data.imageUrl : avatarDefault} alt="avatar" />
                        </div>
                     </button>
                  </div>
               </div>
               <div className="w-full flex items-center">
                  <div className="flex flex-col">
                     <div className=" text-sm text-bodytxt">{data.lastName + ' ' + data.firstName}</div>
                     <span className=" font-thin text-xs">{data.email}</span>
                  </div>
               </div>
            </div>
         </Link>
      </>
   );
};

export default Account;
