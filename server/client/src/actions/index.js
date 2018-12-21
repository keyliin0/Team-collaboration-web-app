import axios from "axios";
import * as types from "./types";

// user actions

export const FetchUser = () => async dispatch => {
  const request = await axios.get("/api/current_user");
  dispatch({ type: types.FETCH_USER, payload: request.data });
};

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

export const FetchGroups = () => async dispatch => {
  const request = await axios.get("/api/group/my_groups");
  dispatch({
    type: types.FETCH_GROUPS,
    payload: request.data
  });
};

export const ModifyGroup = (
  id,
  name,
  imgurl,
  instagram,
  twitter,
  facebook,
  email
) => async dispatch => {
  const request = await axios.post("/api/group/modify", {
    group_id: id,
    name: name,
    imgurl: imgurl,
    instagram: instagram,
    twitter: twitter,
    facebook: facebook,
    email: email
  });
};

export const DeleteGroup = id => async dispatch => {
  const request = await axios.post("/api/group/delete", { group_id: id });
  dispatch({
    type: types.DELETE_GROUP,
    payload: id
  });
};

export const CreateGroup = (
  name,
  imgurl,
  instagram,
  twitter,
  facebook,
  email
) => async dispatch => {
  const request = await axios.post("/api/group/create", {
    name: name,
    imgurl: imgurl,
    instagram: instagram,
    twitter: twitter,
    facebook: facebook,
    email: email
  });
};
