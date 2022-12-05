import messageImg from '../../Resource/Image/messageImage.png';

const NoneConversation = () => {
   return (
      <>
         <div className=" flex flex-col justify-center items-center w-[560px]  h-full">
            <img src={messageImg} className="w-[150px] mb-2" alt="image_message" />
            <span className=" text-lg font-semibold text-black mb-4">Message someone and chat right now!</span>
         </div>
      </>
   );
};

export default NoneConversation;
