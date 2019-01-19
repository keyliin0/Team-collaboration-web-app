import io from "socket.io-client";

export const createMySocketMiddleware = url => {
  return storeAPI => {
    let socket = io(url);
    window.socket = socket;
    socket.on("update", message => {
      storeAPI.dispatch({
        type: "SOCKET_MESSAGE_RECEIVED",
        payload: message
      });
    });
    socket.on("NewMessage", data => {
      console.log(data);
      storeAPI.dispatch({
        type: "CHAT_MESSAGE_RECEIVED",
        payload: data
      });
    });
    return next => action => {
      switch (action.type) {
        case "SEND_WEBSOCKET_MESSAGE":
          socket.send(action.payload);
          return;
        case "JOIN_CHAT_GROUP":
          socket.emit("join", action.payload);
          return;
        case "SEND_CHAT_MESSAGE":
          socket.emit(
            "CreateChatMessage",
            action.payload.group_id,
            action.payload.message
          );
          return;
        default:
          return next(action);
      }
    };
  };
};
