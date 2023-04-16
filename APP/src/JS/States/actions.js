//Navbar Actions
export const SET_LOGIN_POPUP = 'SET_LOGIN_POPUP';
export const SET_SETTINGS_POPUP = 'SET_SETTINGS_POPUP';
export const SET_REGISTER_POPUP = 'SET_REGISTER_POPUP';
export const SET_SPECIAL_OPTIONS_POPUP = 'SET_SPECIAL_OPTIONS_POPUP';
export const SET_DRINK_NOT_FOUND_POPUP = 'SET_DRINK_NOT_FOUND_POPUP';

//drinks Actions
export const SET_SEARCHING_DRINKS = 'SET_SEARCHING_DRINKS';




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
export function setDrinkNotFound(value) {
    return {
        type: SET_DRINK_NOT_FOUND_POPUP,
        payload: value
    };
}

export function setSearchingDrink(value) {
    return {
        type: SET_SEARCHING_DRINKS,
        payload: value
    };
}
