import _ from "lodash";
import {
  FETCH_FILES,
  LOADING_FILES,
  SELECT_FILE,
  CREATE_FOLDER,
  RENAME_FILE,
  DELETE_FILE,
  UPLOAD_PROGRESS,
  UPLOAD_DONE
} from "../actions/types";
const INITIAL_STATE = {
  objects: [],
  loading: false,
  selected_file: null,
  upload_progress: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_FILES:
      return {
        objects: _.mapKeys(action.payload.objects, "id"),
        loading: false,
        current_folder_id: action.payload.current_folder_id,
        upload_progress: null
      };
    case SELECT_FILE:
      return { ...state, selected_file: action.payload };
    case CREATE_FOLDER:
      return {
        ...state,
        objects: {
          ...state.objects,
          [action.payload.id]: action.payload
        }
      };
    case RENAME_FILE:
      return {
        ...state,
        selected_file: null,
        objects: {
          ...state.objects,
          [action.payload.id]: action.payload
        }
      };
    case DELETE_FILE:
      return {
        ...state,
        selected_file: null,
        objects: _.filter(state.objects, object => {
          return object.id !== action.payload;
        })
      };
    case UPLOAD_PROGRESS:
      return {
        ...state,
        upload_progress: action.payload
      };
    case UPLOAD_DONE:
      return {
        ...state,
        upload_progress: null
      };
    case LOADING_FILES:
      return { ...state, loading: true };
    default:
      return state;
  }
}
