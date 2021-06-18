
const user = sessionStorage.getItem("user");
const initialState = user ? JSON.parse(user) : {};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
    case 'REGISTRATION_USER':
      return action.userInfo;
    case 'SET_USER_INFO':
      return action.userInfo;
    default:
      return state;
  }
};

export default usersReducer;