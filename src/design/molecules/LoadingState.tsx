import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Typography } from '../atoms'

export interface LoadingStateProps {
  message?: string
  testID?: string
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  testID = 'loading-container'
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <ActivityIndicator size="large" color="#007AFF" testID="loading-spinner" />
      <Typography variant="body" style={styles.text}>
        {message}
      </Typography>
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
  text: {
    marginTop: 12
  }
})

export default LoadingState
