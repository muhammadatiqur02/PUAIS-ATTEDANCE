import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PROFILE, ATD_HOME, DEVELOPER } from '../constants/routeName'; // Add DEVELOPER constant

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import ProfileScreen from '../screens/teacher/ProfileScreen';
import { AttendanceHomeScreen } from '../screens/teacher/attendance';
import DeveloperScreen from '../screens/teacher/DeveloperScreen'; // Import the DeveloperScreen

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  
  const options = {
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    headerShown: false,
    tabBarStyle: {
      height: 60,
      shadowOffset: { width: 0, height: 1 },
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
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{ color: focused ? colors.primary : color, fontSize: focused ? 14 : 12 }}>{PROFILE}</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="account" color={focused ? colors.primary : colors.gray} size={focused ? 30 : 25} />
          ),
        }} 
      />
      <Tab.Screen 
        name={ATD_HOME} 
        component={AttendanceHomeScreen} 
        options={{
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{ color: focused ? colors.primary : color, fontSize: focused ? 14 : 12 }}>{ATD_HOME}</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="view-grid" color={focused ? colors.primary : colors.gray} size={focused ? 30 : 25} />
          ),
        }} 
      />
      {/* Add the DeveloperScreen tab */}
      <Tab.Screen 
        name={DEVELOPER} 
        component={DeveloperScreen} 
        options={{
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{ color: focused ? colors.primary : color, fontSize: focused ? 14 : 12 }}>{DEVELOPER}</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="code-tags" color={focused ? colors.primary : colors.gray} size={focused ? 30 : 25} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}
