import axios from 'react-native-axios'
import AsyncStorage from "@react-native-community/async-storage";
import baseApiUrl from '../Constants/defaultValues'



export const createInstance = function (token) {
  const axiosInstance = axios.create({
    baseURL: baseApiUrl,
    headers: {
      token: token
    }
  });
  return axiosInstance;
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("error async", e);
  }
};

export const getData = async key => {
  try {
    let value = await AsyncStorage.getItem(key);
    console.log(value);
    return JSON.parse(value);
  } catch (e) {
    console.log("value fetched error", e);
  }
};

export const showToastMessage = (addtoast, msg) => {
  addtoast({ status: true, msg });
  setTimeout(() => {
    addtoast({ status: false, msg: "" });
  }, 2500);
};

export const getFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}