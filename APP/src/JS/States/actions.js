//Navbar Actions
const SET_LOGIN_POPUP = 'SET_LOGIN_POPUP';
const SET_SETTINGS_POPUP = 'SET_SETTINGS_POPUP';
const SET_REGISTER_POPUP = 'SET_REGISTER_POPUP';
const SET_SPECIAL_OPTIONS_POPUP = 'SET_SPECIAL_OPTIONS_POPUP';
const SET_DRINK_NOT_FOUND_POPUP = 'SET_DRINK_NOT_FOUND_POPUP';
const SET_INPUT_DRINK_TEXT = 'SET_INPUT_DRINK_TEXT';

//drinks Actions
const SET_SEARCHING_DRINKS = 'SET_SEARCHING_DRINKS';
const SET_ALCOCHOLIC = 'SET_ALCOCHOLIC';
const SET_SOFT_DRINKS = 'SET_SOFT_DRINKS';
const SET_HIGHLY_RATED_DRINKS = 'SET_HIGHLY_RATED_DRINKS';
const SET_LEVEL_DRINKS = 'SET_LEVEL_DRINKS';
const SET_TASTE_DRINKS = 'SET_TASTE_DRINKS';
const SET_EACH_FLAG_DRINKS = 'SET_EACH_FLAG_DRINKS';
const SET_INPUT_DRINKS_TEXT = 'SET_INPUT_DRINKS_TEXT';
const SET_DRINKS_COUNTER = 'SET_DRINKS_COUNTER';
const SET_INGREDIENTS = 'SET_INGREDIENTS';

//Users Actions
const SET_USER_PASSWORD = 'SET_USER_PASSWORD';
const SET_USER_EMAIL = 'SET_USER_EMAIL';
const SET_USER_SESSION = 'SET_USER_SESSION';
const SET_USER_PHONE = 'SET_USER_PHONE';
const SET_USER_NICK_NAME = 'SET_USER_NICK_NAME';
const SET_FAVOURITE_DRINKS = 'SET_FAVOURITE_DRINKS';


// //Export NavBar Actions
// export {
//     SET_LOGIN_POPUP, SET_SETTINGS_POPUP, SET_REGISTER_POPUP, SET_SPECIAL_OPTIONS_POPUP, SET_DRINK_NOT_FOUND_POPUP,
//     SET_INPUT_DRINK_TEXT,
// }
//export drink Acrions
// export {
//     SET_SEARCHING_DRINKS, SET_ALCOCHOLIC, SET_SOFT_DRINKS, SET_HIGHLY_RATED_DRINKS, SET_LEVEL_DRINKS, SET_TASTE_DRINKS,
//     SET_EACH_FLAG_DRINKS, SET_INPUT_DRINKS_TEXT, SET_DRINKS_COUNTER, SET_INGREDIENTS,
// }

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

export function setAlcocholic(value) {
    return {
        type: SET_ALCOCHOLIC,
        payload: value
    };
}

export function setSoftDrinks(value) {
    return {
        type: SET_SOFT_DRINKS,
        payload: value
    };
}

export function setHighlyRated(value) {
    return {
        type: SET_HIGHLY_RATED_DRINKS,
        payload: value
    };
}

export function setDrinkLevel(value) {
    return {
        type: SET_LEVEL_DRINKS,
        payload: value
    };
}

export function setDrinkTaste(value) {
    return {
        type: SET_TASTE_DRINKS,
        payload: value
    };
}

export function setEachdrinkflag(value) {
    return {
        type: SET_EACH_FLAG_DRINKS,
        payload: value
    };
}

export function setDrinkCounter(value) {
    return {
        type: SET_DRINKS_COUNTER,
        payload: value
    };
}

export function setingredient(value) {
    return {
        type: SET_INGREDIENTS,
        payload: value
    };
}

export function setInputDrinkText(value) {
    return {
        type: SET_INPUT_DRINK_TEXT,
        payload: value
    };
}

export function setEmail(value) {
    return {
        type: SET_USER_EMAIL,
        payload: value
    };
}


export function setPassword(value) {
    return {
        type: SET_USER_PASSWORD,
        payload: value
    };
}


export function setUserSession(value) {
    return {
        type: SET_USER_SESSION,
        payload: value
    };
}
export function setPhone(value) {
    return {
        type: SET_USER_PHONE,
        payload: value
    };
}

export function setUserNick(value) {
    return {
        type: SET_USER_NICK_NAME,
        payload: value
    };
}

export function setUserFavouriteDrinks(value) {
    return {
      type: SET_FAVOURITE_DRINKS,
      payload: value,
    };
  }
  







