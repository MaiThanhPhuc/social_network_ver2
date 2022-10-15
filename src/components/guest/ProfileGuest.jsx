import {useState} from "react";
import avatarDefault from "../../Resource/Image/avatar.png";
import {MdOutlineReportProblem} from "react-icons/md";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BsPerson} from "react-icons/bs";
import {Link} from "react-router-dom";
const ProfileGuest = ({stompClient, userData}) => {
  const [follow, setFollow] = useState(userData.follow);
  const [follower, setFollower] = useState(userData.countFollower);
  const temp = JSON.parse(localStorage.getItem("user"));
  const Id = temp.userId;
  const handleFollow = () => {
    if (follow) {
      setFollow(false);
      setFollower(follower - 1);
    } else {
      setFollow(true);
      setFollower(follower + 1);
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${temp.access_token}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://socialnetwork999.herokuapp.com/api/user/follow?userId=${Id}&userFollowedId=${userData.id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const payload = JSON.parse(result);
        stompClient.send(
          `/app/sendNotification`,
          {},
          JSON.stringify(payload.data)
        );
      })
      .catch((error) => console.log("error", error));
  };

  const handleReportUser = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${temp.access_token}`);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://socialnetwork999.herokuapp.com/api/report/user/${userData.id}`,
      requestOptions
    )
      .then(() => {
        toast.success(
          "Your feedback is important in helping us keep the us community safe",
          {
            position: "bottom-center",
            autoClose: 3000,
            theme: "dark",
          }
        );
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div className="bg-white mb-4 flex flex-col items-center rounded py-8 gap-6">
        <div className="heading-profile flex flex-col justify-center items-center gap-3 ">
          <div className="avatar ">
            <div className="w-UserAvatar rounded-full hover:cursor-pointer">
              <img
                alt="anh"
                src={
                  userData.imageUrl !== null ? userData.imageUrl : avatarDefault
                }
                className="hover:bg-white"
              />
            </div>
          </div>
          <div className="name-user">
            <h1 className="font-bold text-black text-xl">
              {userData.firstName + " " + userData.lastName}
            </h1>
          </div>
        </div>
        <div className="border border-b w-5/6 border-grayLight"></div>
        <div className="info-user flex flex-col justify-center items-center w-5/6 gap-2">
          <div className="from-box flex justify-between w-full">
            <h3 className="label-info font-semibold text-sm">Email</h3>
            <span className="content-info text-grayText font-medium text-sm">
              {userData.email}
            </span>
          </div>
          <div className="from-box flex justify-between w-full">
            <h3 className="label-info font-semibold text-sm">Address</h3>
            <span className="content-info text-grayText font-medium text-sm">
              {userData.address}
            </span>
          </div>
          <div className="bio-box flex justify-between w-full">
            <h3 className="label-info font-semibold text-sm">Gender</h3>
            <span className="content-info text-grayText font-medium text-sm w-2/3 text-right">
              {userData.gender == 0 ? "Male" : "Female"}
            </span>
          </div>
          <div className="bio-box flex justify-between w-full">
            <h3 className="label-info font-semibold text-sm">Date of birth</h3>
            <span className="content-info text-grayText font-medium text-sm w-2/3 text-right">
              {userData.birthDay}
            </span>
          </div>
          <div className="bio-box flex justify-between w-full">
            <h3 className="label-info font-semibold text-sm">Bio</h3>
            <span className="content-info text-grayText font-medium text-sm w-2/3 text-right">
              {userData.bio}
            </span>
          </div>
        </div>
        <div className="flex gap-9">
          <div className="flex py-2 px-2  rounded-lg text-black items-center ">
            <h3 className="label-info font-semibold  text-sm">Follower:</h3>
            <span className=" font-medium text-sm mx-1 ">{follower}</span>
            <BsPerson />
          </div>
          <div className="flex py-2 px-2  rounded-lg text-black items-center ">
            <h3 className="label-info font-semibold text-sm">Following:</h3>
            <span className=" font-medium mx-1  text-sm">
              {userData.countFollowing}
            </span>
            <BsPerson />
          </div>
        </div>

        <div className=" w-5/6 flex justify-evenly items-center  ">
          {follow ? (
            <button
              onClick={handleFollow}
              className=" w-2/5 outline outline-1 hover:bg-black/10 rounded px-2 py-[6px] text-[13px] font-semibold text-black "
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className=" w-2/5 bg-primaryblue hover:bg-primaryblue/80 text-center rounded px-2 py-[6px] text-[13px] font-semibold text-white "
            >
              Follow
            </button>
          )}
          <Link
            to={`/inbox/${userData.id}`}
            className=" w-2/5 bg-primaryblue text-center hover:bg-primaryblue/80 rounded px-2 py-[6px] text-[13px] font-semibold text-white"
          >
            Chat
          </Link>
          <a
            href="#my-modal"
            className="hover:bg-grayLight p-1 rounded-full text-[13px] cursor-pointer font-semibold text-black"
          >
            <MdOutlineReportProblem size={22} />
          </a>
        </div>
      </div>
      {/* modal */}
      <div className="modal" id="my-modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Does this go against our Community Standards?
          </h3>
          <p className="py-3">
            Our standards explain what we do and don't allow on here. We review
            and update our standards regularly, with the help of experts.
          </p>
          <div className="modal-action">
            <a
              href="#"
              className="py-2 px-3 hover:bg-grayLight border border-black/70 text-sm rounded-lg font-medium"
            >
              Cancle
            </a>
            <a
              href="#"
              onClick={handleReportUser}
              className=" cursor-pointer py-2 px-3 hover:bg-primaryblue/80 bg-primaryblue text-white text-sm rounded-lg font-medium"
            >
              Report
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileGuest;
