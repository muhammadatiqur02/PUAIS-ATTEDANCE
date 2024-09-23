import React, { useEffect, useMemo } from 'react'
import { ActivityIndicator, Alert, View, Image, StyleSheet, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import StudentNavigator from './StudentNavigator';
import AuthNavigator from './AuthNavigator';
import TeacherNavigator from './TeacherNavigator';

import { AuthContext } from '../context';
import loginReducer from '../context/reducers/auth'
import authState from '../context/initialStates/authState'

import colors from '../theme/colors';

import { LOGIN_SUCCESS, LOGOUT_USER } from '../constants/actionTypes';


const AppNavContainer = () => {


  const [loginState, dispatch] = React.useReducer(loginReducer, authState);

  const authContext = useMemo(() => ({




    signIn: async (id, token, state, user) => {

      dispatch({ type: LOGIN_SUCCESS, id: id, token: token, state: state, user: user });

    },

    signOut: async () => {

      try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userState');
            await AsyncStorage.removeItem('user');
            dispatch({ type: LOGOUT_USER });
      
      } catch (error) {
        console.log(`error`, error);
        Alert.alert('LogOut Faild.', `${error.message}`);

      }

    }
    , loginState
  }), [loginState])



  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      let userState = null;
      let data = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        userState = await AsyncStorage.getItem('userState');
        const user = await AsyncStorage.getItem('user');
        data = JSON.parse(user);
      } catch (error) {
        console.log(`error`, error)
      }

      dispatch({ type: 'RETRIVE_TOKEN', token: userToken, state: userState, user: data })
    }, 1000);



  }, [])



  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white }}>

         <Text style={{fontSize:22,color:colors.black,textTransform:'capitalize'}}>PUAIS Attendance System</Text>
         
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
       
        <ActivityIndicator size="large" color={colors.primary} />
        
      </View>
    )
  }
  return (
    <>

      <AuthContext.Provider value={authContext}>
        <NavigationContainer>

          {loginState.userToken ? <>
            {
              loginState.userState == 'student' ?
                <StudentNavigator /> :   <TeacherNavigator /> 
            }

          </> : <AuthNavigator />}

        </NavigationContainer>
      </AuthContext.Provider>

    </>
  )
}
export default AppNavContainer;

const styles = StyleSheet.create({
  logo: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: 30
  },
})