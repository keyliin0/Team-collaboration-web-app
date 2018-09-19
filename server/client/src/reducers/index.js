import { combineReducers } from "redux";
import Emails from "./Emails";
import Selected_Emails from "./Selected_Emails";

export default combineReducers({
  emails: Emails,
  selected_emails: Selected_Emails
});
