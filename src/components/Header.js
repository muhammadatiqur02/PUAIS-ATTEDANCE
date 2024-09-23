import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';

const Header = ({ title, backgroundColor = colors.primary, avater, onPressProfile, onPressBack, onRightBtnPress, rightIcon }) => {

    const getIconColor = () => {
        if (backgroundColor == colors.primary) {
            return colors.white;
        }
        else if (backgroundColor == colors.white) {
            return colors.primary;
        }
        else {
            return colors.black;
        }
    }


    return (
        <View style={[styles.header, { backgroundColor: backgroundColor }]}>

            <TouchableOpacity style={styles.iconview} onPress={onPressBack}>
                {onPressBack && <Icon name="keyboard-backspace" size={30} color={getIconColor()} />}
            </TouchableOpacity>

            <View style={styles.titleview}><Text style={styles.title}>{title}</Text></View>
            <View style={styles.avaterview}>
                {avater && <TouchableOpacity onPress={onPressProfile}>
                    {avater == "avater" ? <Icon name="account-circle" size={50} color={colors.white} /> :
                        <Image style={styles.avater} source={{ uri: avater }} />

                    }
                </TouchableOpacity>}
                {onRightBtnPress && <TouchableOpacity style={styles.iconview} onPress={onRightBtnPress} >
                    <Icon name={rightIcon} size={30} color={getIconColor()} />
                </TouchableOpacity>}

            </View>

        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",

        height: 60
    },
    iconview: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10
    },
    avaterview: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    avater: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    newBtn: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.white,
        padding: 5,
        textTransform: 'uppercase'
    },
    titleview: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',

    },
})
