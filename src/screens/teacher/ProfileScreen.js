import React, { useState, useContext } from 'react';
import { Alert, Button, Dimensions, Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios'; // Import axios
import { AuthContext } from '../../context';
import { ATD_HOME, PROFILE } from '../../constants/routeName';
import Header from '../../components/Header';
import AppFilledButton from '../../components/AppFilledButton';
import colors from '../../theme/colors';
import Icon from '../../components/Icon';
import { GLOBAL_BACKEND_URL } from '../../../constants/baseUrl';

export default function ProfileScreen({ navigation }) {
    const { signOut, loginState } = useContext(AuthContext);
    const [user, setUser] = useState(loginState.data);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({ ...user });

    const handelLogout = () => {
        Alert.alert('Logout!', 'Are you sure you want to logout?', [
          {
            text: 'Cancel',
            onPress: () => {},
          },
          {
            text: 'OK',
            onPress: () => {
              signOut();
              console.log(`OK`);
            },
          },
        ]);
    };

    // Function to show developer information
    const handleShowDevInfo = () => {
        Alert.alert(
            'Developer Info',
            `'Version 2.0': \nDeveloper: Muhammad Atiqur Rahman, Liton Das, Imam Ali Mitu\nBatch: 37th\n\n'Version 1.0': \nDeveloper: Angana Barua, Fariha Chowdhury Bristy, Tasnim Sultana Chowdhury\nBatch: 33rd\n\n'Version 1.0 & 2.0': \nInstructor: Kingshuk Dhar\nAssistant Professor\nDept. of Computer Science & Engineering\nPremier University, Chattogram`,
            [{ text: 'OK', onPress: () => console.log('Developer Info Closed') }]
        );
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = async () => {
        try {
            // Update the user's profile on the server
            const data = JSON.stringify({
                Data: {
                    id: user.UserInfoId,
                    deptId: user.DeptId,
                    username: user.UserName,
                    email: updatedUser.Email,
                    address: updatedUser.Address
                },
                Message: "",
                MessageCode: 3
            });

            const config = {
                method: 'post',
                url: 'http://101.2.163.134:8097/api/teacher/update',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data: data
            };
            console.log(data);
            console.log(user);

            const response = await axios(config);
            if (response.data) {
                // Update local state with the new user data
                console.log(response.data);
                setUser(updatedUser);
                setIsEditing(false);
                Alert.alert('Success', 'Profile updated successfully');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile');
            console.error(error);
        }
    };
    
    return (
        <>
            <Header title={`${PROFILE}`} rightIcon="logout" onRightBtnPress={handelLogout} />

            {/* Dev button with <> symbol on the top left */}
            <TouchableOpacity style={styles.devButton} onPress={handleShowDevInfo}>
                <Text style={styles.devButtonText}>{'<>Dev '}</Text>
            </TouchableOpacity>

            <View style={{backgroundColor: colors.primary, height: Dimensions.get('screen').height * 0.25, justifyContent: 'center', width: Dimensions.get('screen').width}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {user.Url ? (
                        <Image
                            source={{ uri: user.Url }}
                            style={{
                                height: 120,
                                width: 100,
                                borderRadius: 5,
                                margin: 10
                            }}
                        />
                    ) : (
                        <Image
                            source={require('../../assets/images/profile-user.png')}
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 5,
                                margin: 20
                            }}
                        />
                    )}
                    <View style={{flex: 1, flexWrap: 'wrap'}}>
                        <Text style={{color: colors.white, fontSize: 18, fontWeight: 'bold'}}>{user.Name}</Text>
                        <Text style={{color: colors.white, fontSize: 16}}>{'Teacher'}</Text>
                    </View>
                </View>
            </View>

            <View style={{backgroundColor: colors.white, padding: 10, height: '100%'}}>

                {isEditing ? (
                    <>
                        <TextInput
                            style={styles.input}
                            value={updatedUser.Email}
                            onChangeText={(text) => setUpdatedUser({ ...updatedUser, Email: text })}
                            placeholder="Email"
                            keyboardType="email-address"
                        />
                        
                        <TextInput
                            style={styles.input}
                            value={updatedUser.Address}
                            onChangeText={(text) => setUpdatedUser({ ...updatedUser, Address: text })}
                            placeholder="Address"
                        />
                        <Button title="Save" onPress={handleSaveProfile} /> 
                    </>
                ) : (
                    <>
                        {user.Email && (
                            <View style={styles.list}>
                                <Icon name={'email'} iconColor={colors.black} backgroundColor={colors.white} size={50} />
                                <Text style={{color: colors.black, fontSize: 16, flex: 1, flexWrap: 'wrap'}}>
                                    {user.Email.includes(",") ? user.Email.replace(', ', "\n") : user.Email}
                                </Text>
                            </View>
                        )}
                        {user.Phone && (
                            <View style={[styles.list, { marginTop: 7 }]}>
                                <Icon name={'phone'} iconColor={colors.black} backgroundColor={colors.white} size={50} />
                                <Text style={{color: colors.black, fontSize: 16, flex: 1, flexWrap: 'wrap'}}>{user.Phone}</Text>
                            </View>
                        )}
                        {user.Address && (
                            <View style={[styles.list, { marginTop: 7 }]}>
                                <Icon name={'home'} iconColor={colors.black} backgroundColor={colors.white} size={50} />
                                <Text style={{color: colors.black, fontSize: 16, flex: 1, flexWrap: 'wrap'}}>{user.Address}</Text>
                            </View>
                        )}
                        <Button title="Edit Profile" onPress={handleEditProfile} />
                    </>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    devButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
    },
    devButtonText: {
        color: colors.white,
        fontWeight: 'bold',
    },
    Container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        flex: 1
    },
    input: {
        height: 50,
        borderColor: colors.gray,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    list: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: colors.white,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 6,
    },
});
