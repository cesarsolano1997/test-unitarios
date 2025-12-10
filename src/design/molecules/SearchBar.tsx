import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { Input } from '../atoms'

export interface SearchBarProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  testID?: string
  style?: ViewStyle
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  testID = 'search-input',
  style
}) => {
  return (
    <View style={[styles.container, style]}>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        testID={testID}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  }
})

export default SearchBar
