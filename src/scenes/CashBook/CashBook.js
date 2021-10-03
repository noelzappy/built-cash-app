import React, { useEffect, useState, useCallback } from 'react'
import { View, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Fab, Icon, Box } from 'native-base'
import { EvilIcons } from '@expo/vector-icons'
import AllCard from '../../components/AllCard/AllCard'
import CashTable from '../../components/CashTable/CashTable'
import ActionButton from '../../components/ActionButton'
import { calculateInOut, fetchData } from '../../utils/actions'
import { Button } from 'react-native-paper'

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

  const { userDetail, data, totalInOut } = useSelector(
    (state) => state.mainReducer,
  )
  const dispatch = useDispatch()
  const [localData, setLocalData] = useState([])
  const [totalIn, setTotalIn] = useState(0)
  const [totalOut, setTotalOut] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const sortLocalData = useCallback(() => {
    // console.log(data.transactions[today])
    const transaction = data.transactions[today]
    const tempArray = []
    let _totalIn = 0
    let _totalOut = 0
    try {
      Object.entries(transaction).forEach((item) => {
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
    } catch (err) {
      // console.log(err)
    }

    setTotalIn(_totalIn)
    setTotalOut(_totalOut)
    setLocalData(tempArray.reverse())
  })

  useEffect(() => {
    dispatch(fetchData(userDetail.uid))
    sortLocalData()
    setRefreshing(true)
  }, [])

  useEffect(() => {
    sortLocalData()
  }, [data])

  function onRefreshHandler() {
    dispatch(fetchData(userDetail.uid))
    sortLocalData()
  }

  return (
    <>
      <AllCard totalBalance={data.totalBalance} />
      <View
        style={{
          flex: 1,
          marginBottom: height - (height - 200),
        }}
      >
        <CashTable
          onRefresh={onRefreshHandler}
          refreshing={refreshing}
          data={localData}
          totalInOut={{ totalIn, totalOut }}
        />
      </View>

      <View>
        {/* <Box position="relative" h={100} w="100%">
          <Fab
            onPress={() => {
              onRefreshHandler()
            }}
            renderInPortal={false}
            placement="bottom-left"
            position="absolute"
            size={10}
            icon={
              <Icon color="white" as={<EvilIcons name="redo" />} size="sm" />
            }
          />
        </Box> */}
      </View>
      <ActionButton navigation={navigation} />
    </>
  )
}
