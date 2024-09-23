
import {
 SESSION_LOADING,GET_SESSION_SUCCESS,GET_SESSION_FAILD
} from '../../../constants/actionTypes';

import {GLOBAL_BACKEND_URL} from '../../../constants/baseUrl'
import axios from 'axios';


export default  (user) => async (dispatch) => {
 
    dispatch({type:SESSION_LOADING});


  const url = `${GLOBAL_BACKEND_URL}/student/GetSession/?user=${user.Roll}&programID=${user.ProgramId}`
  await axios.get(url).then((res) => {
     dispatch({type:GET_SESSION_SUCCESS,payload:res.data})
   }).catch((err) => {
       
    dispatch({type:GET_SESSION_FAILD})
   })


};