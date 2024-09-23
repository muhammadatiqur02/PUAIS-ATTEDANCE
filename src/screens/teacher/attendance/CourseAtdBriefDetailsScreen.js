import axios from 'axios';
import moment from 'moment';
import React,{useState,useEffect} from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text,View } from 'react-native';
import Header from '../../../components/Header';
import Message from '../../../components/Message';
import { GLOBAL_BACKEND_URL } from '../../../constants/baseUrl';
import colors from '../../../theme/colors';

function CourseAtdBriefDetailsScreen({route,navigation}) {

    const { sessionId,date,data } = route.params;
    const [students,setStudents]= useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const [s_url, setSurl] = useState(null);

    const getBriefDetails = async()=>{

        try {
            const url = `${GLOBAL_BACKEND_URL}/StudentAttendance/brifReport?sessionCourseId=${sessionId}&date=${moment(date).format('YYYY-MM-DD')}&deptId=1`;
            console.log('brifReport',url)
            setSurl(`brifReport: ${url}`);
            await axios.get(url).then((res) => {
               
                if (res.data.Data) {

                  setStudents(res.data.Data)
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
                <Text style={{color:colors.black}}>Total Student : {data.TotalStudent}</Text>
                <Text style={{color:colors.black}}>Present Student : {data.PresentStudent}</Text>
                <Text style={{color:colors.black}}>Absent Student : {data.AbsentStudent}</Text>
            </View>

            <View>
            {students?.sort((a, b) => a.roll > b.roll).map((student, index) => {
          return (
            <View key={index} style={[styles.card, { backgroundColor:  student.status=='Present' ? colors.success_light : colors.danger_light }]}>
                <View style={{flex:2}}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.gray_dim }}>{student.roll}</Text>
                   <Text style={{ fontWeight: 'bold', color: colors.gray_dim }}>{student.name}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{color:colors.gray}}>{student.status}</Text>
                </View>
             </View>

          )
        })}

            </View>
            <View style={{height:10}}></View>
        </ScrollView>

       </>
    );
}

export default CourseAtdBriefDetailsScreen;

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