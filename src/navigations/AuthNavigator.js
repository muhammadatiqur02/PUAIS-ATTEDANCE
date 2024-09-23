import React from 'react'

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen'

import { LOGIN } from '../constants/routeName';


const RootNavigator = () => {

    const Stack = createStackNavigator();
    const options = {
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
    }
    return (
        <Stack.Navigator screenOptions={options}>
            
            
            <Stack.Screen name={LOGIN} component={LoginScreen} />
           
        </Stack.Navigator>
    )
}

export default RootNavigator
