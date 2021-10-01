import React, { useEffect, useState } from 'react'
import { View, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import AllCard from '../../components/AllCard/AllCard'
import CashTable from '../../components/CashTable/CashTable'
import ActionButton from '../../components/ActionButton'
import { fetchData } from '../../utils/actions'

const { height } = Dimensions.get('window')

export default function CashBook({ navigation }) {
  const [bookData, setBookData] = useState([])
  const mainState = useSelector((state) => state.mainReducer)
  const dispatch = useDispatch()
  // const uid = 'nZGfyZrDy6XmTGZhXNvoWXcxZv53'

  useEffect(() => {
    // // console.log(mainState.userDetail.uid)
    // dispatch(fetchData(uid))
    dispatch(fetchData(mainState.userDetail.uid))
    // console.log(mainState)
  }, [])
  // useEffect(() => {
  //   const tempData = []
  //   mainState.data.map((item) => tempData.push(item))
  //   setBookData(tempData)
  // }, [mainState.data])

  return (
    <>
      <AllCard />
      <View
        style={{
          flex: 1,
          marginBottom: height - (height - 200),
        }}
      >
        <CashTable data={mainState.data.transactions} />
      </View>
      <ActionButton navigation={navigation} />
    </>
  )
}
