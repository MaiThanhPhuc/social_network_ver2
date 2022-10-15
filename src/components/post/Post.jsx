import {useEffect, useState} from "react";
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import {FaRegComment, FaRegShareSquare, FaRegFlag} from "react-icons/fa";
import {BsThreeDots} from "react-icons/bs";
import {format} from "timeago.js";
import userService from "../../Services/user.service";
import CommentBox from "./CommentBox";
import CommentLoad from "./CommentLoad";
import Report from "./Report";
import Share from "./Share";
import avatarDefault from "../../Resource/Image/avatar.png";
import {Link} from "react-router-dom";
import PostShare from "./PostShare";
import CarouselPost from "./CarouselPost";

const Post = ({postData, stompClient, setPosts, posts}) => {
  const [like, setLike] = useState(postData.countLiked);
  const [isLike, setIsLike] = useState(postData.liked);
  const [showReport, setShowReport] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [hasMoreCmt, setHasMoreCmt] = useState(true);
  const [page, setPageCmt] = useState(0);
  const [cmts, setCmts] = useState([]);
  const [load, setLoad] = useState(false);
  const [reload, setReload] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const Id = user.userId;
  const handleLike = () => {
    if (isLike) {
      setIsLike(false);
      if (like !== 0) {
        setLike(like - 1);
      }
    } else {
      setIsLike(true);
      setLike(like + 1);
    }
    setLikeApi();
  };

  const fetchDataComment = async () => {
    await userService
      .getComment(postData.id, page)
      .then((res) => {
        setCmts([...cmts, ...res]);
        setReload(false);
        setPageCmt(page + 1);
        if (res.length < 2) {
          setHasMoreCmt(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDataComment();
  }, [reload]);

  useEffect(() => {
    if (cmts.length !== 0) {
      setLoad(true);
    }
  }, [cmts]);
  // ////////////////////////////////////////
  const setLikeApi = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${user.access_token}`);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://socialnetwork999.herokuapp.com/api/post/like?userId=${Id}&postId=${postData.id}`,
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
        setReload(true);
      })
      .catch((error) => console.log("error", error));
  };

  const handleDeletePost = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${user.access_token}`);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://socialnetwork999.herokuapp.com/api/post/${postData.id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setPosts(posts.filter((tmp) => tmp !== postData));
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <div className="bg-white flex flex-col py-2 rounded gap-[4px] mb-6 ">
        <div className="top-post mx-4">
          <div className="flex justify-between">
            <div className="heading-avatar flex items-center">
              <button className="avatar">
                <div className="w-9 rounded-full">
                  <img
                    src={
                      postData.userCreate.imageUrl !== null
                        ? postData.userCreate.imageUrl
                        : avatarDefault
                    }
                    alt={postData.userCreate.firstName}
                  />
                </div>
              </button>
              <div className="box-left flex flex-col ml-2 ">
                <Link
                  to={
                    `${postData.userCreate.id}` === Id
                      ? "/user"
                      : `user/${postData.userCreate.id}`
                  }
                  className="user-name text-black font-semibold cursor-pointer"
                >
                  {postData.userCreate.firstName}
                </Link>
                <span className="text-grayText text-xs font-semibold">
                  {format(postData.createTime)}
                </span>
              </div>
            </div>
            {`${postData.userCreate.id}` !== Id ? null : (
              <div className="div">
                <div className="dropdown dropdown-left">
                  <label tabIndex="0">
                    <button className="w-7 h-7 hover:bg-grayLight focus:bg-grayLight rounded-full flex justify-center items-center">
                      <BsThreeDots />
                    </button>
                  </label>
                  <ul
                    tabIndex="0"
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-28"
                  >
                    <li>
                      <Link
                        to={`/post/editpost/${postData.id}`}
                        className=" text-sm active:bg-primaryblue/50 p-2 text-black"
                      >
                        Edit post
                      </Link>
                    </li>
                    <li>
                      <a
                        onClick={handleDeletePost}
                        className=" text-sm active:bg-primaryblue/50 p-2 text-red"
                      >
                        Delete post
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="tile-post mt-4 ">
            <span className="text-black text-base">{postData.content}</span>
          </div>
        </div>

        <div className="post-image flex justify-center rounded ">
          {postData.images[0] !== undefined ? (
            <CarouselPost images={postData.images} />
          ) : null}
        </div>
        <div className="post-share flex justify-center rounded">
          {postData.postShared != null ? (
            <PostShare postData={postData.postShared} />
          ) : null}
        </div>
        <div className="bottom-post mx-4 ">
          <div className="react-post flex justify-between text-2xl mt-2 ">
            <div className="left flex gap-2 w-fit ">
              <button onClick={handleLike} className="like-post">
                <AiOutlineHeart className={isLike && "hidden"} />
                <AiFillHeart
                  style={{color: "red"}}
                  className={!isLike && "hidden"}
                />
              </button>
              <button className="cmt-post" onClick={() => {}}>
                <FaRegComment className="hover:text-black/50" />
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="share-post"
              >
                <FaRegShareSquare className="hover:text-black/50" />
              </button>

              {showShareModal ? (
                <Share
                  postData={postData}
                  stompClient={stompClient}
                  setShowShareModal={setShowShareModal}
                />
              ) : null}
            </div>
            {`${postData.userId}` === Id ? null : (
              <div className="right ">
                <button
                  onClick={() => setShowReport(true)}
                  className="report-post"
                >
                  <FaRegFlag className="hover:text-black/50" />
                </button>
                {showReport ? (
                  <Report postID={postData.id} setShowReport={setShowReport} />
                ) : null}
              </div>
            )}
          </div>

          <div className="count-react mb-2">
            <span className="font-bold text-[13px]"> {like} Likes</span>
          </div>

          {load
            ? cmts.map((cmt, index) => (
                <CommentLoad key={index} cmtData={cmt} />
              ))
            : null}

          {hasMoreCmt ? (
            <div className="count-react mb-2">
              <button
                onClick={() => {
                  fetchDataComment();
                }}
                className=" font-semibold text-sm hover:cursor-pointer hover:underline text-primaryblue"
              >
                View more comment
              </button>
            </div>
          ) : null}

          <CommentBox
            stompClient={stompClient}
            userID={Id}
            postID={postData.id}
            setReload={setReload}
            setCmts={setCmts}
            cmts={cmts}
          />
        </div>
      </div>
    </>
  );
};

export default Post;
