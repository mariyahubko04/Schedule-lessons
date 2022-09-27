import axios from 'axios';

const URL = 'https://schedule-back.tk/web-schedule/api';

axios.defaults.baseURL = URL;

const loginUser = userInfo => ({
  type: 'LOGIN_USER',
  userInfo
});

export const setLogin = (param) => {
  return async dispatch => {
    try {
      const response = await axios.post(`/login`, param);
      dispatch(loginUser(response.data.data));
      return response.data.data;
    } catch (e) {
      throw new Error(e.response.data.error);
    }
  };
};

const registrationUser = userInfo => ({
  type: "REGISTRATION_USER",
  userInfo
});

export const setRegistration = param => {
  return async dispatch => {
    try {
      const response = await axios({
        url: `${URL}/register`,
        method: "post",
        data: param
      });

      dispatch(registrationUser(response.data.data));
      return response.data.data;
    } catch (e) {
      throw new Error(getErrors(e));
    }
  };
};

const editUserInfo = userInfo => ({
  type: "SET_USER_INFO",
  userInfo
});

export const setProfileInfo = param => {
  const user = sessionStorage.getItem('user');
  const userInfo = JSON.parse(user);
  const { token, email } = userInfo;

  return async dispatch => {
    try {
      const response = await axios({
        url: `${URL}/profile`,
        method: "post",
        data: param,
        headers: {
          "X-Auth-Token": token,
          "X-Auth-email": email
        }
      });

      dispatch(editUserInfo(response.data.data));
    } catch (e) {
      throw new Error(getErrors(e));
    }
  };
};

function getErrors(e) {
  const errors = Object.values(e.response.errors || e.response.data.errors);
  let textError = '';

  for (let i = 0; i < errors.length; i++) {
    textError += errors[i].join('; ');
  }

  return textError;
};
