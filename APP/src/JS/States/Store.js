import { createStore, combineReducers } from 'redux';



const navbarState = {
  //login & register states
  loginPopup: false,
  registerPopup: false,
  /* Settings States  */
  popupsetings: false,
  specialOptionsPopupp: false,
  drinkNotFound: false,
};


const drinksState = {
  searchingDrinks: [],
  drinkNotFound: false,

};

function drinksReducer(state = drinksState, action) {
  switch (action.type) {
    case 'SET_SEARCHING_DRINKS':
      return {
        ...state,
        searchingDrinks: action.payload,
      };
    default:
      return state;
  }
}



// const userState = {

// };


function navbarReducer(state = navbarState, action) {
  switch (action.type) {
    //login & register states
    case 'SET_LOGIN_POPUP':
      return {
        ...state,
        loginPopup: action.payload,
      };
    case 'SET_REGISTER_POPUP':
      return {
        ...state,
        registerPopup: action.payload,
      };
    /* Settings States  */
    case 'SET_SETTINGS_POPUP':
      return {
        ...state,
        popupsetings: action.payload,
      };
    case 'SET_SPECIAL_OPTIONS_POPUP':
      return {
        ...state,
        specialOptionsPopupp: action.payload,
      };
    case 'SET_DRINK_NOT_FOUND_POPUP':
      return {
        ...state,
        drinkNotFound: action.payload,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  navbar: navbarReducer,
  drink: drinksReducer,
});

const store = createStore(rootReducer);

export { store };
