import React, { useEffect, useState, useCallback } from 'react'
import { View, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Fab, Icon, Box } from 'native-base'
import { EvilIcons } from '@expo/vector-icons'
import AllCard from '../../components/AllCard/AllCard'
import CashTable from '../../components/CashTable/CashTable'
import ActionButton from '../../components/ActionButton'
import { fetchBusinessData, fetchTodayData } from '../../utils/actions'
import { Button } from 'react-native-paper'

const { height } = Dimensions.get('window')

export default function CashBook({ navigation }) {
  const { userDetail, data, transactionsToday, businessDetails } = useSelector(
    (state) => state.mainReducer,
  )

  const dispatch = useDispatch()
  const [localData, setLocalData] = useState([])
  const [totalIn, setTotalIn] = useState(0)
  const [totalOut, setTotalOut] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const sortLocalData = useCallback(() => {
    const nowDate = new Date()
    let today =
      nowDate.getDate() +
      '-' +
      (nowDate.getMonth() + 1) +
      '-' +
      nowDate.getFullYear()
    today = today.toString()

    const tempArray = []
    let _totalIn = 0
    let _totalOut = 0

    // console.log(toUse)
    // if (typeof transactions !== 'undefined') {
    Object.entries(transactionsToday).forEach((item) => {
      // console.log(item)

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
    // } else {
    //   setLocalData(tempArray)
    //   console.log('Got undefined')
    // }

    setTotalIn(_totalIn)
    setTotalOut(_totalOut)
    setLocalData(tempArray.reverse())
  })

  useEffect(() => {
    dispatch(fetchTodayData(userDetail.uid))
    console.log(userDetail.uid)
    dispatch(fetchBusinessData(userDetail.uid))
    sortLocalData()

    console.log('Fired Once')
  }, [])

  // useEffect(() => {
  //   sortLocalData()
  // }, [transactions])

  return (
    <View style={{ flex: 1 }}>
      <AllCard totalBalance={data.totalBalance} />
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
