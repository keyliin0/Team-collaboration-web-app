import { combineReducers } from "redux";
import User from "./User";
import Emails from "./Emails";
import Selected_Emails from "./Selected_Emails";
import Groups from "./Groups";
import Chat from "./Chat";
import Calendar from "./Calendar";
import Tasks from "./Tasks";

export default combineReducers({
  user: User,
  emails: Emails,
  selected_emails: Selected_Emails,
  groups: Groups,
  chat: Chat,
  calendar: Calendar,
  tasks: Tasks
});
