import axios from "axios";
import React, { useState,useEffect,useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView
    , StyleSheet,ActivityIndicator
} from "react-native";
import Message from "../../../components/Message";
import Header from "../../../components/Header";
import { GLOBAL_BACKEND_URL } from "../../../constants/baseUrl";
import { ATD_HOME, TAKE_ATTENDANCE, UPDATE_TODAY_ATTENDANCE } from "../../../constants/routeName";
import { AuthContext } from "../../../context";
import colors from "../../../theme/colors";

const ListView = ({ data, marged,onPress }) => {

    return (
        <>
            <View style={{ padding: marged ? 0 : 10, marginTop: marged ? 0 : -5 }}>

                {!marged ? <Text style={{ fontSize: 18, fontWeight: '700', color: colors.primary, paddingVertical: 10 }}>{data.sessionname}</Text> : <></>}

            </View>
            <TouchableOpacity onPress={onPress}>
            <View style={{ backgroundColor: colors.white, padding: 5, margin: 5 }}>

                <Text style={{ fontSize: 18, fontWeight: '600', color: colors.gray_dim }}>{data.coursename} -{data.semester}{data.sectionname}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{color:colors.gray}}>{data.coursecode} Creadit : {data.coursecredit}</Text>
                </View>
                
            </View>
            </TouchableOpacity>
        </>
    )
}


const RunningCoursesScreen = ({route,navigation}) => {
   const { action } = route.params;
    const { loginState } = useContext(AuthContext);
    const [user] = useState(loginState.data);
    
   // const [status, setStatus] = useState(null);
    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    
    const getRunningCourses = async () => {
        setLoading(true);
        try {
            const url = `${GLOBAL_BACKEND_URL}/Teacher/RunningCourses/?deptId=${user.DeptId}&userId=${user.Id}`

            await axios.get(url).then((res) => {
                
                if (res.data.MessageCode == 200) {
                    setCourses(res.data.Data);
                    setMessage(res.data.Message);
                } else {
                    setError(res.data.Message);
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



    useEffect(() => {

        getRunningCourses();
    }, [])


    const onPressCourse=(course)=>{
        if(action=='take'){
        navigation.navigate(TAKE_ATTENDANCE,{course:course})}
        else{
            navigation.navigate(UPDATE_TODAY_ATTENDANCE,{course:course})
        }
    }

    return (
        <>
            <Header title={ATD_HOME} onPressBack={() => navigation.goBack()} />


            <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }}>
                {loading && <ActivityIndicator size={'large'} color={colors.primary} />}
                {error && <Message error message={error} margin />}
                {message && <Message success message={message} />}


                {courses.map((course, index) => {
                    
                    return (
                        index != 0 ? course.sessionname == courses[index - 1].sessionname ?
                            <ListView key={index} data={course} marged  onPress={()=>onPressCourse(course)}/> :
                            <ListView key={index} data={course} onPress={()=>onPressCourse(course)}/>
                            :
                            <ListView key={index} data={course} onPress={()=>onPressCourse(course)}/>

                    )
                })}
                <View style={{ height: 20 }}>

                </View>
            </ScrollView>
        </>
    );

}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: colors.white },
    text: { textAlign: 'center', fontWeight: '600', color: colors.black },
    dataWrapper: { marginTop: -1 },
    row: { height: 50, backgroundColor: colors.white }
})

export default RunningCoursesScreen;

