import React from "react";

const GroupInfo = ({ name }) => {
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
            <td colSpan={3}>
              <i className="fab fa-instagram" />
              <i className="fab fa-twitter" />
              <i className="fab fa-facebook-f" />
              <i className="far fa-envelope" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GroupInfo;
