import React, { useEffect, useState, useCallback } from 'react'
import { View, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import AllCard from '../../components/AllCard/AllCard'
import CashTable from '../../components/CashTable/CashTable'
import ActionButton from '../../components/ActionButton'
import { fetchData } from '../../utils/actions'

const { height } = Dimensions.get('window')

export default function CashBook({ navigation }) {
  const nowDate = new Date()
  let today =
    nowDate.getDate() +
    '-' +
    (nowDate.getMonth() + 1) +
    '-' +
    nowDate.getFullYear()

  today = today.toString()

  const { userDetail, data } = useSelector((state) => state.mainReducer)
  const dispatch = useDispatch()

  const [localData, setLocalData] = useState([])

  const sortLocalData = useCallback(() => {
    const tempArray = []
    for (const [key, value] of Object.entries(data.transactions[today])) {
      tempArray.push({ key, value })
    }

    const arr = []
    tempArray.forEach((e) => {
      arr.push({ time: e.value.time, [e.value.entryType]: e.value.amount })
    })
    setLocalData(arr)
  })

  useEffect(() => {
    // dispatch(fetchData(uid))
    dispatch(fetchData(userDetail.uid))
    // console.log(mainState.data)
    sortLocalData()
  }, [])

  useEffect(() => {
    sortLocalData()
  }, [data])

  return (
    <>
      <AllCard totalBalance={data.totalBalance} />
      <View
        style={{
          flex: 1,
          marginBottom: height - (height - 200),
        }}
      >
        <CashTable data={localData} />
      </View>
      <ActionButton navigation={navigation} />
    </>
  )
}
