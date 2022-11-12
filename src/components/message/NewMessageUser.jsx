import {Link} from "react-router-dom";
import avatarDefault from "../../Resource/Image/avatar.png";

const NewMessageUser = ({dataUser}) => {
  return (
    <>
      {dataUser !== undefined ? (
        <Link
          to={`/inbox/${dataUser.id}`}
          className="user-items cursor-pointer flex items-center hover:bg-grayLight rounded px-4 py-2"
        >
          <button className="avatar">
            <div className="w-12 rounded-full">
              <img
                src={
                  dataUser.imageUrl != null ? dataUser.imageUrl : avatarDefault
                }
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

export default NewMessageUser;
