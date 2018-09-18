import _ from "lodash";
import {
  FETCH_EMAILS,
  FETCH_PREVIOUS_EMAILS,
  LOADING_EMAILS,
  CLEAR_EMAILS
} from "../actions/types";
const INITIAL_STATE = {
  emails: null,
  previous: [],
  nextpage: null,
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EMAILS:
      return {
        emails: _.mapKeys(action.payload.messages, "id"),
        previous: [...state.previous, action.page],
        nextpage: action.payload.nextpage,
        label: action.label,
        loading: false
      };
    case FETCH_PREVIOUS_EMAILS:
      var previous = state.previous;
      previous.pop();
      return {
        emails: _.mapKeys(action.payload.messages, "id"),
        previous: previous,
        nextpage: action.payload.nextpage,
        label: action.label,
        loading: false
      };
    case CLEAR_EMAILS:
      return INITIAL_STATE;
    case LOADING_EMAILS:
      return { ...state, loading: true };
    default:
      return state;
  }
}
