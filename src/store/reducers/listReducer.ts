import { List } from "../../interfaces/list";

interface ListsState {
  isFetching: boolean;
  isCreating: boolean;
  error: string | null;
  data: List[];
}

interface Action {
  type: string;
  payload?: any;
}

export const reducer = (state: ListsState, action: Action): ListsState => {
  switch (action.type) {
    case "add_list":
      return { isCreating: true, isFetching: false, error: null, data: [] };
    case "add_list_success":
      return {
        isCreating: false,
        isFetching: false,
        error: null,
        data: action.payload,
      };
    case "add_list_error":
      return {
        isCreating: false,
        isFetching: false,
        error: action.payload,
        data: [],
      };
    case "fetch_lists":
      return { isFetching: true, isCreating: false, error: null, data: [] };
    case "fetch_lists_success":
      return {
        isFetching: false,
        isCreating: false,
        error: null,
        data: action.payload,
      };
    case "fetch_lists_error":
      return {
        isFetching: false,
        isCreating: false,
        error: action.payload,
        data: [],
      };
    default:
      return state;
  }
};
