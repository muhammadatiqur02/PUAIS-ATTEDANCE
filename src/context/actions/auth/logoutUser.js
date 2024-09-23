import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGOUT_USER} from '../../../constants/actionTypes';

export default () => (dispatch) => {
 const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }
  
  removeValue();
  dispatch({
    type: LOGOUT_USER,
  });
};