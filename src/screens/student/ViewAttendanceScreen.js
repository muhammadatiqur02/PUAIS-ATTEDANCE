
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet,ScrollView,View,Text,ActivityIndicator } from 'react-native';
import AppUnFilledButton from '../../components/AppUnFilledButton';
import Header from '../../components/Header';
import Message from '../../components/Message';
import { GLOBAL_BACKEND_URL } from '../../constants/baseUrl';
import { ATD_HOME } from '../../constants/routeName';
import { AuthContext } from '../../context';
import colors from '../../theme/colors';

function ViewAttendanceScreen({navigation}) {

    const { signOut,loginState } = React.useContext(AuthContext);
    const [user, setUser] = useState(loginState.data);
    const [sessions, setSessions] = useState([]);
    const [sessionId, setSessionId] = useState();
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState(null);
    const [courseId, setCourseId] = useState();
    const [shortDetails, setShortDetails] = useState([]);
    
    const [classes,setClasses]= useState([]);
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [error, setError] = useState(null);


    const getSessions = async () => {
       
        const url = `${GLOBAL_BACKEND_URL}/Student/GetSession?user=${user.Roll}&programID=1`;
        setLoading(true);
        setError(null);setShortDetails(null);setClasses(null);
        await axios.get(url).then((res) => {
           
            if (res.data) {
                setSessions(res.data);
                setLoading(false);
                setError(null);
            }
            else {
                setSessions([]);
                setError(res.data.Message);
                setLoading(false);
            }
        })
            .catch((error) => {
                setSessions([]);
                setError(error.message);
                setLoading(false);
            })
    }

    const getCourses = async () => {
        // http://puc.ac.bd:8098/api/Student/SessionCourse?user=1703310201452&sessionID=170&programID=1
     if(sessionId){  
         const url = `${GLOBAL_BACKEND_URL}/Student/SessionCourse?user=${user.Roll}&sessionID=${sessionId}&programID=1`;
        setCourses([]);
        setCourse(null);
         setError(null);
        setLoading(true);setShortDetails(null);setClasses(null);
        console.log(url)
        await axios.get(url).then((res) => {
           
            if (res.data) {
                setCourses(res.data);
                setLoading(false);
                setError(null);
            }
            else {
                setCourses([]);
                setError(res.data.Message);
                setLoading(false);
            }
        })
            .catch((error) => {
                setCourses([]);
                setError(error.message);
                setLoading(false);
            })}else{setShortDetails(null)}
    }


    const showShortDetails = async ()=>{
        try {
            setBtnLoading(true);
          
         // const url = `http://puc.ac.bd:8098/api/StudentAttendance/getStudentClassShortDetails?studentId=3553&sessionCourseId=6818&deptId=1`;
             const url = `${GLOBAL_BACKEND_URL}/StudentAttendance/getStudentClassShortDetails?sessionCourseId=${courseId}&studentId=${user.Id}&deptId=${user.DepartmentId}`;
      console.log('showShortDetails',url);
        await axios.get(url).then((res) => {
               
                if (res.data.MessageCode==200) {
                    
                  setShortDetails(res.data.Data[0]);
                  getBriefDetails();
                } else {
                    setError(res.data.Message);


                }
                setBtnLoading(false)
            }).catch((err) => {
                setError(err.Message);
                setBtnLoading(false);
            })
            
        } catch (error) {
            setError(error.Message);
            setBtnLoading(false);
        }
      
      }

      const getBriefDetails = async()=>{
        setBtnLoading(true);
        // http://puc.ac.bd:8098/api/StudentAttendance/getStudentClassDetails?studentId=3553&sessionCourseId=6818&deptId=1
        try {
           //  const url = 'http://puc.ac.bd:8098/api/StudentAttendance/getStudentClassDetails?studentId=3553&sessionCourseId=6818&deptId=1';
             const url = `${GLOBAL_BACKEND_URL}/StudentAttendance/getStudentClassDetails?sessionCourseId=${courseId}&studentId=${user.Id}&deptId=${user.DepartmentId}`;
            console.log(url)
            await axios.get(url).then((res) => {
               
                if (res.data.Data) {
                    console.log('All Class',res.data.Data)
                  setClasses(res.data.Data)
                   
                } else {
                    setError(res.data.Message);
                }
                setBtnLoading(false)
            }).catch((err) => {
                setError(err.Message);
                setBtnLoading(false);
            })
            
        } catch (error) {
            setError(error.Message);
            setBtnLoading(false);
        }
        
    }


useEffect(()=>{
    getSessions();
},[])

useEffect(()=>{
    getCourses();
},[sessionId])

useEffect(()=>{
    setError(null);
    setShortDetails(null);
    setClasses([]);

},[course,sessionId])





    return (
        <>
            <Header title={`${ATD_HOME} History`} />
            <ScrollView style={{padding:10}}>
            {loading && <ActivityIndicator size={'large'} color={colors.primary} />}
            {error && <Message error message={error} margin />}
            {/* {message && <Message success message={message} margin />} */}

            <Picker
                        sessionId={sessionId}
                        style={styles.picker}
                        selectedValue={sessionId}
                        onValueChange={(itemValue) => {
                            setSessionId(itemValue);
                        }}
                    >
                        <Picker.Item label={`Select Session`} color={colors.gray} value={0} />
                        {sessions.map((session, index) => {
                            return (

                                <Picker.Item key={index} label={`${session.Name} - ${session.Status}`} color={colors.gray_dim} value={session.Id} />
                            )
                        })}
                    </Picker>
            <Picker
                        courseId={course}
                        style={[styles.picker,{marginTop:10}]}
                        selectedValue={course}
                        onValueChange={(itemValue) => {
                            if (itemValue) {
                                setCourseId(itemValue.SessionCourseId);
                                setCourse(itemValue);
                                console.log(itemValue);
                            }
                        }}
                            
                    >
                        <Picker.Item label={`Select Course`} color={colors.gray} value={0} />
                        {courses.map((item, index) => {
                            return (

                                <Picker.Item key={index} label={`${item.Course}${item.Section}`} color={colors.gray_dim} value={item} />
                            )
                        })}
                    </Picker>

                    <AppUnFilledButton title={'Search'} primary loading={btnLoading} onPress={()=>{showShortDetails()}}/>
                    {course&&<View style={{padding:5,backgroundColor:colors.primary_light}}>
                        <Text style={{fontSize:16,fontWeight:'bold'}}>{`${course.CourseCode}-${course.Course}${course.Section}`}</Text>
                        </View>}
                   {shortDetails&&<View style={{ backgroundColor:colors.primary_light,padding:10}}>
               
                <Text style={{color:colors.gray}}>Total Class : {shortDetails.totalClass ?? "N/A"}</Text>
                <Text style={{color:colors.gray}}>Present Class : {shortDetails.presentClass ?? "N/A"}</Text>
                <Text style={{color:colors.gray}}>Absent Class : {shortDetails.absentClass ?? "N/A"}</Text>
                <Text style={{color:colors.gray}}>Parcentage : {shortDetails.percentage ?? "N/A"}</Text>
            </View>}

            <View>
            {classes?.map((item, index) => {
                const updateDate = item.date ? item.date.slice(0, -11) : "N/A";
          return (
            <View key={index} style={[styles.card, { backgroundColor:  item.status=='Present' ? colors.success_light : colors.danger_light }]}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <Text style={{fontSize:18,fontWeight:'bold',color:colors.black}}>{updateDate}</Text>
                <Text style={{fontSize:16,color:colors.gray}}>{item.day || "N/A"}</Text>
                </View>
                <Text style={{color:colors.gray}}>{item.class_start || "N/A"} - {item.class_end || "N/A"}</Text>
                <Text style={{color:colors.gray}}>{item.adjustmentClass==1?'Adjustment Class':''}</Text>
             </View>

          )
        })}

            </View>
            <View style={{padding:10}}></View>
            </ScrollView>
        </>
    );
}

export default ViewAttendanceScreen;

const styles = StyleSheet.create({
    picker: {
        borderColor: colors.primary,
        width: "100%",
        borderWidth: 1,
        backgroundColor: colors.white,

    },card: {
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