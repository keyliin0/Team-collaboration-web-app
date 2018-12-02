import { combineReducers } from "redux";
import Emails from "./Emails";
import Selected_Emails from "./Selected_Emails";
import Groups from "./Groups";

export default combineReducers({
  emails: Emails,
  selected_emails: Selected_Emails,
  groups: Groups
});
