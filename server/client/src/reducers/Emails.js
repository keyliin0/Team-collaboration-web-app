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
        emails: action.payload.data.messages
          ? _.mapKeys(action.payload.data.messages, "id")
          : null,
        previous: [...state.previous, action.payload.page],
        nextpage: action.payload.data.nextpage,
        label: action.payload.label,
        empty: action.payload.data.messages === undefined,
        loading: false
      };
    case FETCH_PREVIOUS_EMAILS:
      var previous = state.previous;
      previous.pop();
      return {
        emails: _.mapKeys(action.payload.data.messages, "id"),
        previous: previous,
        nextpage: action.payload.data.nextpage,
        label: action.payload.label,
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
