import axios from "axios";
import * as types from "./types";
// email actions
export const ClearEmails = () => dispatch => {
  dispatch({ type: types.CLEAR_EMAILS });
};

export const FetchEmails = (
  page,
  type,
  label,
  query = ""
) => async dispatch => {
  dispatch({ type: types.LOADING_EMAILS });
  const request = await axios.get(
    "/api/mail/messages/" + label + "/" + page + "/" + query
  );
  dispatch({
    type: type,
    payload: { data: request.data, page: page, label: label, query: query }
  });
};

export const DeleteEmails = selected_emails => async dispatch => {
  dispatch({ type: types.CLEAR_EMAILS });
  dispatch({ type: types.LOADING_EMAILS });
  if (selected_emails.folder !== "TRASH" && selected_emails.folder !== "SENT") {
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

export const Mark_Read_Unread = (selected_emails, read) => async dispatch => {
  if (read) {
    await axios.post("/api/mail/modify", {
      ids: selected_emails,
      addlabels: [],
      removelabels: ["UNREAD"]
    });
  } else {
    await axios.post("/api/mail/modify", {
      ids: selected_emails,
      addlabels: ["UNREAD"],
      removelabels: []
    });
  }
  dispatch({
    type: types.MARK_READ_UNREAD,
    payload: { is_read: read, selected_emails: selected_emails }
  });
};

export const Send_Email = (receiver, subject, content) => async dispatch => {
  const request = await axios.post("/api/mail/send", {
    receiver: receiver,
    subject: subject,
    content: content
  });
  dispatch({
    type: "SEND_EMAIL",
    payload: request.data
  });
};

// ________________________________________________________________________________________________
