/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 */
import React, { useState, useRef } from "react";
import "./Comment.scss";
import Editable from "../../Editable/Editable";
import { ReactComponent as DeleteIcon } from "../../../icons/delete.svg";
import { ReactComponent as SendIcon } from "../../../icons/send.svg";
import axios from "axios";

const Comment = (props) => {
  const [comment, setComment] = useState(props.text);
  const [editComment, setEditComment] = useState(false);
  const [error, setError] = useState("");
  const commentRef = useRef();

  const onChangeHandler = (e) => {
    setComment(e.target.value);
    setError("");
    setEditComment(true);
  };

  const editHandler = (e) => {
    e.preventDefault();
    if (!comment) {
      setError("Cannot be empty");
    } else {
      //Request to edit the comments in DB
      axios
        .put("/comment/editComment", {
          commentId: props.commentId,
          comment,
        })
        .then((response) => {
          setError("");
          setEditComment(false);
        })
        .catch((error) => {
          console.log(error.message);
          setError("Error Occured");
          setEditComment(true);
        });
    }
  };

  return (
    <>
      <div className="comment">
        <div className="userName">
          {props.userName}{" "}
          <span
            className="deleteIcon"
            onClick={() => props.deleteHandler(props.commentId)}
          >
            <DeleteIcon />
          </span>
        </div>
        <div className="commentsection">
          <div className="editable">
            <Editable
              text={comment}
              type="input"
              Ref={commentRef}
              className="EditableField"
            >
              <input
                ref={commentRef}
                type="text"
                name="comment"
                value={comment}
                className="PlaceholderField"
                onChange={onChangeHandler}
              />
            </Editable>
          </div>
          {editComment ? (
            <span className="deleteIcon" onClick={editHandler}>
              <SendIcon />
            </span>
          ) : (
            ""
          )}
        </div>
        {error ? <p>{error}</p> : ""}
      </div>
    </>
  );
};

export default Comment;
