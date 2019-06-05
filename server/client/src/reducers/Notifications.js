import {
  FETCH_NOTIFICATIONS,
  NOTIFICATION_RECIEVED,
  MARK_NOTIFICATION
} from "../actions/types";
import _ from "lodash";
const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case NOTIFICATION_RECIEVED:
      return { [action.payload._id]: action.payload, ...state };
    case MARK_NOTIFICATION:
      return _.mapKeys(
        _.sortBy(
          { ...state, [action.payload._id]: action.payload },
          "timestamp"
        ).reverse(),
        "_id"
      );
    default:
      return state;
  }
}
