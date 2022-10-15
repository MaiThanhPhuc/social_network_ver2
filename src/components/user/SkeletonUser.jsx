import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonUser = () => {
  return (
    <>
      <div className="flex flex-col items-center ">
        <div className="skeleton-post px-4  pb-4 bg-white/70 rounded mb-4 w-footerWidth">
          <div className=" py-2 flex flex-col items-center justify-center aspect-[4/3]">
            <Skeleton circle width={120} height={120} />
            <div className="  mt-2">
              <Skeleton width={150} height={30} />
            </div>
          </div>

          <div className=" px-4">
            <Skeleton count={6} style={{marginBottom: 10}} />
          </div>
          <div className="flex px-4 justify-between">
            <Skeleton width={120} />
            <Skeleton width={120} />
          </div>
          <div className="flex px-4 justify-between">
            <Skeleton width={100} height={35} />
            <Skeleton width={100} height={35} />
            <Skeleton width={35} height={35} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonUser;
