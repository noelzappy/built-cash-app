import React, { useState, useEffect } from 'react'
import { View, Dimensions } from 'react-native'
import firebase from 'firebase'
import AllCard from '../../components/AllCard/AllCard'
import CashTable from '../../components/CashTable/CashTable'
import ActionButton from '../../components/ActionButton'
import { Button } from 'native-base'

const { height } = Dimensions.get('window')

export default function CashBook({ navigation }) {
  const [data, setData] = useState({})

  function getData() {
    console.log(
      firebase
        .database()
        .ref('data/')
        .on('value', (snapshot) => {
          console.log(snapshot.val())
        }),
    )
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <AllCard />
      <Button onPress={getData} title="Hello" />
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
      <ActionButton navigation={navigation} />
    </>
  )
}
