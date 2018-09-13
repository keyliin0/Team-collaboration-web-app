import axios from "axios";

export const FetchEmails = (page, type, label) => async dispatch => {
  const request = await axios.get("/api/mail/messages/" + label + "/" + page);
  dispatch({ type: type, payload: request.data, page: page, label: label });
};
