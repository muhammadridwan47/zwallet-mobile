const initialState = {
    data: [],
    loading: false,
  };
  
  const DeletePhone = (state = initialState, action = {}) => {
    switch (action.type) {
      case 'DELETE_PHONE_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'DELETE_PHONE_SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.payload
        };
      case 'DELETE_PHONE_ERROR':
        return {
          ...state,
          loading: false,
          isLogin: false,
          data:[],
          error: action.payload
        };
      default:
        return state
    }
  };

  const AddPhone = (state = initialState, action = {}) => {
    switch (action.type) {
      case 'ADD_PHONE_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'ADD_PHONE_SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.payload
        };
      case 'ADD_PHONE_ERROR':
        return {
          ...state,
          loading: false,
          isLogin: false,
          data:[],
          error: action.payload
        };
      default:
        return state
    }
  };

  const changePassword = (state = initialState, action = {}) => {
    switch (action.type) {
      case 'CHANGE_PASSWORD_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'CHANGE_PASSWORD_SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.payload
        };
      case 'CHANGE_PASSWORD_ERROR':
        return {
          ...state,
          loading: false,
          isLogin: false,
          data:[],
          error: action.payload
        };
      default:
        return state
    }
  };

  const changePin = (state = initialState, action = {}) => {
    switch (action.type) {
      case 'CHANGE_PIN_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'CHANGE_PIN_SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.payload
        };
      case 'CHANGE_PIN_ERROR':
        return {
          ...state,
          loading: false,
          isLogin: false,
          data:[],
          error: action.payload
        };
      default:
        return state
    }
  };




  export{
    DeletePhone,
    AddPhone,
    changePassword,
    changePin
  } 
  