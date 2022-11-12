import {useEffect, useState} from "react";
import avatarDefault from "../../Resource/Image/avatar.png";
import {Link, useParams, useLocation} from "react-router-dom";

const UserItems = ({dataUser}) => {
  const params = useParams();
  let receiverID = params.receiveID;

  const [activeIndex, setActiveIndex] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const curPath = window.location.pathname.split("/inbox/")[1];
    setActiveIndex(curPath == dataUser.id ? true : false);
  }, [location]);

  return (
    <>
      {dataUser !== undefined ? (
        <Link
          to={`/inbox/${dataUser.id}`}
          className={`user-item cursor-pointer flex items-cente rounded px-4 py-2 ${
            activeIndex ? "bg-grayLight" : "hover:bg-grayLight"
          } `}
        >
          <button className="avatar">
            <div className="w-12 rounded-full">
              <img
                src={dataUser.avatar != null ? dataUser.avatar : avatarDefault}
              />
            </div>
          </button>
          <div className="box-left flex flex-col ml-2">
            <a className="user-name text-black font-semibold ">
              {dataUser.lastName + " " + dataUser.firstName}
            </a>
            <span className="text-grayText text-xs font-semibold">
              {dataUser.email}
            </span>
          </div>
        </Link>
      ) : null}
    </>
  );
};

export default UserItems;
