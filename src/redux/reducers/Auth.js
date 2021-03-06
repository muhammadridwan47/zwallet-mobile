const initialState = {
  data: [],
  loading: false,
  isStatus:false
};

const regsiterState = {
  data: [],
  status: false,
  error:''
};

const Auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isLogin: true,
        isStatus: false,
        data: action.payload
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        isLogin: false,
        isStatus: true,
        loading: false,
        data:[],
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        isLogin: false,
        isStatus: false,
        data:[],
        _persist: {
          rehydrated: true,
          version: -1
        }
      };
    case 'OFF':
      return {
        ...state,
        isStatus: false,
      };
    default:
      return state
  }
};

export const SignUp = (state = regsiterState, action = {}) => {
  switch (action.type) {
    case 'REGISTER_REQUEST':
      return {
        ...state,
        loading: false,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        status: true,
        data: action.payload
      };
    case 'REGISTER_ERROR':
      return {
        ...state,
        status: false,
        data:[],
        error: action.payload
      };
    default:
      return state
  }
};
export default Auth;
