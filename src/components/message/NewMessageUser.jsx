import { useNavigate } from 'react-router-dom';
import avatarDefault from '../../Resource/Image/avatar.png';

const NewMessageUser = ({ dataUser, setIsMessage }) => {
   const navigate = useNavigate();
   const handleSelectedUser = () => {
      setIsMessage(true);
      navigate(`/inbox/${dataUser.id}`, { replace: true });
   };
   return (
      <>
         {dataUser !== undefined ? (
            <div
               onClick={handleSelectedUser}
               className="user-items cursor-pointer flex items-center hover:bg-grayLight rounded px-4 py-2"
            >
               <button className="avatar">
                  <div className="w-12 rounded-full">
                     <img alt="avatar" src={dataUser.imageUrl != null ? dataUser.imageUrl : avatarDefault} />
                  </div>
               </button>
               <div className="box-left flex flex-col ml-2">
                  <span className="user-name text-black font-semibold ">
                     {dataUser.lastName + ' ' + dataUser.firstName}
                  </span>
                  <span className="text-grayText text-xs font-semibold">{dataUser.email}</span>
               </div>
            </div>
         ) : null}
      </>
   );
};

export default NewMessageUser;
