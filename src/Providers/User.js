import axios from 'react-native-axios'
import { createInstance, storeData, getData, showToastMessage, getFormData } from './functions'
import { baseApiUrl } from '../Constants/defaultValues'
import NavigationService from '../Providers/navigationService'
import AsyncStorage from '@react-native-community/async-storage'

export const USER_SIGN_UP = (data, navigation, addtoast, addIsloading) => {
  addIsloading(true)

  const payload = getFormData(data)
  fetch(baseApiUrl + "/App/User", {
    method: 'POST',
    body: payload
  })
    .then((response) => response.json())
    .then(res => {
      addIsloading(false)
      if (res.error_code === 200) {
        storeData("user_email", JSON.stringify(res.result.user_email))
        storeData("user_name", JSON.stringify(res.result.user_firstname))
        storeData("user_mobile", JSON.stringify(res.result.user_mobile))
        navigation.navigate("OTP")
      } else if (res.error_code === 0) {
        showToastMessage(addtoast, "User already registered");

      }
    })
    .catch(err => {
      addIsloading(false)
      showToastMessage(addtoast, "Something Went Wrong");
    })

}
export const USER_FORGOT_PASSWORD = (email, addtoast, navigation,addIsloading) => {
  addIsloading(true)

  const payload = getFormData({ method: "forgotPin", user_email: email })
  console.log(payload)
  fetch(baseApiUrl + "/App/User", {
    method: 'POST',
    body: payload
  })
    .then((response) => response.json())
    .then(res => {
      addIsloading(false)

      console.log(res)
      if (res.error_code === 200) {
        showToastMessage(addtoast, res.error_string);
        navigation.navigate("Login")
      } else if (res.error_code === 0) {
        showToastMessage(addtoast, res.error_string);

      }
    })
    .catch(err => {
      console.log(err)
      addIsloading(false)

      showToastMessage(addtoast, "Something Went Wrong");
    })
}

export const USER_VERIFY_OTP = (data, navigation, addtoast, addIsloading) => {
  getData("fcm_token")
  .then(fcm_token=>{
    const payload = getFormData({gcm_id:fcm_token,...data})

    fetch(baseApiUrl + "/App/User", {
      method: 'POST',
      body: payload
    })
      .then((response) => response.json())
      .then(res => {
        console.log(res)
        addIsloading(false)
        if (res.error_code === 200) {
          showToastMessage(addtoast, "OTP Verification Done");
          storeData("user_data", JSON.stringify(res.result))
          storeData("user_email", JSON.stringify(res.result.user_email))
          storeData("user_name", JSON.stringify(res.result.user_firstname))
          storeData("user_mobile", JSON.stringify(res.result.user_mobile))
          storeData("user_id", JSON.stringify(res.result.user_id))
          storeData("unique_id", JSON.stringify(res.result.unique_id))
          storeData("token", JSON.stringify(res.result.auth_token))
          storeData("user_pic", JSON.stringify(res.result.user_pic))
  
          navigation.navigate("Home")
        } else if (res.error_code === 0) {
          showToastMessage(addtoast, "Incorrect OTP");
          addIsloading(false)
  
        }
      })
      .catch(err => {
        addIsloading(false)
  
        showToastMessage(addtoast, "Something Went Wrong");
  
      })
  })
  .catch(err=>console.log(err))

  
}

