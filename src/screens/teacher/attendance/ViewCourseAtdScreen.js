import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useContext,useState} from 'react'
import { Picker } from '@react-native-picker/picker';
import colors from '../../../theme/colors';
import { GLOBAL_BACKEND_URL } from '../../../constants/baseUrl';
import { AuthContext } from '../../../context';
import axios from 'axios';
import moment from 'moment';
import Header from '../../../components/Header';
import Message from '../../../components/Message';
import { ATD_HOME, UPDATE_TODAY_ATTENDANCE, VIEW_COURSE_ATD, VIEW_COURSE_ATD_BRIEF } from '../../../constants/routeName';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ViewCourseAtdScreen = ({navigation}) => {

    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState(null);
    const [course, setCourse] = useState(null);

    const [classes,setClasses] = useState([]);

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
                    // let arr =  res.data.Data.map((item,index)=>{
                    //     var str = item.coursename;
                    //     var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
                    //     var acronym = matches.join('');
                    //     item.course_short_name = acronym;
                    //     item.coursename = acronym
                        
                    //     return {...item}
                    // })

                    setCourses(res.data.Data);
                    
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

  const getTotalClasses = async() => { 
    setLoading(true);
    try {
        const url = `${GLOBAL_BACKEND_URL}/StudentAttendance/getTotalClassHeld/?deptId=${user.DeptId}&sessionCourseId=${courseId}`
    console.log(url)
    setSurl(url);
        await axios.get(url).then((res) => {
           
            if (res.data.Data) {
                setClasses(res.data.Data);
                setMessage(res.data.Message)
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

 const handleDeleteClass = (item) => {
    Alert.alert(
      "Delete Class",
      "Are you sure you want to delete this Adjustment Class?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const url = `${GLOBAL_BACKEND_URL}/StudentAttendance/deleteAdjustmentClass?id=${item.id}`;
              setLoading(true);
              const response = await axios.delete(url);
              if (response.data.MessageCode === 200) {
                setClasses((prevClasses) => prevClasses.filter((cls) => cls.id !== item.id));
                setMessage("Class deleted successfully.");
              } else {
                setError(response.data.Message);
              }
            } catch (err) {
              setError("Failed to delete the class. Please try again.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

 const showShortDetails = async (item)=>{
    var sessionId=item.tbl_sessioncourse_id;
    
    var today = moment(item.date).format('YYYY-MM-DD');
    try {
        const url = `${GLOBAL_BACKEND_URL}/StudentAttendance/shortReport?sessionCourseId=${sessionId}&date=${today}&deptId=1`;
console.log(item);
console.log(url);
setSurl(url);
    await axios.get(url).then((res) => {
           
            if (res.data.MessageCode==200) {
               var msg = `Total Student: ${res.data.Data[0].TotalStudent},\nPresent Student: ${res.data.Data[0].PresentStudent},\nAbsent Student: ${res.data.Data[0].AbsentStudent}`;
               Alert.alert(res.data.Message,msg,[
                {
                    text: 'Update',
                    onPress: () => { navigation.navigate(UPDATE_TODAY_ATTENDANCE,{course:course,item:item,courseId:sessionId,date:today})},
                  },
                {
                    text: 'Cancel',
                    onPress: () => { },
                  },
                {
                    text: 'Brief Details',
                    onPress: () => { navigation.navigate(VIEW_COURSE_ATD_BRIEF, { sessionId:sessionId,date:today,data:res.data.Data[0]})},
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

useEffect(()=>{
if(courseId!=null){
    getTotalClasses();
}
},[courseId])
  return (
    <>
    <Header title={'HISTORY'} onPressBack={() => navigation.goBack()} />
     <View style={styles.Container}>

            <Picker
                courseId={course}
                style={styles.picker}
                selectedValue={course}
                
                onValueChange={(itemValue, itemIndex) => {
                    if (itemValue) {
                       console.log(itemValue);
                       setCourse(itemValue);
                       setCourseId(itemValue.id);
                    } else {
                        setCourse(null);
                        setCourseId(null);
                    }

                }}
            >
                <Picker.Item  label={`Select Course`} color={colors.gray}  />
                {courses.map((course, index) => {
                    return (

                        <Picker.Item key={index} label={`${course.semester}${course.sectionname ? course.sectionname : ''} - ${course.course_short_name}`}  color={colors.gray} value={course} />
                        //<Picker.Item key={index} label={`${course.semester}${course.sectionname} - ${course.coursename}`}  color={colors.gray} value={course} />
                    )
                })}
            </Picker>
            {loading && <ActivityIndicator size={'large'} color={colors.primary} />}
            {error && <Message error message={error} margin />}
            {message && <Message success message={message} margin />}
            {/* {s_url && <Text selectable style={{padding:10,margin:5, backgroundColor:colors.primary_light}}>{s_url}</Text>} */}
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }}>
                {classes.map((item,index)=>{
                   
                    return(
                        <TouchableOpacity onPress={()=>showShortDetails(item)} onLongPress={() => {if (item.adj_class === 1) handleDeleteClass(item);}} key={index} style={[styles.card]}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                                <Text style={{fontSize:18,fontWeight:'bold',color:colors.black}}>{moment(item.date).format('DD MMM yyyy')}</Text>
                                <Text style={{fontSize:16,color:colors.gray}}>{item.day}</Text>
                            </View>
                            <Text style={{color:colors.gray}}>{item.class_start} - {item.class_end}</Text>
                            <Text style={{color:colors.gray}}>{item.adj_class?'Adjustment Class':''}</Text>
                        </TouchableOpacity>
                    )
                })}
                <View style={{height:10}}></View>
            </ScrollView>

    </>
  )
}

export default ViewCourseAtdScreen

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