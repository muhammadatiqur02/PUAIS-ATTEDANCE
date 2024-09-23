import {
  CLEAR_AUTH_STATE,
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from '../../constants/actionTypes';

const loginReducer = (prevState, action) => {

  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...prevState,
        isLoading: true
      }
    case 'RETRIVE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        userState: action.state,
        data:action.user,
        isLoading: false
      }
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        userName: action.id,
        userToken: action.token,
        userState: action.state,
        data:action.user,
        isLoading: false,
        isLoggedIn: true
      }
    case LOGOUT_USER:
      return {
        ...prevState,
        userToken: null,
        userName: null,
        userState: null,
        data:null,
        isLoading: false,
        isLoggedIn: false,
      }
    case LOGIN_FAIL:
      return {
        ...prevState,
        userToken: null,
        userName: null,
        userState: null,
        isLoading: false,
        error: action.error
      }
    default:
      break;
  }
}

export default loginReducer;