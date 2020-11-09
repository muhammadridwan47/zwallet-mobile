const initialState = {
    data: [],
    loading: false,
    temporary : []
  };
  
  const Transfer = (state = initialState, action = {}) => {
    switch (action.type) {
      case 'TRANSFER_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'TRANSFER_SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.payload
        };
      case 'TRANSFER_ERROR':
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

  export const TransferById = (state = initialState, action = {}) => {
    switch (action.type) {
      case 'TRANSFER_BYID_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'TRANSFER_BYID_SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.payload
        };
      case 'TRANSFER_BYID_ERROR':
        return {
          ...state,
          loading: false,
          isLogin: false,
          data:[],
          error: action.payload
        };
      case 'TRANSFER_TEMPORARY':
        return {
          ...state,
          temporary: action.payload
        };
      default:
        return state
    }
  };
  
  export const TransferSend = (state = initialState, action = {}) => {
    switch (action.type) {
      case 'TRANSFER_SEND_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'TRANSFER_SEND_SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.payload
        };
      case 'TRANSFER_SEND_ERROR':
        return {
          ...state,
          loading: false,
          isLogin: false,
          data:[],
          error: action.payload
        };
      case 'TRANSFER_TEMPORARY':
        return {
          ...state,
          temporary: action.payload
        };
      default:
        return state
    }
  };
  
  export default Transfer;

  