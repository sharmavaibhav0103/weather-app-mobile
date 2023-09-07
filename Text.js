import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const Text = ({ style, ...props }) => {
  return <RNText style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'cursive',
    fontWeight:'light' // Set your desired font family here
  },
});

export default Text;
