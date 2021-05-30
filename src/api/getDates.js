import axios from 'axios';
const URL = 'https://easyschedule.tk/api';

axios.defaults.baseURL = URL;

export const getGroups = async () => {
  const response = await axios.get('/group');
  const { data } = await response.data;

  return data;
};

export const getSheduleByGroup = async (idGroup) => {
  const response = await axios.get(`/schedule/group/${idGroup}`);
  const { data } = await response.data;

  return data;
};