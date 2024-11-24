import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useEffect,useContext,useState} from 'react'
import { Picker } from '@react-native-picker/picker';
import colors from '../../../theme/colors';
import { GLOBAL_BACKEND_URL } from '../../../constants/baseUrl';
import { AuthContext } from '../../../context';
import axios from 'axios';
import moment from 'moment';
import Header from '../../../components/Header';
import Message from '../../../components/Message';
import { ATD_HOME, VIEW_COURSE_ATD, VIEW_COURSE_ATD_BRIEF, VIEW_STUDENT_ATD_DETAILS_BRIEF } from '../../../constants/routeName';


const StudentAtdDetailsScreen = ({navigation}) => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const { loginState } = useContext(AuthContext);
  const [user] = useState(loginState.data);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [s_url, setSurl] = useState(null);

  const getCourses=async()=>{
    setLoading(true);
    try {
        const url = `${GLOBAL_BACKEND_URL}/Teacher/RunningCourses/?deptId=${user.DeptId}&userId=${user.Id}`
      
        await axios.get(url).then((res) => {
            
            if (res.data.MessageCode == 200) {
                //let arr =  res.data.Data.map((item,index)=>{
                    //var str = item.coursename;
                    //var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
                    //var acronym = matches.join('');
                    //item.coursename = acronym
                    
                    //return {...item}
                //})

                setCourses(res.data.Data);
                
            } else {
                setError(res.data.Message);
            }
            setLoading(false)
        }).catch((err) => {
            setError(`HEre - ${err.Message}`);
            setLoading(false);
        })
        
    } catch (error) {
        setError(`HEre - ${error.Message}`);
        setLoading(false);
    }
}

const getStudent = async () => {
  
  setError(null)
  setMessage(null)
  setLoading(true)
  try {
    const url = `${GLOBAL_BACKEND_URL}/Teacher/GetCourseStudent?courseId=${courseId}&deptId=1`
    console.log(url);
   
    await axios.get(url).then((res) => {
      console.log(res.data);
      if (res.data.MessageCode == 200) {
       
        setStudents(res.data.Data);
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

const showShortDetails = async (student)=>{
  try {
      setLoading(true);
      const url = `${GLOBAL_BACKEND_URL}/StudentAttendance/getStudentClassShortDetails?sessionCourseId=${courseId}&studentId=${student.id}&deptId=1`;
    setSurl(url);
       await axios.get(url).then((res) => {
         
          if (res.data.MessageCode==200) {
            console.log(res.data.Data[0]);
             var msg = `Total Class: ${res.data.Data[0].totalClass},\nPresent Class: ${res.data.Data[0].presentClass},\nAbsent Class: ${res.data.Data[0].absentClass},\nPercentage: ${res.data.Data[0].percentage}`;
             Alert.alert(res.data.Message,msg,[
              {
                  text: 'Cancel',
                  onPress: () => { },
                },
              {
                  text: 'Brief Details',
                  onPress: () => { navigation.navigate(VIEW_STUDENT_ATD_DETAILS_BRIEF, { courseId:courseId,student:student,data:res.data.Data[0]})},
                },
             ]);
          } else {
              setError(res.data.Message);
          }
          setLoading(false)
      }).catch((err) => {
          setError(err.Message);
          setLoading(false);
      })
      
  } catch (error) {
      setError(error.Message);
      setLoading(false);
  }

}

  useEffect(() => {
    getCourses();
   }, [])


  useEffect(() => {
    if(courseId!=null)getStudent();
   }, [courseId])
  return (
  <>
    <Header title={'HISTORY'} onPressBack={() => navigation.goBack()} />
    <View style={styles.Container}>

           <Picker
               courseId={courseId}
               style={styles.picker}
               selectedValue={courseId}
               onValueChange={(itemValue, itemIndex) => {
                   setCourseId(itemValue);
               }}
           >
               <Picker.Item  label={`Select Course`} color={colors.gray}  />
               {courses.map((course, index) => {
                   return (

                       <Picker.Item key={index} label={`${course.semester}${course.sectionname ? course.sectionname : ''} - ${course.course_short_name}`}  color={colors.gray} value={course.id} />
                   )
               })}
           </Picker>
           {loading && <ActivityIndicator size={'large'} color={colors.primary} />}
           {error && <Message error message={error} margin />}
           {message && <Message success message={message} margin />}
           {/* {s_url && <Text selectable style={{padding:10,margin:5, backgroundColor:colors.primary_light}}>{s_url}</Text>} */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {students?.map((student, index) => {
              return (
                <TouchableOpacity onPress={()=>showShortDetails(student)} key={index} style={[styles.card]}>
                    <View style={{flex:2}}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.gray }}>{student.roll}</Text>
                      <Text style={{ fontWeight: 'bold', color: colors.gray }}>{student.name}</Text>
                    </View>
                    
                </TouchableOpacity>

              )
            })}
            </ScrollView>
           </View>
           </>
           
  )
}

export default StudentAtdDetailsScreen

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    padding: 10,
},
picker: {
    borderColor: colors.primary,
    width: "100%",
    borderWidth: 1,
    backgroundColor: colors.white,
    marginBottom:10
},
card: {
    margin: 10,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 5,
  },
})