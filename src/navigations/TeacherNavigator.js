import React, { useEffect } from 'react'

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import ProfileScreen from '../screens/teacher/ProfileScreen';

import {RunningCourses,
    TakeAttendanceScreen,
    AttendanceHomeScreen,
    ViewCourseAtdScreen,
    StudentAtdDetailsScreen,CourseAtdBriefDetailsScreen} from '../screens/teacher/attendance';

import {

  PROFILE,

  ATD_RUNNING_COURSES,
  TAKE_ATTENDANCE,
  VIEW_COURSE_ATD,
  VIEW_STUDENT_ATD_DETAILS,
  ATD_HOME,
  VIEW_COURSE_ATD_BRIEF,
  VIEW_STUDENT_ATD_DETAILS_BRIEF,
  TAB,
  UPDATE_TODAY_ATTENDANCE

} from '../constants/routeName';
import StudentAtdBriefDetailsScreen from '../screens/teacher/attendance/StudentAtdBriefDetailsScreen';
import TabNavigator from './TabNavigator';
import UpdateTodayAtdScreen from '../screens/teacher/attendance/UpdateTodayAtdScreen';



const TeacherNavigator = () => {
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

      <Stack.Screen name={TAB} component={TabNavigator} />
      <Stack.Screen name={PROFILE} component={ProfileScreen} />
      <Stack.Screen name={ATD_HOME} component={AttendanceHomeScreen} />
      <Stack.Screen name={ATD_RUNNING_COURSES} component={RunningCourses} />
      <Stack.Screen name={TAKE_ATTENDANCE} component={TakeAttendanceScreen} />
      <Stack.Screen name={VIEW_STUDENT_ATD_DETAILS} component={StudentAtdDetailsScreen} />
      <Stack.Screen name={VIEW_COURSE_ATD} component={ViewCourseAtdScreen} />
      <Stack.Screen name={VIEW_COURSE_ATD_BRIEF} component={CourseAtdBriefDetailsScreen} />
      <Stack.Screen name={VIEW_STUDENT_ATD_DETAILS_BRIEF} component={StudentAtdBriefDetailsScreen} />
      <Stack.Screen name={UPDATE_TODAY_ATTENDANCE} component={UpdateTodayAtdScreen} />
      

    </Stack.Navigator>
  )
}

export default TeacherNavigator
