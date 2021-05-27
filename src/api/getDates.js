export const getDates = async() => {
  const url = 'http://easyschedule.tk/api/test';

  const response = await fetch(url);
  const data = await response.json();

  return data;
};