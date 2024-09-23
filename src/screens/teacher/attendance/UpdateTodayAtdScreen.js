import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Alert, Modal, TouchableOpacity, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-native-date-picker'

import Header from '../../../components/Header';
import AppFilledButton from '../../../components/AppFilledButton';
import Message from '../../../components/Message';

import { AuthContext } from '../../../context';

import { GLOBAL_BACKEND_URL } from '../../../constants/baseUrl';
import {  TAKE_ATTENDANCE, UPDATE_TODAY_ATTENDANCE,  } from '../../../constants/routeName';

import colors from '../../../theme/colors';
import AppTextInput from '../../../components/AppTextInput';
import AppUnFilledButton from '../../../components/AppUnFilledButton';




const UpdateTodayAtdScreen = ({ navigation, route }) => {
 // adj_class, class_end, class_start,date,day,tbl_sessioncourse_id
  const { course,item,courseId,date } = route.params;
  const { loginState } = useContext(AuthContext);
  const [user] = useState(loginState.data);



  const [students, setStudents] = useState(null);
  const [day, setDate] = useState(moment().format('dddd'));
  const [time, setTime] = useState(new Date().getTime());

  const [endDate, setEndDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)

  const [adjClass, setAdjClass] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [absentStudent, setAbsentStudent] = useState([]);

  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const [s_url, setSurl] = useState(null);





  const getStudent = async () => {
    setError(null)
    setMessage(null)
    setLoading(true)
    try {
      //console.log(moment(new Date()).format('DD-MM-YYYY'));
    //  var today = moment(new Date()).format('DD-MM-YYYY');
     const url = `${GLOBAL_BACKEND_URL}/StudentAttendance/brifReport?sessionCourseId=${courseId}&date=${date}&deptId=1`;
   // console.log(moment(new Date()).format('DD-MM-YYYY'))
      //const url =  'http://puc.ac.bd:8098/api/StudentAttendance/brifReport?sessionCourseId=17939&date=29-03-2023&deptId=1';
      await axios.get(url).then((res) => {
console.log(res.data.Data)
        if (res.data.MessageCode == 200) {
          let arr = res.data.Data.map((item) => {
            if(item.status=='Absent')
            item.isSelected = true;
            else 
            item.isSelected=false;
            return { ...item };
          })
          

          setStudents(arr);
          setLoading(false);
        }
        else {
          setError(res.data.Message);
          setLoading(false);
        }
      }).catch((err) => {
        setError(err.Message);
        setLoading(false);
      })


    } catch (error) {
      setError(error.Message);
      setLoading(false);
    }
  }

  const selectionHandelr = async (ind, type) => {

    let arr = await students.map((item, index) => {

      if (ind == index) {
        if (type == 'select') {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }

      }
      return { ...item }
    })

    setStudents(arr);

  }

  const saveAttendance = async () => {
   

    try {

     setBtnLoading(true);
     
      var count = 0;
    var ids = "";
    await students.map((student, index) => {
      if (student.isSelected) {
        ids += student.id + ',';
        count++;
      }
    })
     ids = ids.slice(0,-1);
      const url = `${GLOBAL_BACKEND_URL}/StudentAttendance/UpdateAttendance?sessionCourseId=${course.id}&date=${date}&day=${item.day}&deptId=${user.DeptId}&studentIds=${ids}&entryBy=${user.UserName}`
      console.log(url);
      setSurl(`Update Attendance : ${url}`);

      //------active after api work done-------

      await axios.post(url).then((res) => {
        if (res.data.MessageCode == 200) {
          var msg = `Total Student ${students.length}\nPresent Student ${students.length-count}\nAbsent Student ${count}`
          setMessage(msg)
          Alert.alert(res.data.Message,msg)
        } else {
          setError(res.data.Message)
        }

      }
      ).catch((err) => {
        setError(err.Message);

      })
      setBtnLoading(false)
    } catch (error) {
      setError(error.Message);
      setBtnLoading(false)
    }
  }

  useEffect(() => {
   //console.log(course)
getStudent()
    
  }, [courseId])




  return (
    <>
      <Header title={UPDATE_TODAY_ATTENDANCE} onPressBack={() => navigation.goBack()} />
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold',color:colors.black }}>{course.semester} {course.coursecode}-{course.coursename}{course.sectionname}</Text>
       
            <View style={{margin:10,alignItems:'center'}}>
              <Text style={{color:colors.gray}}>
                {item.day}
              </Text>
              <Text style={{color:colors.gray}}>{item.class_start} - {item.class_end}</Text>
              {item.adj_class == 1 ? <Text style={{color:colors.gray}}>Adjustment Class</Text> : null}
            </View>
          

      </View>
      {loading && <ActivityIndicator size={'large'} color={colors.primary} />}
      {error && <Message error message={error} margin />}
      {message && <Message success message={message} margin />}
      {/* {s_url && <Text selectable style={{padding:10,margin:5, backgroundColor:colors.primary_light}}>{s_url}</Text>} */}

     
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }} refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getStudent} />
        }>
             {students?.sort((a, b) => a.roll > b.roll).map((student, index) => {
          return (
            <View key={index} style={[styles.card, { backgroundColor:  student.isSelected ? colors.danger_light : colors.success_light }]}>
                <View style={{flex:2}}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.gray }}>{student.roll}</Text>
                   <Text style={{ fontWeight: 'bold', color: colors.gray }}>{student.name}</Text>
                </View>
                <View style={{flex:1}}>
                {student.isSelected ? <AppFilledButton danger title={'Absent'} onPress={() => selectionHandelr(index, '')} />:
               
                <AppFilledButton success title={'Present'} onPress={() => selectionHandelr(index, 'select')} />
              }
                </View>

             </View>

          )
        })}

        {students && <AppFilledButton primary title={'Update'} loading={btnLoading} disable={btnLoading} onPress={() => saveAttendance()} />}
        <View style={{height:20}}></View>
      </ScrollView>

    </>
  )
}

export default UpdateTodayAtdScreen

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.transparent

  },
  modalView: {
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalBody: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',



  },
  modalTimeLine: {

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    width: '85%',
    padding: 5
  },
  card: {
    flexDirection:'row',
    margin: 10,
    padding:5,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 5,
  },
  avater: {
    width: 105,
    height: 105,
    borderRadius: 100
  },
  btnList: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})