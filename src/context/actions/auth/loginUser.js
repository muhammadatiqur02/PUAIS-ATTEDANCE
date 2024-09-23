import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from '../../../constants/actionTypes';

import {GLOBAL_BACKEND_URL} from '../../../constants/baseUrl'
import axios from 'axios';


export default  (form) => (dispatch) => {
  dispatch({type:LOGIN_LOADING});

  // const url = `${GLOBAL_BACKEND_URL}/Login/?user=${form.user}&pass=${form.pass}&loginType=${form.loginType}`;
  
  // axios.get(url).then((res) => {
  //     AsyncStorage.setItem('user', JSON.stringify(res.data));
  //     dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: res.data,
  //     });
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: LOGIN_FAIL,
  //       payload: err.response
  //         ? err.response.data
  //         : {error: 'Something went wrong, try agin'},
  //     });
  //   });
  let userToken;
       userToken=null;

  if(form.user=='user'&&form.pass=='pass'){
        userToken='success';
        try {
           AsyncStorage.setItem('userToken', userToken);
        } catch (error) {
          console.log(`error`, error)
        }
        dispatch({type:LOGIN_SUCCESS,id:form.user,token:userToken})
      }
};