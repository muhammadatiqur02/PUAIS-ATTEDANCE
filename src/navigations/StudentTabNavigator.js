import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ATD_HOME, PROFILE } from '../constants/routeName';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import ProfileScreen from '../screens/student/ProfileScreen';
import ViewAttendanceScreen from '../screens/student/ViewAttendanceScreen';
import DeveloperScreen from '../screens/student/DeveloperScreen'; // Ensure correct import path

export default function StudentTabNavigator() {
    const Tab = createBottomTabNavigator();
    const options = {
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: false,
        tabBarStyle: {
            height: 60,
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
        }
    };

    return (
        <Tab.Navigator screenOptions={options} initialRouteName={PROFILE}>
            <Tab.Screen 
                name={PROFILE} 
                component={ProfileScreen}  
                options={{
                    tabBarLabel: ({focused, color, size}) => (
                        <Text style={{color: focused ? colors.primary : color, fontSize: focused ? 14 : 12}}>{PROFILE}</Text>
                    ),
                    tabBarIcon:({focused}) => (
                        <MaterialCommunityIcons name="account" color={focused ? colors.primary : colors.gray} size={focused ? 30 : 25}/>
                    ),
                }}
            />
      
            <Tab.Screen 
                name={ATD_HOME} 
                component={ViewAttendanceScreen} 
                options={{
                    tabBarLabel: ({focused, color, size}) => (
                        <Text style={{color: focused ? colors.primary : color, fontSize: focused ? 14 : 12}}>{ATD_HOME} History</Text>
                    ),
                    tabBarIcon:({focused}) => (
                        <MaterialCommunityIcons name="view-grid" color={focused ? colors.primary : colors.gray} size={focused ? 30 : 25}/>
                    ),
                }}
            />

            <Tab.Screen 
                name="Developer"  // Make sure the name is unique and corresponds to the correct screen
                component={DeveloperScreen}  // Make sure DeveloperScreen is imported correctly
                options={{
                    tabBarLabel: ({focused, color, size}) => (
                        <Text style={{color: focused ? colors.primary : color, fontSize: focused ? 14 : 12}}>Developer</Text>
                    ),
                    tabBarIcon:({focused}) => (
                        <MaterialCommunityIcons name="code-tags" color={focused ? colors.primary : colors.gray} size={focused ? 30 : 25}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
