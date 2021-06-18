import axios from 'axios';

const URL = 'https://easyschedule.tk/api';

axios.defaults.baseURL = URL;


const getGroup = groups => ({
  type: 'GET_GROUPS',
  groups
});

export const getGroups = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`/group`);
      dispatch(getGroup(response.data.data));
      return response.data.data;
    } catch (e) {
      throw new Error('Could not retrieve groups...');
    }
  };
};


const getSheduleByGroups = shedule => ({
  type: 'GET_SHEDULE_BU_GROUP',
  shedule
});

export const getSheduleByGroup = (idGroup) => {
  return async dispatch => {
    try {
      const response = await axios.get(`/schedule/group/${idGroup}`);
      dispatch(getSheduleByGroups(response.data.data));
      return response.data.data;
    } catch (e) {
      throw new Error('Could not retrieve shedule...');
    }
  };
};


const getSubject = subjects => ({
  type: 'GET_SUBJECTS',
  subjects
});

export const getAllSubjects = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`/subject`);
      dispatch(getSubject(response.data.data));
      return response.data.data;
    } catch (e) {
      throw new Error('Could not retrieve subjects...');
    }
  };
};


const getTeacher = teachers => ({
  type: 'GET_TEACHERS',
  teachers
});

export const getAllTeachers = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`/users/teachers`);
      dispatch(getTeacher(response.data.data));
      return response.data.data;
    } catch (e) {
      throw new Error('Could not retrieve cabinets...');
    }
  };
};


const getCabinet = cabinets => ({
  type: 'GET_CABINETS',
  cabinets
});

export const getAllCabinets = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`/audience`);
      dispatch(getCabinet(response.data.data));
      return response.data.data;
    } catch (e) {
      throw new Error('Could not retrieve subjects...');
    }
  };
};


const getStatus = academicStatus => ({
  type: 'GET_ACADEMIC_STATUS',
  academicStatus
});

export const getAllAcademicStatus = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`/academicStatus`);
      dispatch(getStatus(response.data.data));
      return response.data.data;
    } catch (e) {
      throw new Error('Could not retrieve academic status...');
    }
  };
};


const getLessonTypes = academicStatus => ({
  type: 'GET_LESSON_TYPE',
  academicStatus
});

export const getAllLessonTypes = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`/lessonType`);
      dispatch(getLessonTypes(response.data.data));
      return response.data.data;
    } catch (e) {
      throw new Error('Could not retrieve lesson type...');
    }
  };
};


const setLesson = lesson => ({
  type: "SET_NEW_LESSON",
  lesson
});

export const setNewLesson = (param) => {
  const user = sessionStorage.getItem('user');
  const userInfo = JSON.parse(user);
  const { token, email } = userInfo;

  return async dispatch => {
    try {
      const response = await axios({
        url: `/schedule`,
        method: "post",
        data: param,
        headers: {
          "X-Auth-Token": token,
          "X-Auth-email": email
        }
      });

      dispatch(setLesson(response.data.data));
    } catch (e) {
      throw new Error(getErrors(e));
    }
  };
};


const editLessons = lesson => ({
  type: "EDIT_LESSON",
  lesson
});

export const editLesson = (id, param) => {
  const user = sessionStorage.getItem('user');
  const userInfo = JSON.parse(user);
  const { token, email } = userInfo;

  return async dispatch => {
    try {
      const response = await axios({
        url: `/schedule/${id}`,
        method: "put",
        data: param,
        headers: {
          "X-Auth-Token": token,
          "X-Auth-email": email
        }
      });

      dispatch(editLessons(response.data.data));
      return response.data;
    } catch (e) {
      throw new Error(getErrors(e));
    }
  };
};


const setNewSubject = subject => ({
  type: "SET_NEW_SUBJECT",
  subject
});

export const setNewSubjectsInServer = (param) => {
  const user = sessionStorage.getItem('user');
  const userInfo = JSON.parse(user);
  const { token, email } = userInfo;

  return async dispatch => {
    try {
      const response = await axios({
        url: `/subject`,
        method: "post",
        data: param,
        headers: {
          "X-Auth-Token": token,
          "X-Auth-email": email
        }
      });

      dispatch(setNewSubject(response.data.data));
      return response.data;
    } catch (e) {
      throw new Error(getErrors(e));
    }
  };
};


const editSubj = subject => ({
  type: "EDIT_SUBJECT",
  subject
});

