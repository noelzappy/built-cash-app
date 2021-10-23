import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import BalanceCard from '../../components/BalanceCard/BalanceCard'
import CashTable from '../../components/CashTable/CashTable'
import DynamicBalanceCard from '../../components/DynamicBalanceCard'
import { getBalanceOfDay } from '../../utils/actions'

const { height } = Dimensions.get('window')

export default function SingleReport({ navigation, route }) {
  const { allTransactions, balanceOfDay } = useSelector(
    (state) => state.mainReducer,
  )
  const dispatch = useDispatch()
  const { item } = route.params

  const [data, setData] = useState(null)
  const [localData, setLocalData] = useState([])
  const [totalIn, setTotalIn] = useState(0)
  const [totalOut, setTotalOut] = useState(0)

  const sortLocalData = useCallback(() => {
    const nowDate = new Date()
    const today =
      `${nowDate.getDate()}-${nowDate.getMonth()}-${nowDate.getFullYear()}`.toString()

    const tempArray = []
    let total_in = 0
    let total_out = 0
    if (!_.isEmpty(data)) {
      data.forEach((e) => {
        if (e !== item.date) {
          Object.entries(e).forEach((element) => {
            if (!element.includes('balanceOfDay')) {
              const item_1 = element[1]
              tempArray.push({
                itemDate: item.date,
                time: item_1.time,
                [item_1.entryType]: item_1.amount,
                key: element[0],
              })
              if (item_1.entryType === 'cashIn') {
                total_in += parseFloat(item_1.amount)
              } else {
                total_out += parseFloat(item_1.amount)
              }
            }
          })
        }
      })
    } else {
      setLocalData(tempArray)
      console.log('Got undefined')
    }

    setTotalIn(total_in)
    setTotalOut(total_out)
    setLocalData(tempArray.reverse())
  })

  useEffect(() => {
    dispatch(getBalanceOfDay(item.date))

    Object.entries(allTransactions).forEach((entry) => {
      if (entry.includes(item.date)) {
        setData(entry)
      }
    })
    sortLocalData()
  }, [])

  useEffect(() => {
    sortLocalData()
  }, [data])

  return (
    <View style={{ flex: 1 }}>
      <DynamicBalanceCard
        data={{
          todaysBalance: totalIn - totalOut,
          totalAmountInHand: balanceOfDay,
        }}
      />
      <View
        style={{
          flex: 1,
          marginBottom: height - (height - 200),
        }}
      >
        <CashTable
          data={localData}
          totalInOut={{ totalIn, totalOut }}
          navigation={navigation}
          route={route}
        />
      </View>
    </View>
  )
}
