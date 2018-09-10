export default function(state = [], action) {
  switch (action.type) {
    case "FETCH_EMAILS":
      return state.length === 0 ? action.payload : [state, ...action.payload];
    default:
      return state;
  }
}
