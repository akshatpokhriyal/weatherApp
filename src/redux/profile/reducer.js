import {
  ADD_PROFILE_DATA,
  GET_PROFILE_DATA,

  ADD_CAR_DATA,
  GET_CAR_DATA,

  ADD_CAR_HORSEPOWER,
  GET_CAR_HORSEPOWER,
  ADD_CAR_COLOR,
  GET_CAR_COLOR,
} from "../../Constants/actionTypes";
const initialState = {
  profileData: {},
  carData:{carData:[],data:{make:[],model:[],trim:[]}},
  colorOptions:[],
  horsepowerOptions:[]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PROFILE_DATA:
      return {
        ...state,
        profileData: action.payload
      };
    case GET_PROFILE_DATA:
      return {
        ...state
      };
      case ADD_CAR_DATA:
        return {
          ...state,
          carData: action.payload
        };
      case GET_CAR_DATA:
        return {
          ...state
        };
        case ADD_CAR_HORSEPOWER:
          return {
            ...state,
            horsepowerOptions: action.payload
          };
        case GET_CAR_HORSEPOWER:
          return {
            ...state
          };
          case ADD_CAR_COLOR:
            return {
              ...state,
              colorOptions: action.payload
            };
          case GET_CAR_COLOR:
            return {
              ...state
            };
    default:
      return state;
  }
}
