import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { BiDotsVerticalRounded, BiRevision } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import avatarDefault from '../../Resource/Image/avatar.png';

const API_URL = process.env.REACT_APP_ADMIN_URL;

const customStyles = {
   headRow: {
      style: {
         border: 'none',
      },
   },
   headCells: {
      style: {
         color: '#202124',
         fontSize: '14px',
      },
   },
   rows: {
      highlightOnHoverStyle: {
         backgroundColor: '#f5f5f5',
         borderBottomColor: '#FFFFFF',
         outline: '1px solid #FFFFFF',
      },
   },
   pagination: {
      style: {
         border: 'none',
      },
   },
};

const UserManagement = () => {
   const [dataUser, setDataUser] = useState([]);
   const [loading, setLoading] = useState(false);
   const [totalPage, setTotalPage] = useState();
   const [page, setPage] = useState(0);
   const user = JSON.parse(localStorage.getItem('user'));

   useEffect(() => {
      fetchUsers(page);
   }, []);

   const fetchUsers = async (temp) => {
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${user.access_token}`);

      var requestOptions = {
         method: 'GET',
         headers: myHeaders,
         redirect: 'follow',
      };

      fetch(`${API_URL}user?page=${temp}&size=10`, requestOptions)
         .then((response) => response.text())
         .then((result) => {
            const payload = JSON.parse(result).data;
            setDataUser(payload.content);
            setLoading(false);
            setTotalPage(payload.totalPages);
         })
         .catch((error) => console.log('error', error));
   };

   const handleNextPage = () => {
      if (page !== totalPage) {
         setPage(page + 1);
         fetchUsers(page + 1);
      } else {
         return 0;
      }
   };

   const handlePrevPage = () => {
      if (page !== 0) {
         setPage(page - 1);
         fetchUsers(page - 1);
      } else {
         return 0;
      }
   };

   const columns = [
      {
         name: 'ID',
         selector: (row) => row.id,
         sortable: true,
      },
      {
         name: 'Avatar',
         cell: (row) => (
            <img src={row?.imageUrl ? row?.imageUrl : avatarDefault} className="w-9 h-9 rounded-full object-cover" />
         ),
         sortable: true,
      },
      {
         name: 'First Name',
         selector: (row) => row.firstName,
         sortable: true,
      },
      {
         name: 'Last Name',
         selector: (row) => row.lastName,
         sortable: true,
      },
      {
         name: 'Email',
         selector: (row) => row.email,
         sortable: true,
      },
      {
         name: 'Role',
         selector: (row) => row.role,
         sortable: true,
      },
      {
         name: 'Status',
         selector: (row) => (row.enable ? 'Activated' : 'Not activated'),
         conditionalCellStyles: [
            {
               when: (row) => row.enable === true,
               style: {
                  backgroundColor: 'rgba(63, 195, 128, 0.9)',
                  color: 'white',
               },
            },
            {
               when: (row) => row.enable === false,
               style: {
                  backgroundColor: 'rgba(242, 38, 19, 0.9)',
                  color: 'white',
               },
            },
         ],
      },
      {
         cell: (row) => (
            <div className="dropdown dropdown-left dropdown-end">
               <label tabIndex="0" className="">
                  <button className="hover:bg-black/20 text-black rounded-full">
                     <BiDotsVerticalRounded size={20} />
                  </button>
               </label>
               <ul tabIndex="0" className="dropdown-content menu p-1 shadow bg-base-100 rounded-box w-32">
                  <li>
                     <Link to={`/admin/user/${row.id}`}>
                        <FaRegEdit size={18} /> Edit
                     </Link>
                  </li>
                  {row.enable ? (
                     <li>
                        <a
                           onClick={() => {
                              handleButtonDeleteClick(row);
                           }}
                           className="text-red"
                        >
                           <AiOutlineDelete size={18} /> Delete
                        </a>
                     </li>
                  ) : (
                     <li>
                        <a
                           onClick={() => {
                              handleButtonEnableClick(row);
                           }}
                        >
                           <BiRevision size={18} /> Enable
                        </a>
                     </li>
                  )}
               </ul>
            </div>
         ),
         ignoreRowClick: true,
         allowOverflow: true,
         button: true,
      },
   ];

   const handleButtonDeleteClick = (userData) => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${user.access_token}`);

      var requestOptions = {
         method: 'DELETE',
         headers: myHeaders,
         redirect: 'follow',
      };

      fetch(`${API_URL}user/${userData.id}`, requestOptions)
         .then((response) => response.text())
         .then((result) => {
            fetchUsers(page);
         })
         .catch((error) => console.log('error', error));
   };
   const handleButtonEnableClick = (userData) => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${user.access_token}`);

      var requestOptions = {
         method: 'PUT',
         headers: myHeaders,
         redirect: 'follow',
      };

      fetch(`${API_URL}user/enable?email=${userData.email}`, requestOptions)
         .then((response) => response.text())
         .then((result) => {
            fetchUsers(page);
         })
         .catch((error) => console.log('error', error));
   };

   return (
      <>
         <div className="flex justify-center pt-9  ">
            <div className="flex flex-col justify-start border border-black/20 p-6 shadow">
               <div className="text-black text-2xl mb-5 ">User Management</div>
               <div className="main w-[1000px]  ">
                  <DataTable
                     progressPending={loading}
                     columns={columns}
                     data={dataUser}
                     customStyles={customStyles}
                     highlightOnHover
                     pointerOnHover
                     defaultSortField="id"
                     defaultSortAsc={false}
                  />
                  <div className="text-right flex items-center justify-end mr-8 mt-4">
                     <span className="text-xs font-meidum">
                        {page + 1} of {totalPage}
                     </span>
                     <div className="flex ml-4 gap-4 items-center text-xs">
                        <button
                           onClick={handlePrevPage}
                           className={`w-6 h-6 flex justify-center items-center rounded-full  ${
                              page !== 0 ? ' hover:bg-grayLight text-black ' : 'text-gray'
                           } `}
                        >
                           <FiChevronLeft size={23} />
                        </button>
                        {page + 1}
                        <button
                           onClick={handleNextPage}
                           className={`w-6 h-6 flex justify-center items-center rounded-full  ${
                              page + 1 !== totalPage ? ' hover:bg-grayLight text-black ' : 'text-gray'
                           } `}
                        >
                           <FiChevronRight size={23} />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default UserManagement;
