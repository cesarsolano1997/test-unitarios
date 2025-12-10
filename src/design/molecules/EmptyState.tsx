import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Typography } from '../atoms'

export interface EmptyStateProps {
  message?: string
  testID?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No items found',
  testID = 'empty-container'
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <Typography variant="body" align="center">
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
    padding: 20
  }
})

export default EmptyState
