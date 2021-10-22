import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function SingleEntry({ route }) {
  const { itemId } = route.params

  console.log(itemId)
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text>SingleEntry Screen </Text>
    </View>
  )
}
