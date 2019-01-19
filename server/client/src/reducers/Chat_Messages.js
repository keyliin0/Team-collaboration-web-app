import _ from "lodash";
import { FETCH_GROUPS, DELETE_GROUP } from "../actions/types";
const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  console.log(state);
  switch (action.type) {
    case "CHAT_MESSAGE_RECEIVED":
      return [...state, action.payload];
    case "CHAT_CLEAR_MESSAGES":
      return INITIAL_STATE;
    default:
      return state;
  }
}
