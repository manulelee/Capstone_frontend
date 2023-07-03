import { SET_PROFILE } from "../actions";

const initialState = {
  profile: {
    id: "",
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    roles: [],
  },
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
