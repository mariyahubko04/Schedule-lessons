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
  const { data } = response;

  return data;
};

export const setRegistration = async (param) => {
  const response = await axios.post(`/register`, param);
  const { data } = response;

  return data;
};

export const getAllSubjects = async () => {
  const response = await axios.get(`/subject`);
  const { data } = response;

  return data;
};

export const getAllTeachers = async () => {
  const response = await axios.get(`users/teachers`);
  const { data } = response;

  return data;
};

export const getAllCabinets = async () => {
  const response = await axios.get(`/audience`);
  const { data } = response;

  return data;
};

export const getAllAcademicStatus = async () => {
  const response = await axios.get(`/academicStatus`);
  const { data } = response;

  return data;
};

export const getAllLessonTypes = async () => {
  const response = await axios.get(`/lessonType`);
  const { data } = response;

  return data;
};

export const setProfileInfo = async (param) => {
  const user = sessionStorage.getItem('user');
  const userInfo= JSON.parse(user);
  const { token, email } = userInfo;
  const response = await axios.post(`/profile`, param, {
    headers: {
      "X-Auth-Token": token,
      "X-Auth-email": email
    }
  });
  const { data } = response;

  return data;
};

export const setNewLesson = async (param) => {
  const user = sessionStorage.getItem('user');
  const userInfo= JSON.parse(user);
  const { token, email } = userInfo;
  const response = await axios.post(`/schedule`, param, {
    headers: {
      "X-Auth-Token": token,
      "X-Auth-email": email
    }
  });
  const { data } = response;

  return data;
};

export const editLesson = async (id, param) => {
  const user = sessionStorage.getItem('user');
  const userInfo= JSON.parse(user);
  const { token, email } = userInfo;
  const response = await axios.put(`/schedule/${id}`, param, {
    headers: {
      "X-Auth-Token": token,
      "X-Auth-email": email
    }
  });
  const { data } = response;

  return data;
};

export const deleteLesson = async (id) => {
  const user = sessionStorage.getItem('user');
  const userInfo= JSON.parse(user);
  const { token, email } = userInfo;
  const response = await axios.delete(`/schedule/${id}`, {
    headers: {
      "X-Auth-Token": token,
      "X-Auth-email": email
    }
  });
  const { data } = response;

  return data;
};
