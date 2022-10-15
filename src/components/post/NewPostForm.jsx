import React, {useState, useRef} from "react";
import {FaPhotoVideo} from "react-icons/fa";
import Footer from "../footer/Footer";
import Picker from "emoji-picker-react";
import TextareaAutosize from "react-textarea-autosize";
import {BsEmojiSmile} from "react-icons/bs";
import userService from "../../Services/user.service";
import {toast} from "react-toastify";
import Carousel from "./Carousel";
import "react-toastify/dist/ReactToastify.css";
import PolicyPost from "../footer/PolicyPost";

const NewPostForm = ({Avatar}) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const toastId = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.access_token;
  const Id = user.userId;
  const onEmojiClick = (event, emojiObject) => {
    setContent((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const handlePreviewImages = (e) => {
    if (e.target.files) {
      setFiles(e.target.files);
      const imagesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setImages((img) => img.concat(imagesArray));
      Array.from(e.target.files).map((img) => URL.revokeObjectURL(img));
    }
  };

  const newPostApi = async () => {
    await userService
      .newPost(content, Id)
      .then((res) => {
        if (images[0] !== undefined) {
          Array.from(files).map((file) => addImagePost(res.data.data.id, file));
          updateNoti();
        } else {
          updateNoti();
          setContent("");
        }
      })
      .catch((err) => console.log(err));
  };
  const notify = () =>
    (toastId.current = toast.loading("Upload in progress, please wait...", {
      autoClose: false,
      theme: "dark",
    }));
  const updateNoti = () =>
    toast.update(toastId.current, {
      render: "Post Success",
      autoClose: 2000,
      isLoading: false,
      theme: "dark",
    });
  const updateFailedNoti = () =>
    toast.update(toastId.current, {
      render: "Post failed please try again ",
      autoClose: 3000,
      isLoading: false,
      theme: "dark",
    });

  const addImagePost = async (ID, file) => {
    var formdata = new FormData();
    var myHeaders = new Headers();
    formdata.append("img", file);
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `https://socialnetwork999.herokuapp.com/api/post/upImg?postId=${ID}`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) {
          setContent("");
          setImages([]);
          setFiles([]);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() !== "" || images[0] !== undefined) {
      notify();
      newPostApi();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 justify-center">
          <div className="w-postWidth h-newpostHeight">
            <div className="bg-white flex rounded flex-col py-4 px-7 gap-2">
              <div className="heading">
                <h2 className="text-black font-bold text-xl mb-2">
                  Create a post
                </h2>
              </div>
              <div className="user flex items-center">
                <button className="avatar">
                  <div className="w-8 rounded-full">
                    <img src={Avatar} alt="avatar" />
                  </div>
                </button>
                <div className="user-name text-black font-semibold ml-2">
                  {localStorage.getItem("userName")}
                </div>
              </div>
              <div className="input-title flex rounded bg-grayLight">
                <TextareaAutosize
                  maxRows={3}
                  value={content}
                  placeholder="Write a caption"
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full outline-none  resize-none text-sm py-2 px-2 rounded bg-grayLight"
                ></TextareaAutosize>
                <div className=" w-1/8 px-1 relative hover:bg-black/10 flex cursor-pointer items-center">
                  <BsEmojiSmile
                    className="emoji-icon w-8 h-9 p-2  rounded-full"
                    onClick={() => setShowPicker((val) => !val)}
                  />
                  {showPicker ? (
                    <Picker
                      disableSearchBar={true}
                      pickerStyle={{
                        width: "300px",
                        left: "120%",
                        top: "0",
                        position: "absolute",
                        zIndex: "1",
                      }}
                      onEmojiClick={onEmojiClick}
                    />
                  ) : null}
                </div>
              </div>
              <div className="input-file rounded flex flex-col justify-center items-center gap-3 bg-grayLight h-[500px]">
                {images[0] === undefined ? (
                  <div className=" flex flex-col justify-center items-center gap-3">
                    <div className="icons text-black">
                      <FaPhotoVideo size={62} />
                    </div>
                    <span className="text-black text-lg ">
                      Insert photo here
                    </span>
                    <div className="button-choosefile ">
                      <label className="btn btn-primary text-white text-sm normal-case btn-sm rounded">
                        Select from your computer
                        <input
                          multiple
                          type="file"
                          name="media"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePreviewImages}
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <Carousel
                    imageUrls={images}
                    setImages={setImages}
                    files={files}
                    setFiles={setFiles}
                    show={true}
                  />
                )}
              </div>

              <div className="btn-post flex justify-end">
                <button
                  type="submit"
                  className="mt-2 btn btn-primary normal-case text-white btn-sm px-8 "
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div className="w-footerWidth">
            <PolicyPost />
            <Footer />
          </div>
        </div>
      </form>
    </>
  );
};

export default NewPostForm;
