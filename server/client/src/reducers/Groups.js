import _ from "lodash";
import { FETCH_GROUPS } from "../actions/types";
const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_GROUPS:
      return _.mapKeys(action.payload, "_id");
    default:
      return state;
  }
}
