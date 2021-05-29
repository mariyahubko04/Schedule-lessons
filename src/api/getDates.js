import axios from 'axios';
const URL = 'http://easyschedule.tk/api';

axios.defaults.baseURL = URL;

export const getGroups = async () => {
  const response = await axios.get('/group');
  //const response = await fetch(url);
  console.log('response', response);
  const data = await response.data;

  return data;
};

export const getSheduleByGroup = async (idGroup) => {
  // //const url = `${URL}/schedule/group/${idGroup}`;

  // const response = axios({
  //   method: 'get',
  //   url: url
  // });

  // //const response = await fetch(url);
  // console.log('response', response);
  // const data = await response.json();

  // return data;
};