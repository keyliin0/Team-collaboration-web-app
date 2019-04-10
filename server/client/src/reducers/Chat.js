import _ from "lodash";
import {
  CHAT_FETCH_MESSAGES,
  CHAT_MESSAGE_RECEIVED,
  CHAT_SELECT_CONVERSATION,
  CHAT_LOADING_MESSAGES,
  CHAT_CLEAR_MESSAGES
} from "../actions/types";
const INITIAL_STATE = {
  loading: false,
  selected_conv: null,
  messages: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHAT_FETCH_MESSAGES:
      return {
        loading: false,
        selected_conv: state.selected_conv,
        messages: action.payload.concat(state.messages)
      };
    case CHAT_MESSAGE_RECEIVED:
      if (state.selected_conv !== action.payload.group_id) return state;
      return {
        loading: state.loading,
        selected_conv: state.selected_conv,
        messages: [...state.messages, action.payload]
      };
    case CHAT_SELECT_CONVERSATION:
      return { loading: false, selected_conv: action.payload, messages: [] };
    case CHAT_LOADING_MESSAGES:
      return {
        loading: true,
        selected_conv: state.selected_conv,
        messages: state.messages
      };
    case CHAT_CLEAR_MESSAGES:
      return INITIAL_STATE;
    default:
      return state;
  }
}
