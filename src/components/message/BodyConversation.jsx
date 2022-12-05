import Message from './Message';

const BodyConversation = ({ messages, handleMoreMess, scrollRef, hasMore, loading }) => {
   return (
      <>
         {hasMore ? (
            <div
               onClick={handleMoreMess}
               className="text-center cursor-pointer text-black font-medium text-sm hover:underline"
            >
               View more old message
            </div>
         ) : null}
         {messages
            ? messages?.map((item, index) => (
                 <div key={index} ref={scrollRef}>
                    <Message key={index} data={item} />
                 </div>
              ))
            : null}
      </>
   );
};

export default BodyConversation;
