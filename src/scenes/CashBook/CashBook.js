import React from 'react'
import { View, Dimensions } from 'react-native'
import AllCard from '../../components/AllCard/AllCard'
import CashTable from '../../components/CashTable/CashTable'
import ActionButton from '../../components/ActionButton'

const { height } = Dimensions.get('window')

export default function CashBook() {
  return (
    <>
      <AllCard />
      <View
        style={{
          flex: 1,
          marginBottom: height - (height - 200),
        }}
      >
        <CashTable
          data={[
            { time: '10:15AM', cashIn: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashIn: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashIn: 200 },
            { time: '10:15AM', cashIn: 200 },
            { time: '10:15AM', cashIn: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashIn: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashIn: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashIn: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashIn: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashIn: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashIn: 200 },
            { time: '10:15AM', cashOut: 500 },
            { time: '10:15AM', cashIn: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashIn: 200 },
            { time: '10:15AM', cashOut: 500 },
            { time: '10:15AM', cashIn: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashIn: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashOut: 500 },
            { time: '10:15AM', cashIn: 200 },
            { time: '10:15AM', cashOut: 200 },
            { time: '10:15AM', cashIn: 100 },
            { time: '10:15AM', cashOut: 400 },
            { time: '10:15AM', cashIn: 600 },
            { time: '10:15AM', cashOut: 500 },
          ]}
        />
      </View>
      <ActionButton />
    </>
  )
}
