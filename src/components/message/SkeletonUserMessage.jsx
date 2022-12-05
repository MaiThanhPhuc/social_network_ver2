import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonUserMessage = ({ users }) => {
   return (
      <>
         {Array(users)
            .fill(0)
            .map((item, i) => (
               <div key={i} className="flex w-full rounded border-gray px-3 ">
                  <div className=" w-full bg-grayLight/30 p-1 rounded gap-2 flex items-center">
                     <Skeleton width={50} height={50} circle={true} />
                     <div className="flex w-[200px] flex-col">
                        <Skeleton />
                        <Skeleton />
                     </div>
                  </div>
               </div>
            ))}
      </>
   );
};

export default SkeletonUserMessage;
