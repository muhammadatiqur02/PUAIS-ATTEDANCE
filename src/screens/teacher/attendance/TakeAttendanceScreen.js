import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Alert, Modal, TouchableOpacity, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import moment, { months } from 'moment';
import DatePicker from 'react-native-date-picker'

import Header from '../../../components/Header';
import AppFilledButton from '../../../components/AppFilledButton';
import Message from '../../../components/Message';

import { AuthContext } from '../../../context';

import { GLOBAL_BACKEND_URL } from '../../../constants/baseUrl';
import { TAKE_ATTENDANCE } from '../../../constants/routeName';

import colors from '../../../theme/colors';
import AppTextInput from '../../../components/AppTextInput';
import AppUnFilledButton from '../../../components/AppUnFilledButton';




const TakeAttendanceScreen = ({ navigation, route }) => {
  const { course } = route.params;
  const { loginState } = useContext(AuthContext);
  const [user] = useState(loginState.data);



  const [students, setStudents] = useState(null);
  const [day, setDate] = useState(moment().format('dddd'));
  const [time, setTime] = useState(new Date().getTime());

  const [adjDate, setAdjDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)
  const [adjDateOpen, setAdjDateOpen] = useState(false)

  const [classRoutine, setClassRoutine] = useState(null);

  const [adjClass, setAdjClass] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [absentStudent, setAbsentStudent] = useState([]);

  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const [s_url, setSurl] = useState(null);

  const checkRoutine = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const url = `${GLOBAL_BACKEND_URL}/StudentAttendance/CheckClassRoutine/?sessionCourseId=${course.id}&day=${day}&deptId=${user.DeptId}`
      console.log(url);
      //const url = `http://192.168.0.92:8000/api/StudentAttendance/CheckClassRoutine?sessionCourseId=3641&day=Monday&deptId=1`;
     setSurl(`Check Routine : ${url}`);
      await axios.get(url).then((res) => {
        console.log(res.data)
        if (res.data.MessageCode == 200) {
          setClassRoutine(res.data.Data);
          setAdjClass(false);
          getStudent();
        } else if (res.data.MessageCode == 201) {

          setAdjClass(true);
          setError(res.data.Message);
          setClassRoutine(null);
          setStudents(null);
        }
        else {
          setError(res.data.Message);
          setClassRoutine(null);
        }
      }).catch((err) => {
        setError(err.Message);
      })
      setLoading(false);
    } catch (error) {
      setError(error.Message);
      setLoading(false);
    }
  }

  const setRescheduleClass = async () => {
    const startTime = moment(startDate).format("hh:mm");
    const endTime = moment(endDate).format("hh:mm");
    const day = moment(adjDate).format('dddd');  // Ensure the correct day is derived from adjDate

    if (endDate > startDate) {


      try {
        const url = `${GLOBAL_BACKEND_URL}/StudentAttendance/SetAdjClass?sessionCourseId=${course.id}&date=${moment(adjDate).format('YYYY-MM-D')}&day=${day}&startTime=${startTime}&endTime=${endTime}&deptId=${user.DeptId}&entryBy=${user.UserName}`
        console.log("Rescheduling class with date:", moment(adjDate).format('YYYY-MM-DD'), "and day:", day);
        setSurl(`Set Adj Class : ${url}`);
        console.log(url);
        await axios.post(url).then((res) => {

          setModalVisible(false);
          if (res.data.MessageCode == 200) {
            setAdjClass(false);
            checkRoutine();
            getStudent();
          }
        }
        ).catch((err) => {
          setError(err.Message);
        })
        setLoading(false);
      } catch (error) {
        setError(error.Message);
        setLoading(false);
      }
    }
    else {
      Alert.alert('Error','Time Set Up Is Error.')
      
    }

  }

  const getStudent = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const url = `${GLOBAL_BACKEND_URL}/Teacher/GetCourseStudent?courseId=${course.id}&deptId=${user.DeptId}`;
      console.log(url);
      await axios.get(url).then((res) => {
        if (res.data.MessageCode == 200) {
          let arr = res.data.Data.map((item) => {
            item.isSelected = false;
            return { ...item };
          });
  
          // Sort students by 'id' in ascending order
          arr.sort((a, b) => a.id - b.id); // This will sort them serially based on id.
  
          setStudents(arr);
          setLoading(false);
        } else {
          setError(res.data.Message);
          setLoading(false);
        }
      }).catch((err) => {
        setError(err.Message);
        setLoading(false);
      });
  
    } catch (error) {
      setError(error.Message);
      setLoading(false);
    }
  };
  

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
     let classDate = null;

     if (adjClass) {
      // If an adjustment class is active, use the adjustment class date
      classDate = moment(adjDate).format('YYYY-MM-DD');
    } else if (classRoutine && classRoutine.length > 0) {
      // Use the routine class date
      classDate = moment(classRoutine[0].class_date).format('YYYY-MM-DD');
    } else {
      // If no valid class date is found, return an error
      Alert.alert("Error", "No valid class date found for submission.");
      setBtnLoading(false);
      return;    
    
    }

     console.log(`Class Date: ${classDate}`);
     const url = `${GLOBAL_BACKEND_URL}/StudentAttendance/SetAttendance?sessionCourseId=${course.id}&day=${day}&class_date=${classDate}&deptId=${user.DeptId}&studentIds=${ids}&entryBy=${user.UserName}`;
      //const url = `${GLOBAL_BACKEND_URL}/StudentAttendance/SetAttendance?sessionCourseId=${course.id}&day=${day}&deptId=${user.DeptId}&studentIds=${ids}&entryBy=${user.UserName}`
      console.log(url);
      setSurl(`Set Attendance : ${url}`);
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
    // console.log(ids);
  }

  useEffect(() => {
    checkRoutine();

    // if (adjClass===false) {

    //   getStudent();
    // }else{
    //   setStudents(null);
    // }
  }, [course])




  return (
    <>
      <Header title={TAKE_ATTENDANCE} onPressBack={() => navigation.goBack()} />
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold',color:colors.black }}> {course.coursename}</Text>
        {classRoutine?.map((classRoutine, index) => {
          return (
            <View key={index} style={{margin:10,alignItems:'center'}}>
              <Text style={{color:colors.gray}}>
                {classRoutine.dayname}
              </Text>
              <Text style={{color:colors.gray}}>{classRoutine.class_start} - {classRoutine.class_end}</Text>
              {classRoutine.adj_class == 1 ? <Text style={{color:colors.gray}}>Adjustment Class</Text> : null}
            </View>
          )
        })
        }
        {adjClass && (
    <View style={{ margin: 10, alignItems: 'center' }}>
      <Text style={{ color: colors.gray }}>Adjustment Class on {moment(adjDate).format('dddd, MMMM DD YYYY')}</Text>
      <Text style={{ color: colors.gray }}>{moment(startDate).format('LT')} - {moment(endDate).format('LT')}</Text>
    </View>
  )}


      </View>
      {loading && <ActivityIndicator size={'large'} color={colors.primary} />}
      {error && <Message error message={error} margin />}
      {message && <Message success message={message} margin />}
      {/* {s_url && <Text selectable style={{padding:10,margin:5, backgroundColor:colors.primary_light}}>{s_url}</Text>} */}

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centerView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={{ position: 'absolute', top: 5, right: 5, padding: 5, }} onPress={() => setModalVisible(!modalVisible)} >

              <Icon name="close-circle-outline" size={30} color={colors.black} />

            </TouchableOpacity>

            <View style={styles.modalBody}>
              <TouchableOpacity onPress={() => setAdjDateOpen(true)}>
              <AppTextInput
                icon={"calendar-month"}
                editable={false}
                value={moment(adjDate).format("dddd, MMMM DD YYYY")}
              />
              </TouchableOpacity>
              <DatePicker
                modal
                open={adjDateOpen}
                date={adjDate}
                onConfirm={(date) => {
                  setAdjDateOpen(false)
                  setAdjDate(date)
                }}
                onCancel={() => {
                  setAdjDateOpen(false)
                }}
                mode="date"
              />
              <View style={styles.modalTimeLine}>
                <Text style={{ fontSize: 18, color: colors.gray_dim }}>Start </Text>
                <Text style={{ fontSize: 18, color: colors.primary, fontWeight: '600' }}>{moment(startDate).format('LT')}</Text>
                <TouchableOpacity onPress={() => setStartDateOpen(true)} style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 5 }}>
                  <Icon name='clock' size={25} color={colors.white} />
                </TouchableOpacity>
              </View>
              <DatePicker
                modal
                open={startDateOpen}
                date={startDate}
                onConfirm={(date) => {
                  setStartDateOpen(false)
                  setStartDate(date)
                }}
                onCancel={() => {
                  setStartDateOpen(false)
                }}
                mode="time"
              />
              <View style={styles.modalTimeLine}>
                <Text style={{ fontSize: 18, color: colors.gray_dim }}>End </Text>
                <Text style={{ fontSize: 18, color: colors.primary, fontWeight: '600' }}>{moment(endDate).format('LT')}</Text>
                <TouchableOpacity onPress={() => setEndDateOpen(true)} style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 5, alignSelf: 'flex-end' }}>
                  <Icon name='clock' size={25} color={colors.white} />
                </TouchableOpacity>
              </View>
              <DatePicker
                modal
                open={endDateOpen}
                date={endDate}
                onConfirm={(date) => {
                  setEndDateOpen(false)
                  setEndDate(date)
                }}
                onCancel={() => {
                  setEndDateOpen(false)
                }}
                mode="time"
              />
              <TouchableOpacity onPress={() => setRescheduleClass()} style={{ backgroundColor: colors.primary, paddingVertical: 10, marginTop: 20, borderRadius: 5, paddingHorizontal: 25 }}>
                <Text style={{ color: colors.white, fontSize: 18, fontWeight: 'bold' }}>Submit</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>

      </Modal>
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }} refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getStudent} />
        }>
        {adjClass && <AppFilledButton title={"Add Adjustment Class"} primary onPress={() => setModalVisible(true)} />}
        {students?.map((student, index) => {
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

        {students && <AppFilledButton primary title={'Submit'} loading={btnLoading} disable={btnLoading} onPress={() => saveAttendance()} />}
        <View style={{height:20}}></View>
      </ScrollView>

    </>
  )
}

export default TakeAttendanceScreen

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