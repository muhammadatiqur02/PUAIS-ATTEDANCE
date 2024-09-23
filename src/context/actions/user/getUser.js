
import {
    USER_LOADING,GET_USER_SUCCESS,GET_USER_FAILD
   } from '../../../constants/actionTypes';
   

   import AsyncStorage from '@react-native-async-storage/async-storage';
   
   
   export default () => async (dispatch) => {
    
       dispatch({type:USER_LOADING});
   console.log('triger getUser')
       try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const data = JSON.parse(user);
          userDispatch({type:GET_USER_SUCCESS,payload:data});
          console.log('get data success');
        }
       } catch (error) {
        userDispatch({type:GET_USER_FAILD});
       }
   
   
   };