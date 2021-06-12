import { SET_LANG, SET_MSG, LOG_IN } from "../constants/actions/common"

export const setMsg = (msg) => ({
  type: SET_MSG,
  payload: msg
});
export const setLang = (lang) => ({
  type: SET_LANG,
  payload: lang
});

export const userLogIn = (name) =>({
    type: LOG_IN,
    payload: name
});