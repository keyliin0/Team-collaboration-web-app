import React, { Component } from "react";
import SelectGroup from "../custom/SelectGroup/";

export default class MyGroups extends Component {
  render() {
    return <SelectGroup route={"/filebrowser"} />;
  }
}
