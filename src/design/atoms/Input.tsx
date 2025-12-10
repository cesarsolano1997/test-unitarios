import React from 'react'
import { TextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native'

export interface InputProps extends TextInputProps {
  testID?: string
  style?: ViewStyle
}

const Input: React.FC<InputProps> = ({ testID, style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      testID={testID}
      placeholderTextColor="#999999"
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333'
  }
})

export default Input
