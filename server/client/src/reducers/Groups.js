import _ from "lodash";
import { FETCH_GROUPS, DELETE_GROUP } from "../actions/types";
const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_GROUPS:
      return _.mapKeys(action.payload, "_id");
    case DELETE_GROUP:
      return _.reject(state, group => group._id === action.payload);
    default:
      return state;
  }
}
