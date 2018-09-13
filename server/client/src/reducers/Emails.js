import { FETCH_EMAILS, FETCH_PREVIOUS_EMAILS } from "../actions/types";

export default function(
  state = { emails: null, previous: [], nextpage: null },
  action
) {
  switch (action.type) {
    case FETCH_EMAILS:
      return {
        emails: action.payload.messages,
        previous: [...state.previous, action.page],
        nextpage: action.payload.nextpage,
        label: action.label
      };
    case FETCH_PREVIOUS_EMAILS:
      var previous = state.previous;
      previous.pop();
      return {
        emails: action.payload.messages,
        previous: previous,
        nextpage: action.payload.nextpage,
        label: action.label
      };
    default:
      return state;
  }
}
