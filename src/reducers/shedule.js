const initialState = {
  groups: [],
  shedules: [],
  teachers: [],
  cabinets: [],
  academicStatus: [],
  lessonType: []
};

const sheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_GROUPS':
      return {
        ...state,
        groups: action.groups,
      };
    case 'GET_SHEDULE_BU_GROUP':
      return {
        ...state,
        shedules: action.shedule,
      };
    case 'GET_SUBJECTS':
      return {
        ...state,
        subjects: action.subjects,
      };
    case 'GET_TEACHERS':
      return {
        ...state,
        teachers: action.teachers,
      };
    case 'GET_CABINETS':
      return {
        ...state,
        cabinets: action.cabinets,
      };
    case 'SET_NEW_LESSON':
      return {
        ...state,
        shedules: [...state.shedules, action.lesson],
      }
    case 'EDIT_LESSON':
      return {
        ...state,
        shedules: state.shedules.map(item => {
          if (item.id === action.lesson.id) return action.lesson;
          return item;
        })
      }
    case 'DELETE_LESSONS':
      return {
        ...state,
        shedules: state.shedules.filter(item => item.id != action.lesson),
      }
    case 'EDIT_SUBJECT':
      return {
        ...state,
        subjects: state.subjects.map(item => {
          if (item.id == action.subject.id) return action.subject;
          return item;
        })
      }
    case 'SET_NEW_SUBJECT':
      return {
        ...state,
        subjects: [...state.subjects, action.subject],
      }
    case 'DELETE_SUBJECT':
      return {
        ...state,
        subjects: state.subjects.filter(item => item.id != action.subject),
      }
    case 'EDIT_TEACHERS':
      return {
        ...state,
        teachers: state.teachers.map(item => {
          if (item.id == action.teacher.id) return action.teacher;
          return item;
        })
      }
    case 'DELETE_TEACHERS':
      return {
        ...state,
        teachers: state.teachers.filter(item => item.id != action.teacher),
      }
    case 'DELETE_CABINETS':
      return {
        ...state,
        cabinets: state.cabinets.filter(item => item.id != action.cabinet),
      }
    case 'SET_NEW_CABINET':
      return {
        ...state,
        cabinets: [...state.cabinets, action.cabinet],
      }
    case 'EDIT_CABINET':
      return {
        ...state,
        cabinets: state.cabinets.map(item => {
          if (item.id == action.cabinet.id) return action.cabinet;
          return item;
        })
      }
    default:
      return state;
  }
};

export default sheduleReducer;