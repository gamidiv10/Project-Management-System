import React from "react";
import "./Comment.scss";

const Comment = (props) => {
  return (
    <>
      <div className="comment">
        <div className="userName">{props.userName}</div>
        <div className="">{props.text}</div>
      </div>
    </>
  );
};

export default Comment;
