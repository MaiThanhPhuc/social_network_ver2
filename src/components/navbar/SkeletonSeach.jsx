import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonSeach = ({ users }) => {
   return (
      <>
         <div className="absolute shadow bg-grayLight z-40 w-full top-[40px] lef-0 rounded max-h-[400px] overflow-y-auto ">
            <div className=" flex flex-col w-full">
               {Array(users)
                  .fill(0)
                  .map((item, i) => (
                     <div key={i} className="flex w-full rounded border-gray ">
                        <div className=" w-full bg-white p-1 rounded gap-2 flex items-center">
                           <Skeleton width={32} height={32} circle={true} />
                           <div className="flex w-[200px] flex-col">
                              <Skeleton width={100} />
                              <Skeleton width={200} />
                           </div>
                        </div>
                     </div>
                  ))}
            </div>
         </div>
      </>
   );
};

export default SkeletonSeach;
