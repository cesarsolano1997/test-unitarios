import React from 'react'
import { Text as RNText, StyleSheet, TextStyle } from 'react-native'

export interface TypographyProps {
  children: React.ReactNode
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label'
  color?: string
  align?: 'left' | 'center' | 'right'
  testID?: string
  style?: TextStyle
  numberOfLines?: number
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color,
  align = 'left',
  testID,
  style,
  numberOfLines
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'h1':
        return styles.h1
      case 'h2':
        return styles.h2
      case 'h3':
        return styles.h3
      case 'caption':
        return styles.caption
      case 'label':
        return styles.label
      default:
        return styles.body
    }
  }

  return (
    <RNText
      style={[
        getVariantStyle(),
        { color: color || styles.body.color, textAlign: align },
        style
      ]}
      testID={testID}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  )
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333'
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333'
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333'
  },
  body: {
    fontSize: 16,
    color: '#666666'
  },
  caption: {
    fontSize: 12,
    color: '#666666'
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333'
  }
})

export default Typography
