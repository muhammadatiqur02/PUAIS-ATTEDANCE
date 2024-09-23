import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {  ATD_RUNNING_COURSES,
    TAKE_ATTENDANCE,
    VIEW_COURSE_ATD,
    VIEW_STUDENT_ATD_DETAILS,
    ATD_HOME,
    UPDATE_TODAY_ATTENDANCE
    
  
  } from '../../../constants/routeName';
import colors from '../../../theme/colors';
import Header from '../../../components/Header';
import { Title } from '../../../components/Apptext';
import Listitem from '../../../components/ListItem';

const task = [



    { name: TAKE_ATTENDANCE, icon: 'plus', navigate: ATD_RUNNING_COURSES, color: colors.primary,status:'take' },
    { name: VIEW_COURSE_ATD, icon: 'clipboard-list', navigate: VIEW_COURSE_ATD, color: colors.success },
    { name: VIEW_STUDENT_ATD_DETAILS, icon: 'format-list-bulleted-square', navigate: VIEW_STUDENT_ATD_DETAILS, color: colors.warning },
    // { name: UPDATE_TODAY_ATTENDANCE, icon: 'format-list-bulleted-square', navigate: ATD_RUNNING_COURSES, color: colors.blue,status:'update' },


]

const AttendanceHomeScreen = ({navigation}) => {


  return (
    <><Header title={ATD_HOME} onPressBack={() => navigation.goBack()} />
            <View style={{ backgroundColor: colors.white, padding: 5 }}>
                {task.map((item, index) => {
                    return (
                        <Listitem
                            key={index}
                            title={item.name}
                            iconbackgroundColor={item.color}
                            iconName={item.icon}
                            onPress={() => {if(item.name==TAKE_ATTENDANCE||item.name==UPDATE_TODAY_ATTENDANCE){
                                console.log(item.status);
                                navigation.navigate(item.navigate,{action:item.status})

                            }
                            else{
                                console.log(item.navigate);
                                navigation.navigate(item.navigate)}}}
                        >
                            <Icon name="chevron-right" size={26} style={{ position: 'absolute', right: 10 }} />
                        </Listitem>
                    )
                })}
            </View>


        </>
  )
}

export default AttendanceHomeScreen

const styles = StyleSheet.create({})