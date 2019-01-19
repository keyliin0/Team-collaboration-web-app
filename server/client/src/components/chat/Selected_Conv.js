import React from "react";

export const Selected_Conv = props => {
  if (!props.conv) return <div />;
  return (
    <div className="selected_conv">
      <div className="image">
        <img src={props.conv.imgurl} className="rounded-circle" />
      </div>
      <div className="name">{props.conv.name}</div>
    </div>
  );
};

export default Selected_Conv;
