import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AppFilledButton from '../../components/AppFilledButton';
import Header from '../../components/Header';
import colors from '../../theme/colors';

function DashboardScreen(props) {
    return (
        <>
            <Header/>
            <TouchableOpacity onPress={()=>console.log("askjd")}>
            <View style={{padding:10,backgroundColor:colors.black}}><Text>Logout</Text></View>
            </TouchableOpacity>
            <AppFilledButton primary title={"alskdjf"} onPress={()=>console.log('asdf')} />
        </>
    );
}

export default DashboardScreen;