export const editSubject = (id, param) => {
  const user = sessionStorage.getItem('user');
  const userInfo = JSON.parse(user);
  const { token, email } = userInfo;

  return async dispatch => {
    try {
      const response = await axios({
        url: `/subject/${id}`,
        method: "put",
        data: param,
        headers: {
          "X-Auth-Token": token,
          "X-Auth-email": email
        }
      });

      dispatch(editSubj(response.data.data));
      return response.data.data;
    } catch (e) {
      throw new Error(getErrors(e));
    }
  };
};


const deleteSubj = subject => ({
  type: "DELETE_SUBJECT",
  subject
});

export const deleteSubject = (id, param) => {
  const user = sessionStorage.getItem('user');
  const userInfo = JSON.parse(user);
  const { token, email } = userInfo;

  return async dispatch => {
    try {
      const response = await axios({
        url: `/subject/${id}`,
        method: "delete",
        data: param,
        headers: {
          "X-Auth-Token": token,
          "X-Auth-email": email
        }
      });

      dispatch(deleteSubj(id));
      return response.data;
    } catch (e) {
      throw new Error(getErrors(e));
    }
  };
};


const setCabinet = cabinet => ({
  type: "SET_NEW_CABINET",
  cabinet
});

export const setNewCabinet = (param) => {
  const user = sessionStorage.getItem('user');
  const userInfo = JSON.parse(user);
  const { token, email } = userInfo;

  return async dispatch => {
    try {
      const response = await axios({
        url: `/audience`,
        method: "post",
        data: param,
        headers: {
          "X-Auth-Token": token,
          "X-Auth-email": email
        }
      });

      dispatch(setCabinet(response.data));
      return response.data;
    } catch (e) {
      throw new Error(getErrors(e));
    }
  };
};


const editCabinets = cabinet => ({
  type: "EDIT_CABINET",
  cabinet
});

export const editCabinet = (id, param) => {
  const user = sessionStorage.getItem('user');
  const userInfo = JSON.parse(user);
  const { token, email } = userInfo;

  return async dispatch => {
    try {
      const response = await axios({
        url: `/audience/${id}`,
        method: "put",
        data: param,
        headers: {
          "X-Auth-Token": token,
          "X-Auth-email": email
        }
      });

      dispatch(editCabinets(response.data));
      return response.data;
    } catch (e) {
      throw new Error(getErrors(e));
    }
  };
};


const editTeacher = teacher => ({
  type: "EDIT_TEACHERS",
  teacher
});

export const editTeachers = (id, param) => {
  const user = sessionStorage.getItem('user');
  const userInfo = JSON.parse(user);
  const { token, email } = userInfo;

  return async dispatch => {
    try {
      const response = await axios({
        url: `/users/teacher/${id}`,
        method: "put",
        data: param,
        headers: {
          "X-Auth-Token": token,
          "X-Auth-email": email
        }
      });

      dispatch(editTeacher(response.data.data));
      return response.data.data;
    } catch (e) {
      throw new Error(getErrors(e));
    }
  };
};


const deleteCabinets = cabinet => ({
  type: "DELETE_CABINETS",
  cabinet
});

export const deleteCabinet = (id, param) => {
  const user = sessionStorage.getItem('user');
  const userInfo = JSON.parse(user);
  const { token, email } = userInfo;

  return async dispatch => {
    try {
      const response = await axios({
        url: `/audience/${id}`,
        method: "delete",
        data: param,
        headers: {
          "X-Auth-Token": token,
          "X-Auth-email": email
        }
      });

      dispatch(deleteCabinets(id));
      return response.data;
    } catch (e) {
      throw new Error(getErrors(e));
    }
  };
};


const deleteUser = teacher => ({
  type: "DELETE_TEACHERS",
  teacher
});

export const deleteUsers = (id, param) => {
  const user = sessionStorage.getItem('user');
  const userInfo = JSON.parse(user);
  const { token, email } = userInfo;

  return async dispatch => {
    try {
      const response = await axios({
        url: `/users/${id}`,
        method: "delete",
        data: param,
        headers: {
          "X-Auth-Token": token,
          "X-Auth-email": email
        }
      });

      dispatch(deleteUser(id));
      return response.data;
    } catch (e) {
      throw new Error(getErrors(e));
    }
  };
};


const deleteLessons = lesson => ({
  type: "DELETE_LESSONS",
  lesson
});

export const deleteLesson = (id, param) => {
  const user = sessionStorage.getItem('user');
  const userInfo = JSON.parse(user);
  const { token, email } = userInfo;

  return async dispatch => {
    try {
      const response = await axios({
        url: `/schedule/${id}`,
        method: "delete",
        data: param,
        headers: {
          "X-Auth-Token": token,
          "X-Auth-email": email
        }
      });

      dispatch(deleteLessons(id));
      return response.data;
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