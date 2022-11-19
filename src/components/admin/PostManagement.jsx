import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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

const PostManagement = () => {
   const [dataPost, setDataPost] = useState([]);
   const [loading, setLoading] = useState(false);
   const [totalPage, setTotalPage] = useState(0);
   const [page, setPage] = useState(0);
   const user = JSON.parse(sessionStorage.getItem('user'));

   useEffect(() => {
      fetchPosts(page);
   }, []);

   const fetchPosts = async (temp) => {
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${user.access_token}`);

      var requestOptions = {
         method: 'GET',
         headers: myHeaders,
         redirect: 'follow',
      };

      fetch(`${API_URL}post?page=${temp}&size=10`, requestOptions)
         .then((response) => response.text())
         .then((result) => {
            const payload = JSON.parse(result);

            setDataPost(payload);
            setLoading(false);
            setTotalPage(payload.totalPages);
         })
         .catch((error) => console.log('error', error));
   };

   const handleNextPage = () => {
      if (page !== totalPage) {
         setPage(page + 1);
         fetchPosts(page + 1);
      } else {
         return 0;
      }
   };

   const handlePrevPage = () => {
      if (page !== 0) {
         setPage(page - 1);
         fetchPosts(page - 1);
      } else {
         return 0;
      }
   };

   const handleDeletePost = (post) => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${user.access_token}`);

      var requestOptions = {
         method: 'DELETE',
         headers: myHeaders,
         redirect: 'follow',
      };

      fetch(`https://socialnetwork999.herokuapp.com/api/post/${post.post.id}`, requestOptions)
         .then((response) => response.text())
         .then((result) => {
            setDataPost(dataPost.filter((tmp) => tmp !== post));
         })
         .catch((error) => console.log('error', error));
   };

   const columns = [
      {
         name: 'ID',
         selector: (row) => row.post.id,
         sortable: true,
      },
      {
         name: 'OwnerID',
         selector: (row) => row.userCreate,
         grow: 1,

         sortable: true,
      },
      {
         name: 'Image',
         maxWidth: '100px',
         cell: (row) =>
            row.post.images.map((temp) => (
               <img key={temp.imgPostId} src={temp.urlImage} className="w-9 h-9 object-contain overflow-auto" />
            )),
      },

      {
         name: 'Content',
         selector: (row) => row.post.content,
         sortable: true,
      },
      {
         name: 'Liked',
         selector: (row) => row.post.countLiked,

         sortable: true,
      },
      {
         name: 'Comented',
         selector: (row) => row.post.countCmted,

         sortable: true,
      },
      {
         name: 'Shared',
         selector: (row) => row.post.countShated,

         sortable: true,
      },
      {
         cell: (row) => (
            <div className="dropdown dropdown-end">
               <label tabIndex="0" className="">
                  <button className="hover:bg-black/20 text-black rounded-full">
                     <BiDotsVerticalRounded size={20} />
                  </button>
               </label>
               <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                  <li>
                     <a
                        onClick={() => {
                           handleDeletePost(row);
                        }}
                        className="text-red"
                     >
                        <AiOutlineDelete size={18} /> Delete
                     </a>
                  </li>
               </ul>
            </div>
         ),
         ignoreRowClick: true,
         allowOverflow: true,
         button: true,
      },
   ];
   return (
      <>
         <div className="flex justify-center pt-9  ">
            <div className="flex flex-col justify-start border border-black/20 p-6 shadow">
               <div className="text-black text-2xl mb-5 ">Post Management</div>
               <div className="main w-[1000px]  ">
                  <DataTable
                     progressPending={loading}
                     columns={columns}
                     data={dataPost}
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

export default PostManagement;
