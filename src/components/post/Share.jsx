import { useState, useRef } from 'react';
import avatarDefault from '../../Resource/Image/avatar.png';
import Carousel from './Carousel';
import Picker from 'emoji-picker-react';
import TextareaAutosize from 'react-textarea-autosize';
import { BsEmojiSmile } from 'react-icons/bs';
import { toast } from 'react-toastify';
const API_URL = process.env.REACT_APP_BASE_URL;
const Share = ({ postData, stompClient, setShowShareModal }) => {
   const [showPicker, setShowPicker] = useState(false);
   const [cmt, setCmt] = useState('');
   const user = JSON.parse(localStorage.getItem('user'));
   const Id = user.userId;
   const token = user.access_token;
   const toastId = useRef(null);

   const notify = () =>
      (toastId.current = toast('Share post in progress, please wait...', {
         autoClose: false,
         theme: 'dark',
      }));

   const updateNoti = () =>
      toast.update(toastId.current, {
         render: 'Share success',
         autoClose: 3000,
         theme: 'dark',
      });

   const onEmojiClick = (event, emojiObject) => {
      setCmt((prevInput) => prevInput + emojiObject.emoji);
      setShowPicker(false);
   };

   const handleSharePost = () => {
      notify();
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);
      var raw = JSON.stringify({
         content: cmt,
         userId: Id,
         postSharedId: postData.id,
      });

      var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: raw,
         redirect: 'follow',
      };

      fetch(`${API_URL}postshare`, requestOptions)
         .then((response) => response.text())
         .then((result) => {
            updateNoti();
            const payload = JSON.parse(result);
            stompClient.send(`/app/sendNotification`, {}, JSON.stringify(payload.data));
            setShowShareModal(false);
            setCmt('');
         })
         .catch((error) => console.log('error', error));
   };

   return (
      <>
         <div class="modal visible opacity-100 pointer-events-auto">
            <div class="modal-box w-shareWidth max-w-7xl max-h-[800px] relative p-0">
               <button onClick={() => setShowShareModal(false)} class="btn btn-sm btn-circle absolute right-2 top-2">
                  ✕
               </button>
               <h3 class="text-xl font-bold text-center pt-4 ">Share Post</h3>
               <div className=" mt-4 h-full">
                  <div className="relative search-box flex justify-center border-y border-black/10 py-4 px-4">
                     <TextareaAutosize
                        maxRows={3}
                        value={cmt}
                        placeholder="What do you think?"
                        onChange={(e) => setCmt(e.target.value)}
                        className="w-full outline-none rounded resize-none text-black text-base py-1 pl-2"
                     />
                     <button>
                        <BsEmojiSmile
                           className="emoji-icon w-7 h-7 p-1 hover:bg-black/10 rounded-full"
                           onClick={() => setShowPicker((val) => !val)}
                        />
                     </button>
                     {showPicker ? (
                        <Picker
                           disableSearchBar={true}
                           pickerStyle={{
                              width: '70%',
                              right: '5%',
                              top: '80%',
                              position: 'absolute',
                              zIndex: '10',
                           }}
                           onEmojiClick={onEmojiClick}
                        />
                     ) : null}
                  </div>
                  <div className=" overflow-y-auto  h-[500px] py-4 px-4 text-black text-lg flex flex-col">
                     <div className="heading flex items-center">
                        <button className="avatar">
                           <div className="w-[40px] rounded-full">
                              <img
                                 src={
                                    postData.userCreate.imageUrl != null ? postData.userCreate.imageUrl : avatarDefault
                                 }
                              />
                           </div>
                        </button>
                        <span className="headingname font-semibold ml-1 ">
                           {postData.userCreate.lastName + ' ' + postData.userCreate.firstName}
                        </span>
                     </div>
                     <div className="content ml-4 py-2">
                        <span>{postData.content}</span>
                     </div>
                     <div className="body flex flex-col items-center h-[550px] ">
                        {postData.images != null ? (
                           <Carousel imageUrls={postData.images.map((imgs) => imgs.urlImage)} />
                        ) : null}
                     </div>
                  </div>
                  <div className="buttonShare pt-2 pb-4 text-right px-8 border-t border-black/20 ">
                     <button
                        onClick={handleSharePost}
                        className="bg-primaryblue text-white font-semibold text-base px-6 py-1 rounded"
                     >
                        Post
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Share;
