import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';

import Icon from './Icon';


export default function Listitem({
  iconSize = 40,
  iconbackgroundColor = '#000',
  iconName,
  title,
  onPress,
  children,
}) {

  return (
    <TouchableOpacity onPress={onPress} style={styles.list}>
      <Icon
        name={iconName}
        size={iconSize}
        backgroundColor={iconbackgroundColor}
        iconColor={colors.white}
      />
      <Text style={styles.title}>
        {title}
      </Text>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  title: {
    fontSize: 22,
    marginLeft: 10,
    color: colors.gray_dim
  },
});
