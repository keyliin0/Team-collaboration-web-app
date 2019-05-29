import _ from "lodash";
import {
  FETCH_TASKS,
  DELETE_TASK,
  MODIFY_TASK,
  ADD_TASK
} from "../actions/types";
const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TASKS:
      return _.mapKeys(action.payload, "_id");
    case DELETE_TASK:
      return _.reject(state, task => task._id === action.payload);
    case MODIFY_TASK:
      return {
        ...state,
        [action.payload._id]: action.payload
      };
    case ADD_TASK:
      return {
        ...state,
        [action.payload._id]: action.payload
      };
    default:
      return state;
  }
}
