//Navbar Actions
const NAVBAR_ACTIONS = {
    SET_LOGIN_POPUP: 'SET_LOGIN_POPUP',
    SET_SETTINGS_POPUP: 'SET_SETTINGS_POPUP',
    SET_REGISTER_POPUP: 'SET_REGISTER_POPUP',
    SET_SPECIAL_OPTIONS_POPUP: 'SET_SPECIAL_OPTIONS_POPUP',
    SET_DRINK_NOT_FOUND_POPUP: 'SET_DRINK_NOT_FOUND_POPUP',
    SET_INPUT_DRINK_TEXT: 'SET_INPUT_DRINK_TEXT',

}


//drinks Actions actions type
const DRINKS_ACTIONS = {
    SET_SEARCHING_DRINKS: 'SET_SEARCHING_DRINKS',
    SET_ALCOCHOLIC: 'SET_ALCOCHOLIC',
    SET_SOFT_DRINKS: 'SET_SOFT_DRINKS',
    SET_HIGHLY_RATED_DRINKS: 'SET_HIGHLY_RATED_DRINKS',
    SET_LEVEL_DRINKS: 'SET_LEVEL_DRINKS',
    SET_TASTE_DRINKS: 'SET_TASTE_DRINKS',
    SET_EACH_FLAG_DRINKS: 'SET_EACH_FLAG_DRINKS',
    SET_INPUT_DRINKS_TEXT: 'SET_INPUT_DRINKS_TEXT',
    SET_DRINKS_COUNTER: 'SET_DRINKS_COUNTER',
    SET_INGREDIENTS: 'SET_INGREDIENTS',
    SET_FAVOURITE_FLAG_DRINKS: 'SET_FAVOURITE_FLAG_DRINKS',

}

//Users Actions actions type

const USER_ACTIONS = {
    SET_USER_PASSWORD: 'SET_USER_PASSWORD',
    SET_USER_EMAIL: 'SET_USER_EMAIL',
    SET_USER_SESSION: 'SET_USER_SESSION',
    SET_USER_PHONE: 'SET_USER_PHONE',
    SET_USER_NICK_NAME: 'SET_USER_NICK_NAME',
    SET_FAVOURITE_DRINKS: 'SET_FAVOURITE_DRINKS',
}


//Admin actions actions type
const ADMIN_ACTIONS = {
    SET_DRINKS_ADMIN_FLAG: 'SET_DRINKS_ADMIN_FLAG',
    SET_USER_ADMIN_FLAG: 'SET_USER_ADMIN_FLAG',
    SET_FILTER_ADMIN_RESULTS: 'SET_FILTER_ADMIN_RESULTS',
    SET_FILTER_USER_RESULTS: 'SET_FILTER_USER_RESULTS',
}

export function setLoginPopup(value) {
    return {
        type: NAVBAR_ACTIONS.SET_LOGIN_POPUP,
        payload: value
    };
}

export function setPopupSetings(value) {
    return {
        type: NAVBAR_ACTIONS.SET_SETTINGS_POPUP,
        payload: value
    };
}

export function setRegisterPopup(value) {
    return {
        type: NAVBAR_ACTIONS.SET_REGISTER_POPUP,
        payload: value
    };
}
export function setSpecialOptionsPopup(value) {
    return {
        type: NAVBAR_ACTIONS.SET_SPECIAL_OPTIONS_POPUP,
        payload: value
    };
}
export function setDrinkNotFound(value) {
    return {
        type: NAVBAR_ACTIONS.SET_DRINK_NOT_FOUND_POPUP,
        payload: value
    };
}

export function setSearchingDrink(value) {
    return {
        type: DRINKS_ACTIONS.SET_SEARCHING_DRINKS,
        payload: value
    };
}

export function setAlcocholic(value) {
    return {
        type: DRINKS_ACTIONS.SET_ALCOCHOLIC,
        payload: value
    };
}

export function setSoftDrinks(value) {
    return {
        type: DRINKS_ACTIONS.SET_SOFT_DRINKS,
        payload: value
    };
}

export function setHighlyRated(value) {
    return {
        type: DRINKS_ACTIONS.SET_HIGHLY_RATED_DRINKS,
        payload: value
    };
}

export function setDrinkLevel(value) {
    return {
        type: DRINKS_ACTIONS.SET_LEVEL_DRINKS,
        payload: value
    };
}

export function setDrinkFavouriteFlag(value) {
    return {
        type: DRINKS_ACTIONS.SET_FAVOURITE_FLAG_DRINKS,
        payload: value
    };
}

export function setDrinkTaste(value) {
    return {
        type: DRINKS_ACTIONS.SET_TASTE_DRINKS,
        payload: value
    };
}

export function setEachdrinkflag(value) {
    return {
        type: DRINKS_ACTIONS.SET_EACH_FLAG_DRINKS,
        payload: value
    };
}

export function setDrinkCounter(value) {
    return {
        type: DRINKS_ACTIONS.SET_DRINKS_COUNTER,
        payload: value
    };
}

export function setingredient(value) {
    return {
        type: DRINKS_ACTIONS.SET_INGREDIENTS,
        payload: value
    };
}

export function setInputDrinkText(value) {
    return {
        type: DRINKS_ACTIONS.SET_INPUT_DRINK_TEXT,
        payload: value
    };
}

export function setEmail(value) {
    return {
        type: DRINKS_ACTIONS.USER_ACTIONS.SET_USER_EMAIL,
        payload: value
    };
}

export function setPassword(value) {
    return {
        type: USER_ACTIONS.USER_ACTIONS.SET_USER_PASSWORD,
        payload: value
    };
}


export function setUserSession(value) {
    return {
        type: USER_ACTIONS.SET_USER_SESSION,
        payload: value
    };
}
export function setPhone(value) {
    return {
        type: USER_ACTIONS.SET_USER_PHONE,
        payload: value
    };
}

export function setUserNick(value) {
    return {
        type: USER_ACTIONS.SET_USER_NICK_NAME,
        payload: value
    };
}

export function setUserFavouriteDrinks(value) {
    return {
        type: USER_ACTIONS.USER_ACTIONS.SET_FAVOURITE_DRINKS,
        payload: value,
    };
}

export function setDrinksFlag(value) {
    return {
        type: ADMIN_ACTIONS.SET_DRINKS_ADMIN_FLAG,
        payload: value,
    };
}

export function setUsersFlag(value) {
    return {
        type: ADMIN_ACTIONS.SET_USER_ADMIN_FLAG,
        payload: value,
    };
}
export function setFilteredResults(value) {
    return {
        type: ADMIN_ACTIONS.SET_FILTER_ADMIN_RESULTS,
        payload: value,
    };
}


export function setFilteredUserResults(value) {
    return {
        type: ADMIN_ACTIONS.SET_FILTER_USER_RESULTS,
        payload: value,
    };
}


// function createAdminAction(type) {
//     return function (value) {
//         return {
//             type,
//             payload: value,
//         };
//     };
// }

// export const setDrinksFlag = createAdminAction(ADMIN_ACTIONS.SET_DRINKS_ADMIN_FLAG);
// export const setUsersFlag = createAdminAction(ADMIN_ACTIONS.SET_USER_ADMIN_FLAG);
// export const setFilteredResults = createAdminAction(ADMIN_ACTIONS.SET_FILTER_ADMIN_RESULTS);
// export const setFilteredUserResults = createAdminAction(ADMIN_ACTIONS.SET_FILTER_USER_RESULTS);










