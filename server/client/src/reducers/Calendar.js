import _ from "lodash";
import {
  FETCH_CALENDAR,
  CLEAR_CALENDAR,
  DELETE_TASK,
  ADD_TASK
} from "../actions/types";
const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CALENDAR:
      return action.payload;
    case DELETE_TASK:
      return _.filter(state, task => {
        return task._id !== action.task_id;
      });
    case ADD_TASK:
      return [...state, action.payload];
    case CLEAR_CALENDAR:
      return INITIAL_STATE;
    default:
      return state;
  }
}
