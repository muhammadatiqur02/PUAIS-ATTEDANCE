import React, { useEffect } from 'react'


import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import DashboardScreen from '../screens/student/DashboardScreen';
import ProfileScreen from '../screens/student/ProfileScreen';
// import TabNavigator from './TabNavigator'



import { 
    DASHBOARD, 
    PROFILE,
    TAB,  } from '../constants/routeName';
import StudentTabNavigator from './StudentTabNavigator';





const StudentNavigator = () => {
  const navigation = useNavigation();
  const Stack = createStackNavigator();
  const options = {
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerShown: false,
  }


  return (
    <Stack.Navigator screenOptions={options}>

     
      <Stack.Screen name={TAB} component={StudentTabNavigator} />
      <Stack.Screen name={PROFILE} component={ProfileScreen} />
      <Stack.Screen name={DASHBOARD} component={DashboardScreen} />
     

    </Stack.Navigator>
  )
}

export default StudentNavigator
