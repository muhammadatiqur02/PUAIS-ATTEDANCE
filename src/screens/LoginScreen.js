import React, { useState, useContext, useRef, useEffect } from 'react'
import { StyleSheet, View, Image, Dimensions, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native'

import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';

import AppTextInput from '../components/AppTextInput';
import AppFilledButton from '../components/AppFilledButton';
import Message from '../components/Message';


import { AuthContext } from '../context';

import { GLOBAL_BACKEND_URL } from '../constants/baseUrl';

//demo
const department = [{
    "id": 1,
    "department": "CSE",
    "fullname": "Computer Science & Engineering"
},
]
//

export default function LoginScreen({ navigation }) {


    const [loginType, setLoginType] = useState("student");

    const [departments, setDepartments] = useState([]);
    const [deptId, setDeptId] = useState(null);
    const [id, onChangeId] = useState(null);
    const [password, onChangePassword] = useState(null);
    const [hidePass, setHidePass] = useState(true);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { signIn } = useContext(AuthContext);


    const onSubmit = async (id, password, loginType, deptId) => {
        setLoading(true);
        let userToken = null;

        if (id && password) {
            const encodedPassword = encodeURIComponent(password);

            if (loginType != 'teacher') {
                const url = `${GLOBAL_BACKEND_URL}/Login/LoginAction/?user=${id}&pass=${encodedPassword}&loginType=${loginType}`;
                console.log(url);   
                try {
                    await axios.post(url).then((res) => {
                        console.log(res.data);
                        if (res.data.MessageCode == 200) {
                            AsyncStorage.setItem('userToken', JSON.stringify(res.data.Id));
                            AsyncStorage.setItem('userState', loginType);
                            AsyncStorage.setItem('user', JSON.stringify(res.data));
                            setLoading(false);
                            signIn(id, res.data.Id, loginType, res.data);
                           console.log(res.data);
                        }
                        else if (res.data.MessageCode == 201) {
                            setError(res.data.Message);
                            setLoading(false);
                        }
                        else {
                            setError('Please Try Again With Right Info!');
                            setLoading(false);

                        }
                    }).catch((err) => {

                        setError(err.message);
                        setLoading(false);


                    });
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            }
            else {
                const url = `${GLOBAL_BACKEND_URL}/Teacher/Login/?deptId=${deptId}&user=${id}&pass=${encodedPassword}&loginType=${loginType}`;
                console.log(url);
                
                try {
                    await axios.post(url).then((res) => {
                        if (res.data.MessageCode == 200) {
                            AsyncStorage.setItem('userToken', JSON.stringify(res.data.Id));
                            AsyncStorage.setItem('userState', loginType);
                            AsyncStorage.setItem('user', JSON.stringify(res.data));
                            setLoading(false);
                            signIn(id, res.data.Id, loginType, res.data);
                            console.log(res.data);
                           
                        }
                        else if (res.data.MessageCode == 201) {
                            setError(res.data.Message);
                            setLoading(false);
                        }
                        else {
                            setError('Please Try Again With Right Info!');
                            setLoading(false);

                        }
                    }).catch((err) => {

                        setError(err.message);
                        setLoading(false);


                    });
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            }
        }
        else {
            setLoading(false);
            setError('ID and Password Required')
        }
    }

   
    useEffect(() => {
        if (loginType === 'teacher' || loginType === 'student') {
            setLoading(true);
            const url = `${GLOBAL_BACKEND_URL}/Teacher/DepartmentName`
            axios.get(url).then((res) => {
                if (res.data.MessageCode = 200) {
                    setDepartments(res.data.Data);
                    setLoading(false);
                    setError(null);
                } else {
                    setDepartments(department);
                   // setError(res.data.Message);
                    setLoading(false);
                }

            }
            ).catch((err) => {
                setDepartments(department);
                //setError(err.message);
                setLoading(false);
            })
           
        }
        else {
          
        }

    }, [loginType])

    return (
        <>
            {/* <Header onPressBack={() => navigation.goBack()} backgroundColor={colors.white}/> */}
            <ScrollView style={styles.container}>
           
                {/* <ScrollView showsVerticalScrollIndicator={false} > */}
                <KeyboardAvoidingView >
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                    {/* <Title>Welcome</Title> */}
                    {error && <Message error message={error} />}
                    {/* <Text style={{ color: colors.danger, padding: 10 }}>{error}</Text> */}
                   

                        <View style={{ borderWidth: 1, borderColor: colors.primary, marginBottom:5}}>
                            <Picker

                                loginType={loginType}
                                style={styles.picker}
                                selectedValue={loginType}
                                onValueChange={(itemValue, itemIndex) => setLoginType(itemValue)}
                            >
                                <Picker.Item label="Student" value="student" color={colors.black} />
                                <Picker.Item label="Teacher" value="teacher" color={colors.black} />
                            </Picker>
                        </View>
                        {(loginType === 'teacher' || loginType === 'student') && <View  style={{ borderWidth: 1, borderColor: colors.primary, }}>
                           <Picker
                                deptId={deptId}
                                style={styles.picker}
                                selectedValue={deptId}
                                onValueChange={(itemValue, itemIndex) => setDeptId(itemValue)}
                            >
                                {departments.map((department,index)=>{
                                    return(
                                        <Picker.Item key={index} label={`${department.department}-${department.fullname}`} value={department.id} color={colors.black} />
                                    )
                                })}
                                
                            </Picker>
                        </View>}
                        <AppTextInput
                            icon="account"
                            onChangeText={onChangeId}
                            value={id}
                            placeholder="User ID"

                        />
                         
                        <AppTextInput
                            autoCapitalize="none"
                            icon="lock"
                            placeholder="Password"
                            secureTextEntry={hidePass}
                            autoCorrect={false}
                            textContentType="password"
                            name="password"
                            onChangeText={onChangePassword}
                            password
                            onPressHide={() => { setHidePass(!hidePass) }}
                            hide={hidePass}
                        />
                        <AppFilledButton title="Login" loading={loading} disable={loading} onPress={() => onSubmit(id, password, loginType,deptId)} primary />
                       
                    </KeyboardAvoidingView>
                </ScrollView>
                
            {/* </View> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
       
        padding: 20,
        backgroundColor: colors.white,
        height: Dimensions.get('window').height
    },
    logo: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        marginTop: 20
    },
    form: {

    },
    picker: {
        borderColor: colors.grey,
        width: "100%",
        borderWidth: 1,
        backgroundColor: colors.grey,
        borderRadius:10
    }
})
