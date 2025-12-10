import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native'

export interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  loading?: boolean
  testID?: string
  style?: ViewStyle
  textStyle?: TextStyle
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  testID,
  style,
  textStyle
}) => {
  const isDisabled = disabled || loading

  const getButtonStyle = () => {
    if (isDisabled) {
      return styles.buttonDisabled
    }
    switch (variant) {
      case 'secondary':
        return styles.buttonSecondary
      case 'danger':
        return styles.buttonDanger
      default:
        return styles.buttonPrimary
    }
  }

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.textSecondary
      default:
        return styles.textPrimary
    }
  }

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), style]}
      onPress={onPress}
      disabled={isDisabled}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" testID={`${testID}-spinner`} />
      ) : (
        <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48
  },
  buttonPrimary: {
    backgroundColor: '#007AFF'
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#007AFF'
  },
  buttonDanger: {
    backgroundColor: '#F44336'
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC'
  },
  text: {
    fontSize: 16,
    fontWeight: '600'
  },
  textPrimary: {
    color: '#FFFFFF'
  },
  textSecondary: {
    color: '#007AFF'
  }
})

export default Button