export const USER_LOGIN = (data, navigation, addtoast, addIsloading,addProfileData,addAlarmTime,addAlarm) => {
   addIsloading(true) 
  getData("fcm_token")
  .then(fcm_token=>{
    console.log("fcm token ??????????",fcm_token)
    const payload = getFormData({gcm_id:fcm_token,...data})
    fetch(baseApiUrl + "/App/User", {
      method: 'POST',
      body: payload
    })
      .then((response) => response.json())
      .then(res => {
        console.log("response", payload)
        addIsloading(false)
        if (res.error_code == 200) {
          // showToastMessage(addtoast, "User Logged In");
          addProfileData(res.result)
          storeData("user_data", JSON.stringify(res.result))
          storeData("user_email", JSON.stringify(res.result.user_email))
          storeData("user_name", JSON.stringify(res.result.user_firstname))
          storeData("user_mobile", JSON.stringify(res.result.user_mobile))
          storeData("user_id", JSON.stringify(res.result.user_id))
          storeData("unique_id", JSON.stringify(res.result.unique_id))
          storeData("token", JSON.stringify(res.result.auth_token))
          storeData("user_pic", JSON.stringify(res.result.user_pic))
          addAlarm(res.result.user_alarm)
          addAlarmTime(res.result.alarm_time)
          navigation.navigate("Event")
        } else if (res.error_code === 0) {
          showToastMessage(addtoast, res.error_string);
        } else if (res.error_code == 300) {
          storeData("user_email", JSON.stringify(res.result.user_email))
          storeData("user_name", JSON.stringify(res.result.user_firstname))
          storeData("user_mobile", JSON.stringify(res.result.user_mobile))
          showToastMessage(addtoast, res.error_string);
          navigation.navigate("OTP")
        }
  
      })
      .catch(err => {
        addIsloading(false)
        console.log("err", err)
        showToastMessage(addtoast, "Something Went Wrong");
      })

  })
  .catch(err=>console.log(err))
 
}

export const USER_CHECK = (data, navigation, addtoast, user) => {

  getData("fcm_token")
  .then(fcm_token=>{
    const payload = getFormData({gcm_id:fcm_token,...data})


    fetch(baseApiUrl + "/App/User", {
      method: 'POST',
      body: payload
    })
      .then((response) => response.json())
      .then(res => {
        console.log("user check", res)
        if (res.error_code === 200) {
          // showToastMessage(addtoast, "User Logged In");
          storeData("user_data", JSON.stringify(res.result))
          storeData("user_email", JSON.stringify(res.result.user_email))
          storeData("user_name", JSON.stringify(res.result.user_firstname))
          storeData("user_mobile", JSON.stringify(res.result.user_mobile))
          storeData("user_id", JSON.stringify(res.result.user_id))
          storeData("unique_id", JSON.stringify(res.result.unique_id))
          storeData("token", JSON.stringify(res.result.auth_token))
          storeData("user_pic", JSON.stringify(res.result.user_pic))
  
          navigation.navigate("Home")
          console.log(res)
        } else if (res.error_code === 0) {
          // showToastMessage(addtoast, res.error_string);
          console.log(res)
          navigation.navigate("Register", { user })
  
        }
      })
      .catch(err => {
        console.log(err)
        showToastMessage(addtoast, "Something Went Wrong");
      })
  })
  .catch(err=>console.log(err))
 
}

export const USER_PROFILE_DATA = (addProfileData) => {
  getData("user_id")
    .then(userid => {
      getData("token")
        .then(token => {
          const payload = getFormData({ method: "myProfile", user_id: userid })
          fetch(baseApiUrl + "/App/User", {
            method: 'POST',
            headers: new Headers({
              'token': token
            }),
            body: payload
          })
            .then((response) => response.json())
            .then(res => {
              console.log(">>>>>>>>>>>>>>>>>>", res)
              if (res.error_code === 200) {
                addProfileData(res.result)
              }
              else if (res.error_code === 0) {
                alert(res.error_string);
                AsyncStorage.removeItem("user_data");
                NavigationService.navigate("Login")
              }
            })
            .catch(err => {
              console.log("api error", err)
            })

        })
        .catch(err => console.log("token fetch error", err))

    })
    .catch(err => console.log("user id fetch error", err))
}


