import axios from "axios";
import * as types from "./types";
// email actions
export const ClearEmails = () => dispatch => {
  dispatch({ type: types.CLEAR_EMAILS });
};

export const FetchEmails = (page, type, label) => async dispatch => {
  dispatch({ type: types.LOADING_EMAILS });
  const request = await axios.get("/api/mail/messages/" + label + "/" + page);
  dispatch({ type: type, payload: request.data, page: page, label: label });
};
