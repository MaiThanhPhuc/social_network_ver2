import avatarDefault from '../../Resource/Image/avatar.png';
import { format } from 'timeago.js';

const CommentLoad = ({ cmtData }) => {
   return (
      <>
         <div className="cmt-post flex gap-2 mb-2">
            <button className="avatar">
               <div className="w-9 rounded-full">
                  <img src={cmtData.userCmt.urlImage !== null ? cmtData.userCmt.urlImage : avatarDefault} />
               </div>
            </button>
            <div className="main-cmt-post">
               <div className="cmt-box bg-grayLight rounded px-2 py-1  ">
                  <div className="heading-cmt">
                     <span className="text-[13px] font-semibold">
                        {cmtData.userCmt.lastName + ' ' + cmtData.userCmt.firstName}
                     </span>
                  </div>
                  <div className="content-cmt text-[13px] max-h-[500px] h-auto overflow-y-auto mb-1 ">
                     <p className="break-all">{cmtData.content}</p>
                  </div>
               </div>
               <div className="info-cmt-post text-xs ">
                  <span>{format(cmtData.createTime)}</span>
               </div>
            </div>
         </div>
      </>
   );
};

export default CommentLoad;
