import React from 'react';
import * as Animatable from 'react-native-animatable';

import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';



const Message = ({ message, success, warning, error, color, onPress, margin }) => {



  const getBackgroundColor = () => {
    if (success) {
      return colors.success_light;
    }
    else if (warning) {
      return colors.warning_light;
    }

    else if (error) {
      return colors.danger_light;
    }
    else {
      return color;
    }
  };
  const getLogo = () => {
    if (success) {
      return 'check-circle-outline';
    }
    else if (warning) {
      return 'information-outline';
    }

    else if (error) {
      return 'close-circle-outline';
    }
    else
      return 'chat-processing-outline'
  };
  const getLogoColor = () => {
    if (success || color == colors.success_light) {
      return colors.success;
    }
    else if (warning || color == colors.warning_light) {
      return colors.warning;
    }

    else if (error || color == colors.danger_light) {
      return colors.danger;
    }
    else
      return colors.white;
  };




  return (

    <Animatable.View animation={"lightSpeedIn"}  style={[styles.content, { backgroundColor: getBackgroundColor(), margin: margin ? 10 : 0 }]}>
      <MaterialCommunityIcons name={getLogo()} size={30} color={getLogoColor()} style={{ flex: 1 }} />
      <Text style={{ flex: 8, color: colors.gray_dim }}>{message} </Text>
      {onPress && <TouchableOpacity onPress={onPress} style={{ alignSelf: 'flex-end', flex: 1 }}>
        <MaterialCommunityIcons name='reload' size={25} color={colors.black} />
      </TouchableOpacity>}
    </Animatable.View>

  );
};
export default Message;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 2
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5
  }
});
