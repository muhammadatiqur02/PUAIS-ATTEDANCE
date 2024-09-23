import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../theme/colors";

export default function AppFilledButton({ icon, title, onPress, loading, disable, primary, danger,success, secondary,margin }) {


  const getBackgroundColor = () => {
    if (disable) {
      return colors.dark;
    }
    if (primary) {
      return colors.primary;
    }

    if (danger) {
      return colors.danger;
    }
    if (secondary) {
      return colors.secondary;
    }
    if(success){
      return colors.success;
    }
  };



  return (
    <TouchableOpacity

      onPress={onPress}
      disabled={disable}
      style={[styles.button, { backgroundColor: getBackgroundColor(), margin: margin ? 10 : 0 }]}>
      {!loading ?
        <>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={25}
              color={primary ? colors.white : colors.primary}
              style={styles.icon}
            />
          )}
          <Text style={styles.title}>{title}</Text>

        </>

        : <ActivityIndicator color={primary ? colors.secondary : colors.primary} />}


    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    padding: 10,
    width: "100%",
    marginVertical: 10,
    borderRadius: 5,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
    marginLeft: 10
  },
});