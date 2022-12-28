import createToast from "../components/Utility/CreateToast";
import * as actionTypes from "./types";

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user,
    },
  };
};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER,
  };
};

export function addToast(options = {}) {
  return {
    payload: createToast(options),
    type: actionTypes.ADD_TOAST,
  };
}

export function removeToast(id) {
  return {
    payload: id,
    type: actionTypes.REMOVE_TOAST,
  };
}

// CHANNEL ACTIONS

export const setCurrentChannel = (channel) => {
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel,
    },
  };
};
export const setPrivateChannel = (isPrivateChannel) => {
  return {
    type: actionTypes.SET_PRIVATE_CHANNEL,
    payload: {
      isPrivateChannel,
    },
  };
};
