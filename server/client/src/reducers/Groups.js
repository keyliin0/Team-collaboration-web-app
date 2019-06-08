import _ from "lodash";
import {
  FETCH_GROUPS,
  DELETE_GROUP,
  CHAT_MESSAGE_RECEIVED
} from "../actions/types";
const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_GROUPS:
      return _.mapKeys(action.payload, "_id");
    case DELETE_GROUP:
      return _.reject(state, group => group._id === action.payload);
    case CHAT_MESSAGE_RECEIVED:
      /*var current_state = state;
      current_state[action.payload.group_id].last_chat_message = {
        message: action.payload.message,
        timestamp: action.payload.timestamp
      };*/
      return {
        ...state,
        [action.payload.group_id]: {
          ...state[action.payload.group_id],
          last_chat_message: {
            message: action.payload.message,
            timestamp: action.payload.timestamp
          }
        }
      };
    default:
      return state;
  }
}
