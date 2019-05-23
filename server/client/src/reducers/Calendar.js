import _ from "lodash";
import {
  FETCH_CALENDAR,
  CLEAR_CALENDAR,
  DELETE_EVENT,
  ADD_EVENT,
  MODIFY_EVENT
} from "../actions/types";
const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CALENDAR:
      return _.mapKeys(action.payload, "_id");
    case DELETE_EVENT:
      return _.filter(state, event => {
        return event._id !== action.event_id;
      });
    case ADD_EVENT:
      return { ...state, [action.payload._id]: { ...action.payload } };
    case MODIFY_EVENT:
      return { ...state, [action.payload._id]: { ...action.payload } };
    case CLEAR_CALENDAR:
      return INITIAL_STATE;
    default:
      return state;
  }
}
