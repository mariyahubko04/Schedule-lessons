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