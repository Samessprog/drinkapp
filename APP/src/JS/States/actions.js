export const SET_LOGIN_POPUP = 'SET_LOGIN_POPUP';
export const SET_SETTINGS_POPUP = 'SET_SETTINGS_POPUP';
export const SET_REGISTER_POPUP = 'SET_REGISTER_POPUP';
export const SET_SPECIAL_OPTIONS_POPUP = 'SET_SPECIAL_OPTIONS_POPUP';



export function setLoginPopup(value) {
  return {
    type: SET_LOGIN_POPUP,
    payload: value
  };
}

export function setPopupSetings(value) {
    return {
      type: SET_SETTINGS_POPUP,
      payload: value
    };
  }

  export function setRegisterPopup(value) {
    return {
      type: SET_REGISTER_POPUP,
      payload: value
    };
  }
  export function setSpecialOptionsPopup(value) {
    return {
      type: SET_SPECIAL_OPTIONS_POPUP,
      payload: value
    };
  }
