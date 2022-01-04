import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import InputOptions from "./InputOptions";
import "./Post.css";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import ShareIcon from "@mui/icons-material/Share";

const Post = forwardRef(({ name, description, message, photoUrl }, ref) => {
  return (
    <div ref={ref} className="post">
      <div className="post_header">
        <Avatar src={photoUrl}> {name[0]} </Avatar>
        <div className="post_info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="post-body">
        <p>{message}</p>
      </div>
      <div className="post_buttons">
        <InputOptions Icon={ThumbUpAltIcon} title="Like" color="gray" />
        <InputOptions Icon={CommentIcon} title="Comment" color="gray" />
        <InputOptions Icon={ShareIcon} title="Share" color="gray" />
        <InputOptions Icon={SendIcon} title="Send" color="gray" />
      </div>
    </div>
  );
});
export default Post;
