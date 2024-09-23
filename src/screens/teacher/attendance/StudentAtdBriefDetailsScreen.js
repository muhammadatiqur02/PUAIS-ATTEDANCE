import axios from 'axios';
import moment from 'moment';
import React,{useState,useEffect} from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text,View } from 'react-native';
import Header from '../../../components/Header';
import Message from '../../../components/Message';
import { GLOBAL_BACKEND_URL } from '../../../constants/baseUrl';
import colors from '../../../theme/colors';

function StudentAtdBriefDetailsScreen({route,navigation}) {

    const { courseId,student,data } = route.params;
    const [classes,setClasses]= useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [s_url, setSurl] = useState(null);
    const getBriefDetails = async()=>{
        // http://puc.ac.bd:8098/api/StudentAttendance/getStudentClassDetails?studentId=3553&sessionCourseId=6818&deptId=1
        try {
            setLoading(true);
            const url = `${GLOBAL_BACKEND_URL}/StudentAttendance/getStudentClassDetails?sessionCourseId=${courseId}&studentId=${student.id}&deptId=1`;
            console.log(url)
            setSurl(url);
            await axios.get(url).then((res) => {
               
                if (res.data.Data) {
                   
                  setClasses(res.data.Data)
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
  
    useEffect(() => {
        getBriefDetails();
       }, [])


    return (
       <>
       <Header title={'History'} onPressBack={() => navigation.goBack()}/>
        <ScrollView style={styles.Container}>
        {loading && <ActivityIndicator size={'large'} color={colors.primary} />}
            {error && <Message error message={error} margin />}
            {message && <Message success message={message} margin />}
            {/* {s_url && <Text selectable style={{padding:10,margin:5, backgroundColor:colors.primary_light}}>{s_url}</Text>} */}
            <View style={{ backgroundColor:colors.primary_light,padding:10}}>
                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:18,color:colors.black}}>{student.name}</Text>
                    <Text style={{fontSize:18,color:colors.black}}>{student.roll}</Text>
                </View>
                <Text style={{color:colors.gray}}>Total Class : {data.totalClass}</Text>
                <Text style={{color:colors.gray}}>Present Class : {data.presentClass}</Text>
                <Text style={{color:colors.gray}}>Absent Class : {data.absentClass}</Text>
                <Text style={{color:colors.gray}}>Parcentage : {data.percentage}</Text>
            </View>

            <View>
            {classes?.map((item, index) => {
                const updateDate = item.date.slice(0, -11);
          return (
            <View key={index} style={[styles.card, { backgroundColor:  item.status=='Present' ? colors.success_light : colors.danger_light }]}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <Text style={{fontSize:18,fontWeight:'bold',color:colors.black}}>{updateDate}</Text>
                <Text style={{fontSize:16,color:colors.black}}>{item.day}</Text>
                </View>
                <Text style={{color:colors.gray}}>{item.class_start} - {item.class_end}</Text>
                <Text style={{color:colors.gray}}>{item.adjustmentClass==1?'Adjustment Class':''}</Text>
             </View>

          )
        })}

            </View>
            <View style={{height:10}}></View>
        </ScrollView>

       </>
    );
}

export default StudentAtdBriefDetailsScreen;

const styles = StyleSheet.create({
    Container: {
      
        padding: 10,
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