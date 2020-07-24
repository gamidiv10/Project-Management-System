import React, { useState, useEffect } from "react";
import "./Comments.scss";
import { Button } from "react-bootstrap";
import Comment from "../Comments/Comment/Comment";
import axios from "axios";

export const Comments = ({ id }) => {
  const [textArea, setTextArea] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    textArea ? setDisabled(false) : setDisabled(true);
  }, [textArea]);

  useEffect(() => {
    axios.get(`/comment/getComments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const changeTextAreaHandler = (e) => {
    setTextArea(e.target.value);
  };

  const addComment = () => {
    axios
      .post("/comment/addComment", {
        id,
        comment: textArea,
        userName: "satya",
      })
      .then((response) => {
        setComments([...comments, response.data.data]);
        setTextArea("");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="comments-container">
      <div className="issueHeading">Comments</div>
      <div className="commentsArea">
        {comments.map((comment, id) => (
          <Comment
            key={id}
            text={comment.comment}
            userName={comment.userName}
          />
        ))}
      </div>
      <div className="commentsTextArea">
        <textarea
          placeholder="Add a comment"
          rows="4"
          value={textArea}
          onChange={changeTextAreaHandler}
        ></textarea>
      </div>

      <div className="buttons">
        <Button disabled={disabled} onClick={addComment}>
          Add Comment
        </Button>
      </div>
    </div>
  );
};
