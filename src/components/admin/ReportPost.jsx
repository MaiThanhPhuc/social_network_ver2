import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
const API_URL_ADMIN = process.env.REACT_APP_ADMIN_URL;

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

const ReportPost = () => {
   const [dataPost, setDataPost] = useState([]);
   const [loading, setLoading] = useState(false);
   const user = JSON.parse(localStorage.getItem('user'));

   useEffect(() => {
      fetchPosts();
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

      fetch(`${API_URL_ADMIN}report/post`, requestOptions)
         .then((response) => response.text())
         .then((result) => {
            const payload = JSON.parse(result).data;
            setDataPost(payload);
            setLoading(false);
         })
         .catch((error) => console.log('error', error));
   };

   const columns = [
      {
         name: 'ID',
         selector: (row) => row.id,
         sortable: true,
      },
      {
         name: 'Images',
         cell: (row) =>
            row.images.map((temp) => (
               <img key={temp.imgPostId} src={temp.urlImage} className="w-9 h-9 object-contain " />
            )),
         sortable: true,
      },
      {
         name: 'Content',
         selector: (row) => row.content,
         sortable: true,
      },
      {
         name: 'Likes',
         selector: (row) => row.countLiked,
         sortable: true,
      },
      {
         name: 'Comments',
         selector: (row) => row.countCmted,
         sortable: true,
      },
      {
         name: 'Shares',
         selector: (row) => row.countShated,
      },
      {
         name: 'Reports',
         selector: (row) => row.countReported,
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
                     <a
                        onClick={() => {
                           handleButtonDeleteClick(row);
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

   const handleButtonDeleteClick = (post) => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${user.access_token}`);

      var requestOptions = {
         method: 'DELETE',
         headers: myHeaders,
         redirect: 'follow',
      };

      fetch(`${API_URL_ADMIN}post/${dataPost.id}`, requestOptions)
         .then((response) => response.text())
         .then((result) => {
            if (result) setDataPost(dataPost.filter((tmp) => tmp != post));
         })
         .catch((error) => console.log('error', error));
   };

   return (
      <>
         <div className="flex justify-center pt-11  ">
            <div className="flex flex-col justify-start border border-black/20 p-6 shadow">
               <div className="text-black text-2xl mb-6 ">Report Posts Management</div>
               <div className="main w-[1000px] ">
                  <DataTable
                     progressPending={loading}
                     columns={columns}
                     data={dataPost}
                     customStyles={customStyles}
                     highlightOnHover
                     pointerOnHover
                     fixedHeader={true}
                     fixedHeaderScrollHeight={400}
                     defaultSortField="id"
                     defaultSortAsc={false}
                  />
               </div>
            </div>
         </div>
      </>
   );
};

export default ReportPost;
