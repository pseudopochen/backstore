//
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG } from "./action-types";

export const setHeadTitle = (headTitle) => ({
  type: SET_HEAD_TITLE,
  data: headTitle,
});

//

export const receiveUser = (user) => ({ type: RECEIVE_USER, user });

export const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg });

export const login = (username, password) => {
  return async (dispatch) => {};
};
