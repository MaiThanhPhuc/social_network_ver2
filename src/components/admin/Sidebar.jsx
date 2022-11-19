import {useEffect, useState} from "react";
import {AiOutlineDashboard, AiOutlineUser} from "react-icons/ai";
import {TbReportAnalytics} from "react-icons/tb";
import {BsFilePostFill} from "react-icons/bs";
import {MdOutlineExitToApp, MdOutlineHome} from "react-icons/md";
import {useLocation, Link} from "react-router-dom";
import avatarDefault from "../../Resource/Image/avatar.png";
import authService from "../../Services/auth.service";
import {toast} from "react-toastify";

const sidebarItems = [
  {
    display: "Dashboard",
    to: "/admin",
    icons: <AiOutlineDashboard />,
    section: "",
  },
  {
    display: "User",
    icons: <AiOutlineUser />,
    to: "user",
    section: "/user",
  },
  {
    display: "Post",
    icons: <BsFilePostFill />,
    to: "posts",
    section: "/posts",
  },
  {
    display: "Report Posts",
    icons: <TbReportAnalytics />,
    to: "report/posts",
    section: "/report/posts",
  },
  {
    display: "Report Users",
    icons: <TbReportAnalytics />,
    to: "report/users",
    section: "/report/users",
  },
];

const Sidebar = ({dataAdmin}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const curPath = window.location.pathname.split("/admin")[1];
    const activeItem = sidebarItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const handleSignOut = () => {
    toast("See you later!", {
      position: "bottom-center",
      autoClose: 3000,
      theme: "dark",
    });
    authService.logout();
    window.location.href = "/login";
  };

  return (
    <div
      className="h-screen w-[250px] bg-[#93B5C6] border-r border-black/10 fixed top-0
    left-0 "
    >
      <div className="menu-edit-user flex flex-col p-2 gap-4">
        <div className="heading font-bold cursor-pointer text-xl text-center py-6 text-black ">
          Admin Management
        </div>
        <div className="menu-items flex flex-col gap-4 px-4 shadow bg-white py-4 rounded">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`flex p-3 items-center w-full rounded-xl gap-2 cursor-pointer  ${
                activeIndex === index
                  ? "bg-black text-white"
                  : "text-black hover:bg-grayLight"
              }  `}
            >
              <span className="text-xl ">{item.icons}</span>
              <span className="font-semibold text-base">{item.display}</span>
            </Link>
          ))}
        </div>
        <div className="bottom flex flex-col items-center mt-1 bg-white shadow py-4 rounded ">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img
                src={
                  dataAdmin.imageUrl !== null
                    ? dataAdmin.imageUrl
                    : avatarDefault
                }
              />
            </div>
          </div>
          <div className=" text-lg font-semibold text-black">
            {dataAdmin.lastName + " " + dataAdmin.firstName}
          </div>
          <div className=" text-sm font-semibold text-black/50 mb-8 mt-2">
            {dataAdmin.email}
          </div>
          <div className="flex gap-6 ">
            <Link
              to={"/"}
              className="p-2 hover:bg-gray rounded text-xl border border-black/20"
            >
              <MdOutlineHome />
            </Link>
            <button
              onClick={handleSignOut}
              className="p-2 hover:bg-gray rounded text-xl border border-black/20"
            >
              <MdOutlineExitToApp />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
