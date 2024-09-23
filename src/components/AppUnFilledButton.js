import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../theme/colors";

export default function AppUnFilledButton({ icon, title, onPress, loading, disable, primary, danger, secondary }) {


  const getBorderColor = () => {
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
  };



  return (
    <TouchableOpacity

      onPress={onPress}
      disabled={disable}
      style={[styles.button, { borderColor: getBorderColor() }]}>
      {!loading ? 
      <Text style={[styles.title, { color: getBorderColor() }]}>{title}</Text>
      :
       <ActivityIndicator color={primary ? colors.secondary : colors.primary} />}

      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={25}
          color={primary ? colors.secondary : colors.primary}
          style={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection:'row',
    padding: 15,
    width: "100%",
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1
  },
  title: {

    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});