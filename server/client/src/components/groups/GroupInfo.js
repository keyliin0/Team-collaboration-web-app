import React from "react";
import { Link } from "react-router-dom";
import Remove from "./remove";
import Invite from "./Invite";

const GroupInfo = ({
  id,
  owner,
  name,
  facebook,
  instagram,
  twitter,
  email,
  img
}) => {
  return (
    <div className="info">
      <table>
        <tbody>
          <tr className="top">
            <td className="picture">
              <img src={img} alt={name} />
            </td>
            <td className="desc">{name}</td>
            <td className="tools">
              {owner ? (
                <div>
                  <Link to={"/groups/modify/" + id}>
                    <i className="fas fa-pen" />
                  </Link>
                  <Invite id={id} />
                </div>
              ) : (
                <div />
              )}

              <Remove id={id} owner={owner} />
            </td>
          </tr>
          <tr>
            <td />
            <td colSpan={2}>
              <a
                href={"https://www.instagram.com/" + instagram}
                target="_blank"
              >
                <i className="fab fa-instagram" />
              </a>
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
