import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Typography } from '../atoms'

export interface PriceDisplayProps {
  label?: string
  price: number
  size?: 'small' | 'medium' | 'large'
  testID?: string
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  label,
  price,
  size = 'medium',
  testID
}) => {
  const getPriceVariant = () => {
    switch (size) {
      case 'small':
        return 'h3'
      case 'large':
        return 'h1'
      default:
        return 'h2'
    }
  }

  return (
    <View style={styles.container}>
      {label && (
        <Typography variant="h3" style={styles.label}>
          {label}
        </Typography>
      )}
      <Typography
        variant={getPriceVariant()}
        color="#007AFF"
        testID={testID}
      >
        S/.{price.toFixed(2)}
      </Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  label: {
    marginRight: 8
  }
})

export default PriceDisplay
