import { createStore, combineReducers } from 'redux';

const navbarState = {
  //login & register states
  loginPopup: false,
  registerPopup: false,
  /* Settings States  */
  popupsetings: false,
  specialOptionsPopupp: false,
  inputDrinkText: "",
};

const drinksState = {
  searchingDrinks: [],
  drinkNotFound: false,
  //Drink Properties States
  alcocholic: false,
  softDrinks: false,
  highlyRated: false,
  drinkLevel: 'All',
  drinkTaste: 'All',
  eachdrinkflag: false,
  drinkCounter: 0,
  ingredient: [],
};

const userState = {
  email: '',
  password: '',
};


function userReducer(state = userState, action) {
  switch (action.type) {
    //login & register states
    case 'SET_USER_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'SET_USER_PASSWORD':
      return {
        ...state,
        password: action.payload,
      };
    /* Settings States  */
    default:
      return state;
  }
}





function drinksReducer(state = drinksState, action) {
  switch (action.type) {
    case 'SET_SEARCHING_DRINKS':
      return {
        ...state,
        searchingDrinks: action.payload,
      };
    case 'SET_ALCOCHOLIC':
      return {
        ...state,
        alcocholic: action.payload
      }
    case 'SET_SOFT_DRINKS':
      return {
        ...state,
        softDrinks: action.payload
      }
    case 'SET_HIGHLY_RATED_DRINKS':
      return {
        ...state,
        highlyRated: action.payload
      }
    case 'SET_LEVEL_DRINKS':
      return {
        ...state,
        drinkLevel: action.payload
      }
    case 'SET_TASTE_DRINKS':
      return {
        ...state,
        drinkTaste: action.payload
      }
    case 'SET_EACH_FLAG_DRINKS':
      return {
        ...state,
        eachdrinkflag: action.payload
      }
    case 'SET_DRINKS_COUNTER':
      return {
        ...state,
        drinkCounter: action.payload
      }
    case 'SET_INGREDIENTS':
      return {
        ...state,
        ingredient: action.payload
      }

    default:
      return state;
  }
}

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
    case 'SET_INPUT_DRINK_TEXT':
      return {
        ...state,
        inputDrinkText: action.payload,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  navbar: navbarReducer,
  drink: drinksReducer,
  user:userReducer,
});

const store = createStore(rootReducer);

export { store };
