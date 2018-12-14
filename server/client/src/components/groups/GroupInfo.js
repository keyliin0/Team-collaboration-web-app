import React from "react";
import { Link } from "react-router-dom";

const GroupInfo = ({ name, facebook, instagram, twitter, email, img }) => {
  return (
    <div className="info">
      <table>
        <tbody>
          <tr className="top">
            <td className="picture">
              <img
                src="https://www.w3schools.com/bootstrap4/newyork.jpg"
                alt={name}
              />
            </td>
            <td className="desc">{name}</td>
            <td className="tools">
              <i className="fas fa-pen" />
              <i className="fas fa-plus" />
              <i className="fas fa-times" />
            </td>
          </tr>
          <tr>
            <td />
            <td colSpan={2}>
              <Link
                style={{ textDecoration: "none" }}
                to={"https://www.instagram.com/" + instagram}
                target="_blank"
              >
                <i className="fab fa-instagram" />
              </Link>
              <a href={"https://www.twitter.com/" + twitter} target="_blank">
                <i className="fab fa-twitter" />
              </a>
              <a href={"https://www.facebook.com/" + facebook} target="_blank">
                <i className="fab fa-facebook-f" />
              </a>
              <a href={email} target="_blank">
                {" "}
                <i className="far fa-envelope" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GroupInfo;
