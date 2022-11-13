import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import TextareaAutosize from 'react-textarea-autosize';
import { BsEmojiSmile } from 'react-icons/bs';
const API_URL = process.env.REACT_APP_BASE_URL;
const Commentbox = ({ stompClient, userID, postID, setReload, setCmts, cmts }) => {
   const user = JSON.parse(sessionStorage.getItem('user'));
   const token = user.access_token;
   const [cmt, setCmt] = useState('');
   const [showPicker, setShowPicker] = useState(false);
   const onEmojiClick = (event, emojiObject) => {
      setCmt((prevInput) => prevInput + emojiObject.emoji);
      setShowPicker(false);
   };

   const postComment = () => {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);
      var raw = JSON.stringify({
         content: cmt,
         userId: userID,
         postId: postID,
      });

      var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: raw,
         redirect: 'follow',
      };

      fetch(`${API_URL}comment`, requestOptions)
         .then((response) => response.text())
         .then((result) => {
            const payload = JSON.parse(result).data;
            setCmts([{ ...payload }, ...cmts]);
            stompClient.send(`/app/sendNotification`, {}, JSON.stringify(payload.notificationPayload));
            // setReload(true);
         })
         .catch((error) => console.log('error', error));
   };

   const handleCmt = (e) => {
      e.preventDefault();

      if (cmt.trim() !== '') {
         postComment();
         setCmt('');
      } else {
         setCmt('');
      }
   };
   return (
      <>
         <form>
            <div className="cmt-post flex gap-2 mt-2 pt-2 border-t border-black/10">
               <div className="main-cmt-post w-full flex relative justify-center ">
                  <button>
                     <BsEmojiSmile
                        className="emoji-icon w-7 h-7 p-1 hover:bg-black/10 rounded-full"
                        onClick={(e) => {
                           e.preventDefault();
                           setShowPicker((val) => !val);
                        }}
                     />
                  </button>
                  {showPicker ? (
                     <Picker
                        disableSearchBar={true}
                        pickerStyle={{
                           width: '70%',
                           left: '0%',
                           bottom: '100%',
                           position: 'absolute',
                           zIndex: '1',
                        }}
                        onEmojiClick={onEmojiClick}
                     />
                  ) : null}
                  <TextareaAutosize
                     maxRows={3}
                     value={cmt}
                     placeholder="Add a comment..."
                     onChange={(e) => setCmt(e.target.value)}
                     className="w-full outline-none rounded resize-none text-sm py-1 pl-2"
                  />
                  <button onClick={handleCmt} className="text-sm font-semibold text-black px-2">
                     Post
                  </button>
               </div>
            </div>
         </form>
      </>
   );
};

export default Commentbox;
