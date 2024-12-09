import React, { useState, useContext } from 'react';
import { Alert, Button, Dimensions, Image, StyleSheet, Text, View, TextInput } from 'react-native';
import axios from 'axios'; // Import axios
import { AuthContext } from '../../context';
import { ATD_HOME, PROFILE } from '../../constants/routeName';
import Header from '../../components/Header';
import AppFilledButton from '../../components/AppFilledButton';
import colors from '../../theme/colors';
import Icon from '../../components/Icon';

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

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = async () => {
        try {
            // Update the user's profile on the server
            const data = JSON.stringify({
                Data: {
                    id: updatedUser.Id,
                    deptId: updatedUser.DeptId,
                    username: updatedUser.UserName,
                    email: updatedUser.Email,
                    address: updatedUser.Address,
                    designation: updatedUser.designation,
                },
                Message: "",
                MessageCode: 3,
            });

            const config = {
                method: 'post',
                url: 'http://101.2.163.134:8097/api/teacher/update',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            };

            const response = await axios(config);
            if (response.data) {
                // Update local state with the new user data
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

            <View style={{ backgroundColor: colors.primary, height: Dimensions.get('screen').height * 0.25, justifyContent: 'center', width: Dimensions.get('screen').width }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {user.Url ? (
                        <Image
                            source={{ uri: user.Url }}
                            style={{
                                height: 120,
                                width: 100,
                                borderRadius: 5,
                                margin: 10,
                            }}
                        />
                    ) : (
                        <Image
                            source={require('../../assets/images/profile-user.png')}
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 5,
                                margin: 20,
                            }}
                        />
                    )}
                    <View style={{ flex: 1, flexWrap: 'wrap' }}>
                        <Text style={{ color: colors.white, fontSize: 18, fontWeight: 'bold' }}>{user.Name}</Text>
                        <Text style={{ color: colors.white, fontSize: 16 }}>{'Teacher'}</Text>
                        <Text style={{ color: colors.white, fontSize: 16 }}>{user.designation}</Text>
                    </View>
                </View>
            </View>

            <View style={{ backgroundColor: colors.white, padding: 10, height: '100%' }}>
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
                        <TextInput
                            style={styles.input}
                            value={updatedUser.designation}
                            onChangeText={(text) => setUpdatedUser({ ...updatedUser, designation: text })}
                            placeholder="Designation"
                        />

                        <Button title="Save" onPress={handleSaveProfile} />
                    </>
                ) : (
                    <>
                        {user.Email && (
                            <View style={styles.list}>
                                <Icon name={'email'} iconColor={colors.black} backgroundColor={colors.white} size={50} />
                                <Text style={{ color: colors.black, fontSize: 16, flex: 1, flexWrap: 'wrap' }}>
                                    {user.Email.includes(",") ? user.Email.replace(', ', "\n") : user.Email}
                                </Text>
                            </View>
                        )}
                        {user.Phone && (
                            <View style={[styles.list, { marginTop: 7 }]}>
                                <Icon name={'phone'} iconColor={colors.black} backgroundColor={colors.white} size={50} />
                                <Text style={{ color: colors.black, fontSize: 16, flex: 1, flexWrap: 'wrap' }}>{user.Phone}</Text>
                            </View>
                        )}
                        {user.Address && (
                            <View style={[styles.list, { marginTop: 7 }]}>
                                <Icon name={'home'} iconColor={colors.black} backgroundColor={colors.white} size={50} />
                                <Text style={{ color: colors.black, fontSize: 16, flex: 1, flexWrap: 'wrap' }}>{user.Address}</Text>
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
