import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonFollowUser = ({ users }) => {
   return (
      <>
         {Array(users)
            .fill(0)
            .map((item, i) => (
               <div key={i} className="flex w-full rounded border-gray ">
                  <div className=" w-full bg-grayLight/30 p-3 rounded gap-2 flex items-center">
                     <Skeleton width={50} height={50} />
                     <div className="flex w-[200px] flex-col">
                        <Skeleton width={150} />
                        <Skeleton width={150} />
                     </div>
                     <Skeleton width={70} height={30} />
                  </div>
               </div>
            ))}
      </>
   );
};

export default SkeletonFollowUser;
