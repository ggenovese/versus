import Data from '../assets/data';

const initialState = {
  user : {
    name: "",
    email: "",
    editName: false,
    editEmail: false,
    userEntered: false
  },
  fixEmailCta: false,
  emailSent: false,
  choices: Data
};

export default function versus(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER': {
        const newState = Object.assign({}, state);
        newState.user = action.user;
        return newState;
    }
    case 'GET_VERSUS_COMPLETE': {
      return Object.assign({}, {choices: action.versusData});
    }
    case 'VERSUS_CHOSEN': {
        const newState = Object.assign({}, state);
        newState.choices[action.index] = action.versus;
        return newState;
    }
    case 'VERSUS_LOADING' : {
        return state;
    }
    case 'GET_VERSUS_FAIL' : {
        return state;
    }
    case 'EMAIL_SENT' : {
        const newState = Object.assign({}, state);
        newState.emailSent = true;
        return newState;
    }
    case 'RESET_EMAIL_SENT' : {
        const newState = Object.assign({}, state);
        newState.emailSent = false;
        return newState;
    }
    case 'SET_COMMENT_DISPLAY_INPUT' : {
        const newState = Object.assign({}, state);
        newState.choices[action.id] = action.versus;
        return newState;
    }
    case 'HANDLE_SCROLL' : {
        const newState = Object.assign({}, state);
        newState.fixEmailCta = action.bool;
        return newState;
    }
    case 'EDIT_PROFILE_EDIT' : {
        const newState = Object.assign({}, state);
        newState.fixEmailCta = action.bool;
        if ( action.inputName === "name" ) {
            newState.user.editName = !newState.user.editName;
        } else {
            newState.user.editEmail = !newState.user.editEmail;
        }
        return newState;
    }
    case 'EDIT_PROFILE_VALUE' : {
        const newState = Object.assign({}, state);
        newState.fixEmailCta = action.bool;
        if ( action.inputName === "name" ) {
            newState.user.name = action.value;
        } else {
            newState.user.email = action.value;
        }
        return newState;
    }
    default:
      return state;
  }
}
