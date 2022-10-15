import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonPost = ({posts}) => {
  return (
    <>
      {Array(posts)
        .fill(0)
        .map((item, i) => (
          <div
            key={i}
            className="skeleton-post text-left px-4 pb-4 bg-white/70 rounded mb-4"
          >
            <div className="avatar  py-2">
              <Skeleton circle width={40} height={40} />
            </div>
            <div className="tile ">
              <Skeleton count={2} />
            </div>
            <div className="image ">
              <Skeleton height={200} />
            </div>
          </div>
        ))}
    </>
  );
};

export default SkeletonPost;
