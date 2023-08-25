import { USER_AUTH } from "../constants/constants";

const initialState = {
  isAuth: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };
      default: return state
  }
};



