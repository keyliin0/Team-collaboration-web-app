import React from "react";
import _ from "lodash";
import ContentLoader from "react-content-loader";
import moment from "moment";

const Loader = () => (
  <ContentLoader
    height={160}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#c0c0c0"
  >
    <rect x="70" y="15" rx="4" ry="4" width="250" height="9" />
    <rect x="70" y="37" rx="4" ry="4" width="250" height="9" />
    <circle cx="30" cy="30" r="30" />
  </ContentLoader>
);

const RenderComments = comments => {
  if (!comments) return <Loader />;
  return _.map(comments, comment => {
    return (
      <li key={comment._id}>
        <img
          className="rounded-circle image"
          width="40"
          height="40"
          src={comment.author.imgURL}
        />
        <div className="comment">
          <div className="header">
            <h3 className="name">
              {comment.author.firstname + " " + comment.author.lastname}
            </h3>
            <span className="time">
              {moment(comment.timestamp).format("M.D.YY h:mm a")}
            </span>
          </div>
          <div className="content">
            <p>{comment.comment}</p>
          </div>
        </div>
      </li>
    );
  });
};

const CommentList = ({ comments }) => {
  return <ul className="comments">{RenderComments(comments)}</ul>;
};

export default CommentList;
