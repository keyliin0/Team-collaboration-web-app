import _ from "lodash";
import {
  SELECT_EMAIL,
  DESELECT_EMAIL,
  CLEAR_EMAILS,
  FETCH_EMAILS
} from "../actions/types";
const INITIAL_STATE = {
  emails: [],
  folder: null
};

export default function(state = INITIAL_STATE, action) {
  console.log(state);
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
    default:
      return state;
  }
}