export const USER_EDIT_PROFILE = (data, addProfileData, addtoast, image, addIsloading) => {
  getData("user_id")
    .then(userid => {
      getData("token")
        .then(token => {

          const payload = getFormData({ method: "editProfile", user_id: userid, ...data })

          //  image === "" ?console.log(">>>>>>>>no image there"):payload.append('user_pic', {
          //   uri: image.uri, 
          //   type: image.type,
          //   name: token+userid    
          // });
          if (image.uri !== "") {
            payload.append('user_pic', {
              uri: image.uri,
              type: image.type,
              name: token + userid
            });
          }

          console.log(">>>>>>>>>>>>>>>form data", payload)
          fetch(baseApiUrl + "/App/User", {
            method: 'POST',
            headers: new Headers({
              'token': token
            }),
            body: payload
          })
            .then((response) => response.json())
            .then(res => {
              console.log(res)
              addIsloading(false)
              if (res.error_code === 200) {
                showToastMessage(addtoast, "Details updated successfully");
                addProfileData(res.result);
                storeData("user_data", JSON.stringify(res.result))
                storeData("user_email", JSON.stringify(res.result.user_email))
                storeData("user_name", JSON.stringify(res.result.user_firstname))
                storeData("user_mobile", JSON.stringify(res.result.user_mobile))
                storeData("user_id", JSON.stringify(res.result.user_id))
                storeData("unique_id", JSON.stringify(res.result.unique_id))
                storeData("token", JSON.stringify(res.result.auth_token))
                storeData("user_pic", JSON.stringify(res.result.user_pic))
                NavigationService.navigate("Profile")
              } else if (res.error_code === 0) {
                addIsloading(false)

                showToastMessage(addtoast, res.error_string);
              }
            })
            .catch(err => {
              addIsloading(false)

              showToastMessage(addtoast, "Something Went Wrong");
              console.log(err)
            })

        })
        .catch(err => {
          addIsloading(false)

          console.log("token fetch error", err)
        })

    })
    .catch(err => {
      addIsloading(false)

      console.log("user id fetch error", err)
    })


}

export const USER_CHANGE_PASSWORD = (data, addtoast, addIsloading) => {
  addIsloading(true)
  getData("user_id")
    .then(userid => {
      getData("token")
        .then(token => {
          const payload = getFormData({ method: "changePin", user_id: userid, ...data })
          fetch(baseApiUrl + "/App/User", {
            method: 'POST',
            headers: new Headers({
              'token': token
            }),
            body: payload
          })
            .then((response) => response.json())
            .then(res => {
              addIsloading(false)
              console.log(res)
              if (res.error_code === 200) {
                showToastMessage(addtoast, "Password changed successfully");
                NavigationService.navigate("Settings")
              } else if (res.error_code === 0) {
                showToastMessage(addtoast, res.error_string);
              }
            })
            .catch(err => {
              addIsloading(false)

              showToastMessage(addtoast, "Something Went Wrong");
            })

        })
        .catch(err => {
          addIsloading(false)
          console.log("token fetch error", err)
        })

    })
    .catch(err => {
      addIsloading(false)
      console.log("user id fetch error", err)
    })
}

export const GET_CAR = (addCarDetails, year,company) => {
  getData("user_id")
    .then(userid => {
      getData("token")
        .then(token => {
          const payload = getFormData({ method: "getcarModel", user_id: userid, model_year: year })
          fetch(baseApiUrl + "/App/User", {
            method: 'POST',
            headers: new Headers({
              'token': token
            }),
            body: payload
          })
            .then((response) => response.json())
            .then(res => {
              if (res.error_code === 200) {
                // console.log("????????????????????????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>???????????????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>???????????????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>???????????????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>???????????????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>???????????????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>???????????????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>???????????????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>???????????????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>???????????????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>???????????????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>???????????????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>???????????????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>???????????????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>???????????????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>???????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",company,year)
                
                // year?console.log("year yes"):console.log("year no")
                // company?console.log("compa yes"):console.log("comp   no")

            
                const list = year?res.result.filter(item => item.model_year== year):res.result
                
                const list2 = company? res.result.filter(item => item.model_make_id== company):res.result


                //  console.log(list2)
                
                const make = []
                const _make = []
                const model = []
                const _model = []
                const trim = []
                const _trim = []
                list.forEach(element => {   

                  if (!_make.includes(element.model_make_id)) {
                    _make.push(element.model_make_id)
                    make.push({ label: element.model_make_id, value: element.model_make_id })
                  }                 

                });
                list2.forEach(element => {   
                 
                  if (!_model.includes(element.model_name)) {                  
                      _model.push(element.model_name)
                      model.push({ label: element.model_name, value: element.model_name })                  
                   
                  }
                  if (!_trim.includes(element.model_trim)) {
                    _trim.push(element.model_trim)
                    trim.push({ label: element.model_trim, value: element.model_trim })
                  }

                });
                // console.log(model)
                addCarDetails({ list, data: { make, model, trim } })
              }
            })
            .catch(err => {
              // showToastMessage(addtoast, "Something Went Wrong");
              console.log(err)
            })

        })
        .catch(err => console.log("token fetch error", err))

    })
    .catch(err => console.log("user id fetch error", err))
}

