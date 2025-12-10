import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Typography } from '../atoms'

export interface StockIndicatorProps {
  stock: number
  testID?: string
}

const StockIndicator: React.FC<StockIndicatorProps> = ({
  stock,
  testID
}) => {
  const isOutOfStock = stock === 0
  const isLowStock = stock < 5 && stock > 0

  const getColor = () => {
    if (isOutOfStock) return '#F44336'
    if (isLowStock) return '#FF9800'
    return '#4CAF50'
  }

  const getMessage = () => {
    if (isOutOfStock) return 'Out of stock'
    return `${stock} items in stock`
  }

  return (
    <View style={styles.container}>
      <Typography
        variant="label"
        color={getColor()}
        testID={testID}
      >
        {getMessage()}
      </Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  }
})

export default StockIndicator
