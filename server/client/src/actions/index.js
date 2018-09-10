import axios from "axios";

export const FetchEmails = () => async dispatch => {
  const request = await axios.post("/api/mail/messages", {
    label: "INBOX"
  });
  dispatch({ type: "FETCH_EMAILS", payload: request.data });
};
