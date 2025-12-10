import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Typography } from '../atoms'

export interface QuantitySelectorProps {
  quantity: number
  maxQuantity: number
  onIncrease: () => void
  onDecrease: () => void
  testID?: string
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  maxQuantity,
  onIncrease,
  onDecrease,
  testID = 'quantity-selector'
}) => {
  const canDecrease = quantity > 1
  const canIncrease = quantity < maxQuantity

  return (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity
        style={[styles.button, !canDecrease && styles.buttonDisabled]}
        onPress={onDecrease}
        disabled={!canDecrease}
        testID="decrease-quantity-button"
      >
        <Typography variant="h2" color="#FFFFFF">
          -
        </Typography>
      </TouchableOpacity>

      <Typography
        variant="h3"
        style={styles.quantity}
        testID="quantity-text"
      >
        {quantity}
      </Typography>

      <TouchableOpacity
        style={[styles.button, !canIncrease && styles.buttonDisabled]}
        onPress={onIncrease}
        disabled={!canIncrease}
        testID="increase-quantity-button"
      >
        <Typography variant="h2" color="#FFFFFF">
          +
        </Typography>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC'
  },
  quantity: {
    marginHorizontal: 24,
    minWidth: 40,
    textAlign: 'center'
  }
})

export default QuantitySelector
