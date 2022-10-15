import {useState, useRef} from "react";
import {useFormik} from "formik";
import userService from "../../Services/user.service";
import avatarDefault from "../../Resource/Image/avatar.png";
import {toast} from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import {useOutletContext} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const Edit_Profile = () => {
  const [userData, setLoad] = useOutletContext();
  const [avatar, setAvatar] = useState(userData.imageUrl);
  const [file, setFile] = useState();
  const [showAvatarModal, setshowAvatarModal] = useState(false);
  const toastId = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChangeAvatar = () => {
    notify();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${user.access_token}`);

    var formdata = new FormData();
    formdata.append("userId", userData.id);
    formdata.append("img", file);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://socialnetwork999.herokuapp.com/api/user/upimg",
      requestOptions
    )
      .then(() => {
        updateNoti();
        localStorage.setItem("userImgUrl", avatar);
        setLoad(true);
      })
      .catch((error) => console.log("error", error));
  };
  const notify = () =>
    (toastId.current = toast("Upload in progress, please wait...", {
      autoClose: false,
      theme: "dark",
    }));
  const updateNoti = () =>
    toast.update(toastId.current, {
      render: "Update photo success",
      autoClose: 4000,
      theme: "dark",
    });
  const handlePreviewImages = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const formik = useFormik({
    initialValues: {
      fname: userData.firstName,
      lname: userData.lastName,
      birth: userData.birthDay,
      address: userData.address,
      bio: userData.bio,
    },
    onSubmit: (values) => {
      userService
        .updateUser(
          userData.id,
          values.fname,
          values.lname,
          values.bio,
          values.address,
          values.birth
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("Update Infomation success!", {
              position: "bottom-center",
              autoClose: 3000,
              theme: "dark",
            });
            setLoad(true);
            localStorage.setItem("userName", values.lname + " " + values.fname);
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <>
      <form>
        <div className="bg-white rounded h-[600px] ">
          <div className="flex flex-col gap-6 py-8">
            <div className="avatar-change flex items-center ">
              <div className="avatar w-1/4 flex justify-end">
                <div className="w-9 rounded-full">
                  <img
                    src={
                      userData.imageUrl !== null
                        ? userData.imageUrl
                        : avatarDefault
                    }
                    alt="avatar"
                  />
                </div>
              </div>
              <div className="user-name-change-avatar ml-8">
                <h2 className="font-semibold text-lg leading-[20px] mb-1">
                  {userData.lastName + " " + userData.firstName}
                </h2>
                <p
                  onClick={() => setshowAvatarModal(true)}
                  className="font-semibold text-sm leading-3 text-primaryblue hover:cursor-pointer "
                >
                  Change Profile Photo
                </p>
              </div>
            </div>

            <div className="items-edit-user-name flex w-full ">
              <label htmlFor="fname" className="font-semibold text-right w-1/4">
                First Name
              </label>
              <input
                type="text"
                name="fname"
                value={formik.values.fname}
                onChange={formik.handleChange}
                className="pl-2 py-1 border border-black/20 rounded w-1/6 ml-8 text-sm"
                id="fname"
              />
              <label htmlFor="lname" className="font-semibold text-right ml-5">
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                value={formik.values.lname}
                onChange={formik.handleChange}
                className="pl-2 py-1 border border-black/20 rounded w-1/6 ml-4 text-sm"
                id="lname"
              />
            </div>
            <div className="items-edit-user-from flex ">
              <label
                htmlFor="address"
                className="font-semibold text-right w-1/4"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                className="pl-2 py-1 border text-sm border-black/20 rounded w-2/4 ml-8"
                id="address"
              />
            </div>
            <div className="items-edit-user-from flex ">
              <label htmlFor="birth" className="font-semibold text-right w-1/4">
                Birthday
              </label>
              <input
                type="date"
                name="birth"
                value={formik.values.birth}
                onChange={formik.handleChange}
                className="pl-2 py-1 text-sm border border-black/20 rounded w-2/4 ml-8"
                id="birth"
              />
            </div>
            <div className="items-edit-user-bio flex ">
              <label htmlFor="bio" className="font-semibold text-right w-1/4">
                Bio
              </label>

              <TextareaAutosize
                maxLength={100}
                id="bio"
                name="bio"
                maxRows={3}
                value={formik.values.bio}
                onChange={formik.handleChange}
                className="w-2/4 border border-black/20 rounded ml-8 resize-none text-sm py-2 pl-2"
              />
            </div>

            <div className="btn-edit-user flex">
              <div className="w-1/4 mr-8"></div>
              <button
                type="submit"
                onClick={formik.handleSubmit}
                className="px-6 btn text-right btn-sm btn-primary normal-case text-white"
              >
                Save Change
              </button>
            </div>
          </div>
        </div>
      </form>

      {showAvatarModal ? (
        <div className="modal visible opacity-100 pointer-events-auto">
          <div className="modal-box w-avatarPreviewWidth relative max-w-7xl py-4 px-6">
            <div className="flex flex-col justify-center items-center gap-4">
              <h3 className="text-xl font-semibold text-black">
                Update profile picture
              </h3>
              <div className="border-b border-black/20 w-full "></div>
              <div className="rounded-full my-4 relative group ">
                <label htmlFor="media">
                  <img
                    src={avatar}
                    alt="img"
                    className="rounded-full w-[300px] h-[300px] cursor-pointer object-cover"
                  />
                  <input
                    type="file"
                    id="media"
                    name="media"
                    accept="image/*"
                    className="mt-4 hidden "
                    onChange={handlePreviewImages}
                  />
                </label>
                <div className="opacity-0 group-hover:opacity-100 duration-300 absolute inset-x-0 bottom-0 flex justify-center items-center text-base text-black bg-white/70 font-semibold h-[40px]">
                  Select image
                </div>
              </div>
              <div className="flex w-full justify-end">
                <button
                  onClick={() => setshowAvatarModal(false)}
                  className="px-8 text-base text-black rounded hover:bg-black/10 py-1 border-black border mr-4"
                >
                  Close
                </button>
                <button
                  onClick={handleChangeAvatar}
                  className="px-8 bg-primaryblue text-base text-white rounded py-1 hover:bg-primaryblue/90"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Edit_Profile;
