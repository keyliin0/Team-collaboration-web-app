import _ from "lodash";
import {
  SELECT_EMAIL,
  DESELECT_EMAIL,
  FETCH_EMAILS,
  CLEAR_EMAILS,
  LOADING_EMAILS,
  MARK_READ_UNREAD
} from "../actions/types";
const INITIAL_STATE = {
  emails: [],
  folder: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_EMAIL:
      return { ...state, emails: [...state.emails, action.payload] };
    case DESELECT_EMAIL:
      return {
        ...state,
        emails: _.reject(state.emails, id => id === action.payload)
      };
    case FETCH_EMAILS:
      return { ...state, folder: action.payload.label };
    case CLEAR_EMAILS:
      return INITIAL_STATE;
    case LOADING_EMAILS:
      return INITIAL_STATE;
    case MARK_READ_UNREAD:
      return { ...state, emails: [] };
    default:
      return state;
  }
}
