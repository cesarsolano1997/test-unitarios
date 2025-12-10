import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Typography, Button } from '../atoms'

export interface ErrorStateProps {
  message: string
  onRetry?: () => void
  testID?: string
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
  testID = 'error-container'
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <Typography
        variant="body"
        color="#F44336"
        align="center"
        style={styles.errorText}
        testID="error-message"
      >
        {message}
      </Typography>
      {onRetry && (
        <Button
          title="Retry"
          onPress={onRetry}
          testID="retry-button"
          style={styles.retryButton}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20
  },
  errorText: {
    marginBottom: 16
  },
  retryButton: {
    minWidth: 120
  }
})

export default ErrorState
