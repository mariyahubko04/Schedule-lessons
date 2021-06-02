import axios from 'axios';

const URL = 'https://easyschedule.tk/api';

axios.defaults.baseURL = URL;

export const getGroups = async () => {
  const response = await axios.get('/group');
  const { data } = response.data;

  return data;
};

export const getSheduleByGroup = async (idGroup) => {
  const response = await axios.get(`/schedule/group/${idGroup}`);
  const { data } = response.data;

  return data;
};

export const setLogin = async (param) => {
  const response = await axios.post(`/login`, param);
  console.log('response', response);
  const { data } = response;

  return data;
};