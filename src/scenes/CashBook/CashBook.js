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
    // console.log(data.transactions[today])
    const myData = data.transactions[today]
    const tempArray = []
    Object.entries(myData).forEach((item) => {
      const itemKey = item[0]
      const _item = item[1]
      tempArray.push({
        time: _item.time,
        [_item.entryType]: _item.amount,
        key: itemKey,
      })
    })
    setLocalData(tempArray.reverse())
  })

  useEffect(() => {
    dispatch(fetchData(userDetail.uid))
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
