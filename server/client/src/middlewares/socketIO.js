import io from "socket.io-client";
import {
  MODIFY_TASK,
  ADD_TASK,
  MODIFY_EVENT,
  ADD_EVENT,
  NOTIFICATION_RECIEVED
} from "../actions/types";

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
      storeAPI.dispatch({
        type: "CHAT_MESSAGE_RECEIVED",
        payload: data
      });
    });
    socket.on("NewNotification", data => {
      storeAPI.dispatch({
        type: NOTIFICATION_RECIEVED,
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
        case MODIFY_TASK:
        case ADD_TASK:
        case MODIFY_EVENT:
        case ADD_EVENT:
          socket.emit(
            "CreateNotification",
            action.payload.group_id,
            action.type
          );
          return next(action);
        default:
          return next(action);
      }
    };
  };
};
