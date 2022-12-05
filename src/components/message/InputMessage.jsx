import { BiCamera, BiHappy } from 'react-icons/bi';
import TextareaAutosize from 'react-textarea-autosize';
import { IoSend } from 'react-icons/io5';
import { useState } from 'react';
import Picker from 'emoji-picker-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_URL = process.env.REACT_APP_BASE_URL;
const defaultAvatar = 'https://i.ibb.co/98bxbqS/avatar.png';

const InputMessage = ({ stompClient, setScroll, messages, setMessages, receiID }) => {
   const [newMessage, setNewMessage] = useState('');
   const user = JSON.parse(localStorage.getItem('user'));
   const userName = localStorage.getItem('userName');
   const avatar = localStorage.getItem('userImgUrl');
   const [showPicker, setShowPicker] = useState(false);
   const onEmojiClick = (event, emojiObject) => {
      setNewMessage((prevInput) => prevInput + emojiObject.emoji);
      setShowPicker(false);
   };
   const sendMessageAPI = () => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${user.access_token}`);

      var formdata = new FormData();
      formdata.append('senderId', user.userId);
      formdata.append('receiverId', receiID);
      formdata.append('message', newMessage);

      var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: formdata,
         redirect: 'follow',
      };

      fetch(`${API_URL}message`, requestOptions)
         .then((response) => response.text())
         .then((result) => {
            const payload = JSON.parse(result).data;
            payload.senderAvatar = avatar === 'null' ? defaultAvatar : avatar;
            payload.fullName = userName;
            stompClient.send(`/app/sendMessage`, {}, JSON.stringify(payload));
            setMessages([...messages, { ...payload }]);
            setScroll(true);
         })
         .catch((error) => {
            console.log('error', error);
         });
   };

   const handleSubmitInput = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         if (newMessage.trim() !== '') {
            sendMessageAPI();
            setNewMessage('');
         }
      }
   };

   const handleSubmitButton = (e) => {
      e.preventDefault();
      if (newMessage.trim() !== '') {
         sendMessageAPI();
         setNewMessage('');
      }
   };
   const handleSentFile = (file) => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${user.access_token}`);

      var formdata = new FormData();
      formdata.append('senderId', user.userId);
      formdata.append('receiverId', receiID);
      formdata.append('files', file);

      var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: formdata,
         redirect: 'follow',
      };

      fetch(`${API_URL}message`, requestOptions)
         .then((response) => response.text())
         .then((result) => {
            const payload = JSON.parse(result).data;
            console.log(payload);
            payload.senderAvatar = avatar === 'null' ? defaultAvatar : avatar;
            payload.fullName = userName;
            stompClient.send(`/app/sendMessage`, {}, JSON.stringify(payload));
            setMessages([...messages, { ...payload }]);
            setScroll(true);
         })
         .catch((error) => {
            console.log('error', error);
         });
   };
   const handleInputfile = (event) => {
      if (event.target.files[0].size < 209715002) {
         handleSentFile(event.target.files[0]);
      } else {
         toast('Your file is too big. Limit <= 20MB', {
            position: 'bottom-center',
            autoClose: 3000,
            theme: 'dark',
         });
      }
   };

   return (
      <>
         <form action="" className="">
            <div className="chat-input flex w-full items-center absolute gap-2 px-4 bottom-0 py-4 border-t border-black/20">
               <div className="btn-photo-sticker flex text-2xl ">
                  <div
                     onClick={(e) => {
                        e.preventDefault();
                        setShowPicker((val) => !val);
                     }}
                     className="ticker-btn rounded-full p-1 hover:bg-grayLight"
                  >
                     <BiHappy />
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
                  </div>
               </div>
               <div className="btn-photo-sticker flex text-2xl ">
                  <label htmlFor="file" className="ticker-btn rounded-full p-1 hover:bg-grayLight">
                     <BiCamera />
                  </label>
                  <input onChange={handleInputfile} id="file" type="file" className="hidden" />
               </div>
               <TextareaAutosize
                  maxRows={2}
                  placeholder="Type something..."
                  onChange={(e) => {
                     setNewMessage(e.target.value);
                  }}
                  value={newMessage}
                  onKeyPress={handleSubmitInput}
                  className="w-full outline-none border border-black/30 rounded-[22px] resize-none text-sm py-2 px-4"
               />
               <button
                  onClick={handleSubmitButton}
                  className="btn-send text-xl hover:text-primaryblue/70 text-primaryblue p-1"
               >
                  <IoSend />
               </button>
            </div>
         </form>
      </>
   );
};

export default InputMessage;
