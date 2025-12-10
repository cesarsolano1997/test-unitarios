import React from 'react'
import { Image, StyleSheet, ImageStyle } from 'react-native'

export interface ProductImageProps {
  uri: string
  size?: 'small' | 'medium' | 'large'
  testID?: string
  style?: ImageStyle
}

const ProductImage: React.FC<ProductImageProps> = ({
  uri,
  size = 'medium',
  testID,
  style
}) => {
  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.small
      case 'large':
        return styles.large
      default:
        return styles.medium
    }
  }

  return (
    <Image
      source={{ uri }}
      style={[styles.image, getSizeStyle(), style]}
      testID={testID}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
    backgroundColor: '#E0E0E0'
  },
  small: {
    width: 60,
    height: 60
  },
  medium: {
    width: 80,
    height: 80
  },
  large: {
    width: 120,
    height: 120
  }
})

export default ProductImage
