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



export const addProfileData = profileData => {
  return {
    type: ADD_PROFILE_DATA,
    payload: profileData
  };
};
export const getProfileData = () => {
  return {
    type: GET_PROFILE_DATA,
  };
};

export const addCarData = carData => {
  return {
    type: ADD_CAR_DATA,
    payload: carData
  };
};
export const getCarData= () => {
  return {
    type: GET_CAR_DATA
  };
};

export const addCarHorsepower = horsepowerOptions => {
  return {
    type: ADD_CAR_HORSEPOWER,
    payload: horsepowerOptions
  };
};
export const getCarHorsepower = () => {
  return {
    type: GET_CAR_HORSEPOWER
  };
};

export const addCarColor = colorOptions => {
  return {
    type: ADD_CAR_COLOR,
    payload: colorOptions
  };
};
export const getCarColor = () => {
  return {
    type: GET_CAR_COLOR
  };
};
