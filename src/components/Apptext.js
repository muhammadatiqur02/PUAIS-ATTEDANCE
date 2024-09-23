import React from 'react'
import { StyleSheet, Text, Platform } from 'react-native'


export function Title(props) {

    const { children, style: style } = props;
    return (
        <Text style={[style, styles.title]}>
            {children}
        </Text>
    )
}
export function SubTitle(props) {

    const { children, style: style } = props;
    return (
        <Text style={[style, styles.subtitle]}>
            {children}
        </Text>
    )
}




const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: '700',
        padding: 10,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        textTransform: 'uppercase'
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        textTransform: 'uppercase'
    }
})
