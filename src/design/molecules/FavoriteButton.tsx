import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Typography } from '../atoms'

export interface FavoriteButtonProps {
  isFavorite: boolean
  onToggle: () => void
  testID?: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
  testID = 'favorite-button'
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onToggle}
      testID={testID}
    >
      <Typography variant="h2">
        {isFavorite ? '❤️' : '🤍'}
      </Typography>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4
  }
})

export default FavoriteButton
