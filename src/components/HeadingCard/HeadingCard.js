import React from 'react'
import { View, Text } from 'react-native'
import en from '../../languages/english'
import { globalStyles } from '../../theme'

export default function HeadingCard() {
  // const today = new Date().toLocaleDateString();

  return (
    <View style={globalStyles.headingCardContainer}>
      <View>
        <Text style={globalStyles.hCardTime}>{en.TODAYS_ENTRIES}</Text>
        <Text style={globalStyles.hCardDate}>Hello</Text>
      </View>

      <View>
        <Text style={globalStyles.hCardIn}>{en.TOTAL_IN}</Text>
        <Text style={globalStyles.hCardInText}>GHS 0.00</Text>
      </View>
      <View>
        <Text style={globalStyles.hCardOut}>{en.TOTAL_OUT}</Text>
        <Text style={globalStyles.hCardOutText}>GHS 854</Text>
      </View>
    </View>
  )
}
