import React, { useEffect, useState, useCallback } from 'react'
import { View, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import AllCard from '../../components/AllCard/AllCard'
import CashTable from '../../components/CashTable/CashTable'
import ActionButton from '../../components/ActionButton'
import {
  fetchBusinessDetails,
  fetchTodaysTransactions,
  // watchTransactions,
} from '../../utils/actions'

const { height } = Dimensions.get('window')

export default function CashBook({ navigation }) {
  const {
    user,
    totalAmountInHand,
    todaysTransfers,
    businessDetails,
    error,
  } = useSelector((state) => state.mainReducer)

  const dispatch = useDispatch()
  const [localData, setLocalData] = useState([])
  const [totalIn, setTotalIn] = useState(0)
  const [totalOut, setTotalOut] = useState(0)

  const sortLocalData = useCallback(() => {
    const tempArray = []
    let _totalIn = 0
    let _totalOut = 0
    console.log(todaysTransfers)
    if (typeof todaysTransfers !== 'undefined') {
      Object.entries(todaysTransfers).forEach((item) => {
        const _item = item[1]
        tempArray.push({
          time: _item.time,
          [_item.entryType]: _item.amount,
          key: item[0],
        })
        if (_item.entryType === 'cashIn') {
          _totalIn += parseFloat(_item.amount)
        } else {
          _totalOut += parseFloat(_item.amount)
        }
      })
    } else {
      setLocalData(tempArray)
      console.log('Got undefined')
    }

    setTotalIn(_totalIn)
    setTotalOut(_totalOut)
    setLocalData(tempArray.reverse())
  })

  useEffect(() => {
    // console.log(user.uid)
    // dispatch(watchTransactions(user.uid))
    dispatch(fetchBusinessDetails(user.uid))
    dispatch(fetchTodaysTransactions(user.uid))
    sortLocalData()
    console.log('Fired Once')
    // console.log(localData)
  }, [])

  // useEffect(() => {
  //   sortLocalData()
  // }, [transactions])

  return (
    <View style={{ flex: 1 }}>
      <AllCard totalBalance={10} />
      <View
        style={{
          flex: 1,
          marginBottom: height - (height - 200),
        }}
      >
        <CashTable data={localData} totalInOut={{ totalIn, totalOut }} />
      </View>
      <ActionButton navigation={navigation} />
    </View>
  )
}
