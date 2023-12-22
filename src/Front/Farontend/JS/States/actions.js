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
    SET_DRINK_TYPE: 'SET_DRINK_TYPE',

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
    SET_ANNOUNCEMENT_SUCCESS: 'SET_ANNOUNCEMENT_SUCCESS',
}

// Funkcja generująca akcję paska nawigacyjnego
function createNavbarAction(actionType) {
    return function (value) {
        return {
            type: actionType,
            payload: value,
        };
    };
}

// Tworzenie funkcji akcji paska nawigacyjnego
export const setLoginPopup = createNavbarAction(NAVBAR_ACTIONS.SET_LOGIN_POPUP);
export const setPopupSetings = createNavbarAction(NAVBAR_ACTIONS.SET_SETTINGS_POPUP);
export const setRegisterPopup = createNavbarAction(NAVBAR_ACTIONS.SET_REGISTER_POPUP);
export const setSpecialOptionsPopup = createNavbarAction(NAVBAR_ACTIONS.SET_SPECIAL_OPTIONS_POPUP);
export const setDrinkNotFound = createNavbarAction(NAVBAR_ACTIONS.SET_DRINK_NOT_FOUND_POPUP);
export const setInputDrinkText = createDrinkAction(NAVBAR_ACTIONS.SET_INPUT_DRINK_TEXT);

// Funkcja generująca akcję napojów
function createDrinkAction(actionType) {
    return function (value) {
        return {
            type: actionType,
            payload: value,
        };
    };
}

// Tworzenie funkcji akcji napojów
export const setSearchingDrink = createDrinkAction(DRINKS_ACTIONS.SET_SEARCHING_DRINKS);
export const setAlcocholic = createDrinkAction(DRINKS_ACTIONS.SET_ALCOCHOLIC);
export const setSoftDrinks = createDrinkAction(DRINKS_ACTIONS.SET_SOFT_DRINKS);
export const setHighlyRated = createDrinkAction(DRINKS_ACTIONS.SET_HIGHLY_RATED_DRINKS);
export const setDrinkLevel = createDrinkAction(DRINKS_ACTIONS.SET_LEVEL_DRINKS);
export const setDrinkFavouriteFlag = createDrinkAction(DRINKS_ACTIONS.SET_FAVOURITE_FLAG_DRINKS);
export const setDrinkType = createDrinkAction(DRINKS_ACTIONS.SET_DRINK_TYPE);
export const setDrinkTaste = createDrinkAction(DRINKS_ACTIONS.SET_TASTE_DRINKS);
export const setEachdrinkflag = createDrinkAction(DRINKS_ACTIONS.SET_EACH_FLAG_DRINKS);
export const setDrinkCounter = createDrinkAction(DRINKS_ACTIONS.SET_DRINKS_COUNTER);
export const setingredient = createDrinkAction(DRINKS_ACTIONS.SET_INGREDIENTS);


// Funkcja generująca akcję użytkownika
function createUserAction(actionType) {
    return function (value) {
        return {
            type: actionType,
            payload: value,
        };
    };
}

// Tworzenie funkcji akcji użytkownika
export const setEmail = createUserAction(USER_ACTIONS.SET_USER_EMAIL);
export const setPassword = createUserAction(USER_ACTIONS.SET_USER_PASSWORD);
export const setUserSession = createUserAction(USER_ACTIONS.SET_USER_SESSION);
export const setPhone = createUserAction(USER_ACTIONS.SET_USER_PHONE);
export const setUserNick = createUserAction(USER_ACTIONS.SET_USER_NICK_NAME);
export const setUserFavoriteDrinks = createUserAction(USER_ACTIONS.SET_FAVOURITE_DRINKS);


// Funkcja generująca akcję
function createAdminAction(actionType) {
    return function (value) {
        return {
            type: actionType,
            payload: value,
        };
    };
}

// Tworzenie funkcji akcji
export const setDrinksFlag = createAdminAction(ADMIN_ACTIONS.SET_DRINKS_ADMIN_FLAG);
export const setUsersFlag = createAdminAction(ADMIN_ACTIONS.SET_USER_ADMIN_FLAG);
export const setFilteredResults = createAdminAction(ADMIN_ACTIONS.SET_FILTER_ADMIN_RESULTS);
export const setFilteredUserResults = createAdminAction(ADMIN_ACTIONS.SET_FILTER_USER_RESULTS);
export const setAnnouncementSuccess = createAdminAction(ADMIN_ACTIONS.SET_ANNOUNCEMENT_SUCCESS);







