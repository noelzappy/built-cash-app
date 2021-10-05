import React, { useEffect, useState, useCallback } from 'react'
import { View, Dimensions } from 'react-native'
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import AllCard from '../../components/AllCard/AllCard'
import CashTable from '../../components/CashTable/CashTable'
import ActionButton from '../../components/ActionButton'
import { fetchTransactions, watchTransactions } from '../../utils/actions'

const { height } = Dimensions.get('window')

export default function CashBook({ navigation }) {
  const { totalAmountInHand, allTransactions } = useSelector(
    (state) => state.mainReducer,
  )

  const dispatch = useDispatch()
  const [localData, setLocalData] = useState([])
  const [totalIn, setTotalIn] = useState(0)
  const [totalOut, setTotalOut] = useState(0)

  const sortLocalData = useCallback(() => {
    const tempArray = []
    let total_in = 0
    let total_out = 0
    if (!_.isEmpty(allTransactions)) {
      const nowDate = new Date()
      const today = `${nowDate.getDate()}-${nowDate.getMonth()}-${nowDate.getFullYear()}`.toString()

      Object.entries(allTransactions[today]).forEach((item) => {
        const item_1 = item[1]
        tempArray.push({
          time: item_1.time,
          [item_1.entryType]: item_1.amount,
          key: item[0],
        })
        if (item_1.entryType === 'cashIn') {
          total_in += parseFloat(item_1.amount)
        } else {
          total_out += parseFloat(item_1.amount)
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
    dispatch(fetchTransactions())
    sortLocalData()
    dispatch(watchTransactions())
    // console.log(_.isEmpty(allTransactions))
    // console.log(allTransactions)
    // console.log('Fired Once')
  }, [])

  useEffect(() => {
    sortLocalData()
  }, [allTransactions])

  return (
    <View style={{ flex: 1 }}>
      <AllCard totalBalance={totalAmountInHand} />
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
