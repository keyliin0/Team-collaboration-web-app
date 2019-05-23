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
  await axios.post("/api/group/modify", {
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
  await axios.post("/api/group/delete", { group_id: id });
  dispatch({
    type: types.DELETE_GROUP,
    payload: id
  });
};

export const LeaveGroup = (group_id, user_id) => async dispatch => {
  await axios.post("/api/group/remove", {
    group_id: group_id,
    user_id: user_id
  });
  dispatch({
    type: types.DELETE_GROUP,
    payload: group_id
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
  await axios.post("/api/group/create", {
    name: name,
    imgurl: imgurl,
    instagram: instagram,
    twitter: twitter,
    facebook: facebook,
    email: email
  });
};

/* --------- chat -------------- */

export const SelectChatConversation = group_id => dispatch => {
  dispatch({
    type: types.CHAT_SELECT_CONVERSATION,
    payload: group_id
  });
};

export const JoinChatGroup = group_id => dispatch => {
  dispatch({
    type: "JOIN_CHAT_GROUP",
    payload: group_id
  });
};

export const SendChatMessage = (group_id, message) => dispatch => {
  dispatch({
    type: "SEND_CHAT_MESSAGE",
    payload: { group_id: group_id, message: message }
  });
};

export const FetchChatMessages = (group_id, skip, limit) => async dispatch => {
  dispatch({
    type: types.CHAT_LOADING_MESSAGES
  });
  const request = await axios.get(
    "/api/chat/fetch/" + group_id + "/" + skip + "/" + limit
  );
  dispatch({
    type: types.CHAT_FETCH_MESSAGES,
    payload: request.data
  });
};

/* --------- calendar -------------- */

export const FetchCalendar = (group_id, month, year) => async dispatch => {
  dispatch({
    type: types.CLEAR_CALENDAR
  });
  const request = await axios.get(
    "/api/calendar/fetch/" + group_id + "/" + month + "/" + year
  );
  dispatch({
    type: types.FETCH_CALENDAR,
    payload: request.data
  });
};

export const DeleteEvent = event_id => async dispatch => {
  const request = await axios.post("/api/calendar/remove", {
    event_id: event_id
  });
  dispatch({
    type: types.DELETE_EVENT,
    event_id: event_id
  });
};
export const CreateEvent = (
  group_id,
  timestamp,
  month,
  year,
  title,
  description
) => async dispatch => {
  const request = await axios.post("/api/calendar/create", {
    group_id: group_id,
    timestamp: timestamp,
    month: month,
    year: year,
    title: title,
    description: description
  });
  dispatch({
    type: types.ADD_EVENT,
    payload: request.data
  });
};

export const ModifyEvent = (
  event_id,
  timestamp,
  month,
  year,
  title,
  description
) => async dispatch => {
  const request = await axios.post("/api/calendar/modify", {
    event_id: event_id,
    timestamp: timestamp,
    month: month,
    year: year,
    title: title,
    description: description
  });
  dispatch({
    type: types.MODIFY_EVENT,
    payload: request.data
  });
};