export const GET_HORSEPOWER = (addHorsepower) => {
  getData("user_id")
    .then(userid => {
      getData("token")
        .then(token => {
          const payload = getFormData({ method: "getcarhorspower", user_id: userid })
          fetch(baseApiUrl + "/App/User", {
            method: 'POST',
            headers: new Headers({
              'token': token
            }),
            body: payload
          })
            .then((response) => response.json())
            .then(res => {
              console.log(res)
              if (res.error_code === 200) {
                 const data = res.result
                const horsepower =[]
                data.forEach(element => {
                  horsepower.push({ label: element.horspower , value: element.horspower })
                });
               addHorsepower(horsepower)
              } else if (res.error_code === 0) {
                 //showToastMessage(addtoast, res.error_string);
                 console.log("error")
              }
            })
            .catch(err => {

              console.log("error", err)
            })

        })
        .catch(err => {
          // addIsloading(false)
          console.log("token fetch error", err)
        })

    })
    .catch(err => {
      // addIsloading(false)
      console.log("user id fetch error", err)
    })
}



export const GET_COLOR= (addColor) => {
  getData("user_id")
    .then(userid => {
      getData("token")
        .then(token => {
          const payload = getFormData({ method: "getColorList", user_id: userid })
          fetch(baseApiUrl + "/App/User", {
            method: 'POST',
            headers: new Headers({
              'token': token
            }),
            body: payload
          })
            .then((response) => response.json())
            .then(res => {
              console.log(res)
              if (res.error_code === 200) {
                 const data = res.result
                const color =[]
                data.forEach(element => {
                  color.push({ label: element.colorName , value: element.colorName })
                });
                addColor(color)
              } else if (res.error_code === 0) {
                 //showToastMessage(addtoast, res.error_string);
                 console.log("error")
              }
            })
            .catch(err => {

              console.log("error", err)
            })

        })
        .catch(err => {
          // addIsloading(false)
          console.log("token fetch error", err)
        })

    })
    .catch(err => {
      // addIsloading(false)
      console.log("user id fetch error", err)
    })
}

export const SET_ALARM= (status,time) => {
  getData("user_id")
    .then(userid => {
      getData("token")
        .then(token => {
          const payload = getFormData({ method: "setAlarm", user_id: userid,status,time })
          fetch(baseApiUrl + "/App/User", {
            method: 'POST',
            headers: new Headers({
              'token': token
            }),
            body: payload
          })
            .then((response) => response.json())
            .then(res => {
              console.log(res)
              if (res.error_code === 200) {
                status ? alert("alarm set"): alert("alarm off")
              } else if (res.error_code === 0) {
                 //showToastMessage(addtoast, res.error_string);
                 console.log("error")
              }
            })
            .catch(err => {

              console.log("error", err)
            })

        })
        .catch(err => {
          // addIsloading(false)
          console.log("token fetch error", err)
        })

    })
    .catch(err => {
      // addIsloading(false)
      console.log("user id fetch error", err)
    })
}
