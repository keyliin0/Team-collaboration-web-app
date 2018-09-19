import axios from "axios";
import * as types from "./types";
// email actions
export const ClearEmails = () => dispatch => {
  dispatch({ type: types.CLEAR_EMAILS });
};

export const FetchEmails = (page, type, label) => async dispatch => {
  dispatch({ type: types.LOADING_EMAILS });
  const request = await axios.get("/api/mail/messages/" + label + "/" + page);
  dispatch({
    type: type,
    payload: { data: request.data, page: page, label: label }
  });
};

export const DeleteEmails = selected_emails => async dispatch => {
  dispatch({ type: types.CLEAR_EMAILS });
  dispatch({ type: types.LOADING_EMAILS });
  console.log(selected_emails.folder);
  if (selected_emails.folder !== "TRASH") {
    await axios.post("/api/mail/modify", {
      ids: selected_emails.emails,
      addlabels: ["TRASH"],
      removelabels: [selected_emails.folder]
    });
  } else {
    await axios.post("/api/mail/delete", {
      ids: selected_emails.emails
    });
  }
};

export const Select_Email = (event, email_id) => dispatch => {
  if (event.target.checked)
    dispatch({ type: types.SELECT_EMAIL, payload: email_id });
  else dispatch({ type: types.DESELECT_EMAIL, payload: email_id });
};
