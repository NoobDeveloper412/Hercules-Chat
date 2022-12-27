import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const initialUserState = {
  currentUser: null,
  isLoading: true,
};
const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false,
      };
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

// const toast_reducer = (state = [], action) => {
//   const { payload, type } = action;

//   switch (type) {
//     case actionTypes.ADD_TOAST:
//       return [payload, ...state];

//     case actionTypes.REMOVE_TOAST:
//       return state.filter((toast) => toast.id !== payload);

//     default:
//       return state;
//   }
// };
const initialChannelState = {
  currentChannel: null,
  isPrivateChannel: false,
};
const channel_reducer = (state = initialChannelState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: payload.currentChannel,
      };
    case actionTypes.SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: payload.isPrivateChannel,
      };

    default:
      return state;
  }
};
const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer,
});

export default rootReducer;
