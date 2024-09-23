import React from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../theme/colors";



export default function AppTextInput({ icon, password, onPressHide, hide, ...otherProps }) {
  return (
    
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={25}
          color={colors.gray}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.gray}
        style={[styles.textInput, { width: password ? '80%' : '90%' }]}
        {...otherProps}
      />
      {password && <TouchableOpacity onPress={onPressHide}>
        <MaterialCommunityIcons
          name={hide ? 'eye' : 'eye-off'}
          size={25}
          color={colors.gray}
          style={styles.icon}
        />
      </TouchableOpacity>}
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: colors.primary,
    // padding: 15,
    marginVertical: 10,
    width: "100%",
    borderWidth: 1,
    padding:5,
    borderRadius:10
    
  },

  icon: {
    marginRight: 10,
    marginTop: 10
  },
  textInput: {
    color: colors.primary,
    fontSize: 18,

  },
});