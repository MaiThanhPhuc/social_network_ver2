import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import userService from '../../Services/user.service';

const AdminPage = () => {
   const [dataAdmin, setDataAdmin] = useState();
   const user = JSON.parse(localStorage.getItem('user'));
   const Id = user.userId;

   useEffect(() => {
      fetchDataAdmin();
   }, []);
   const fetchDataAdmin = () => {
      userService
         .getUser(Id)
         .then((result) => {
            setDataAdmin(result);
         })
         .catch((err) => {
            console.log(err);
         });
   };
   return (
      <>
         <div className=" pl-[251px] bg-white h-screen ">
            {dataAdmin !== undefined ? <Sidebar dataAdmin={dataAdmin} /> : null}

            <Outlet />
         </div>
      </>
   );
};

export default AdminPage;
