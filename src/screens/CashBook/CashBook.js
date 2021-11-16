import React, { useEffect, useState, useCallback } from 'react'
import { View, Dimensions, TouchableOpacity, Text } from 'react-native'
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { width, height as pHeight } from 'react-native-dimension'
import moment from 'moment'
import BalanceCard from '../../components/BalanceCard/BalanceCard'
import CashTable from '../../components/CashTable/CashTable'
import ActionButton from '../../components/ActionButton'
import {
  fetchTransactions,
  watchTransactions,
  setTodaysBalance,
  watchCashInHand,
  fetchCashInHand,
} from '../../utils/actions'
import { appColors, appStyles } from '../../theme/globalStyle'
import NotFound from '../../../assets/images/not_found.svg'
import en from '../../languages/english'
import DetailBottomSheet from '../../components/DetailBottomSheet/DetailBottomSheet'

const { height } = Dimensions.get('window')

export default function CashBook({ navigation, route }) {
  const { allTransactions, totalAmountInHand, businessDetails, todaysBalance } =
    useSelector((state) => state.mainReducer)

  const dispatch = useDispatch()
  const [localData, setLocalData] = useState([])
  const [totalIn, setTotalIn] = useState(0)
  const [totalOut, setTotalOut] = useState(0)
  const [totalINPaidOnline, setTotalINPaidOnline] = useState(0)
  const [totalINPaidOffline, setTotalINPaidOffline] = useState(0)
  const [totalOUTPaidOnline, setTotalOUTPaidOnline] = useState(0)
  const [totalOUTPaidOffline, setTotalOUTPaidOffline] = useState(0)
  const [openBottomSheet, setOpenBottomSheet] = useState(false)

  const today = moment().format('MM-DD-YYYY')

  const handleSheetChanges = useCallback((index) => {
    if (index == -1) {
      setOpenBottomSheet(false)
    }
  }, [])

  const sortLocalData = useCallback(() => {
    const tempArray = []
    let total_in = 0
    let total_out = 0
    let paidOnlineIN = 0
    let paidOfflineIN = 0
    let paidOnlineOUT = 0
    let paidOfflineOUT = 0
    if (!_.isEmpty(allTransactions) && !_.isEmpty(allTransactions[today])) {
      Object.entries(allTransactions[today]).forEach((item) => {
        if (!item.includes('balanceOfDay')) {
          tempArray.push({
            key: item[0],
            time: item[1].time,
            [item[1].entryType]: item[1].amount,
            itemDate: today,
          })

          if (item[1].entryType === 'cashIn') {
            total_in += parseFloat(item[1].amount)

            if (item[1].paymentMethod === 'cash') {
              paidOfflineIN += parseFloat(item[1].amount)
            } else {
              paidOnlineIN += parseFloat(item[1].amount)
            }
          } else {
            total_out += parseFloat(item[1].amount)

            if (item[1].paymentMethod === 'online') {
              paidOnlineOUT += parseFloat(item[1].amount)
            } else {
              paidOfflineOUT += parseFloat(item[1].amount)
            }
          }
        }
      })
    } else {
      setLocalData(tempArray)
    }

    setTotalIn(total_in)
    setTotalOut(total_out)
    setTotalOUTPaidOffline(paidOfflineOUT)
    setTotalOUTPaidOnline(paidOnlineOUT)
    setTotalINPaidOffline(paidOfflineIN)
    setTotalINPaidOnline(paidOnlineIN)
    setLocalData(tempArray.reverse())
    dispatch(setTodaysBalance(totalIn - totalOut))
  })

  useEffect(() => {
    dispatch(fetchTransactions())
    sortLocalData()
    dispatch(watchTransactions())
    dispatch(fetchCashInHand())
    dispatch(watchCashInHand())
  }, [])

  useEffect(() => {
    sortLocalData()
  }, [allTransactions])

  return (
    <View style={{ backgroundColor: appColors.appDirtyWhite, flex: 1 }}>
      <TouchableOpacity
        style={{ paddingHorizontal: width(2) }}
        activeOpacity={0.6}
        onPress={() => {
          setOpenBottomSheet(!openBottomSheet)
        }}
      >
        <BalanceCard
          businessDetails={businessDetails}
          totalAmountInHand={totalAmountInHand}
          todaysBalance={todaysBalance}
          currency={
            businessDetails ? businessDetails.country.currency[0] : 'GHS'
          }
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          marginBottom: height - (height - 200),
        }}
      >
        {localData.length > 0 ? (
          <CashTable
            data={localData}
            totalInOut={{ totalIn, totalOut }}
            navigation={navigation}
            route={route}
          />
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <NotFound width={width(70)} height={pHeight(40)} />
            <Text style={{ ...appStyles.headTwo, color: appColors.appBase }}>
              {en.NO_ENTRY_YET}
            </Text>
          </View>
        )}
      </View>

      {openBottomSheet ? (
        <TouchableOpacity
          style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            top: 0,
            opacity: 0.5,
            backgroundColor: 'black',
            width: width(100),
            height: pHeight(100),
          }}
          activeOpacity={0.5}
          onPress={() => {
            setOpenBottomSheet(false)
          }}
        />
      ) : null}

      <ActionButton navigation={navigation} />
      <DetailBottomSheet
        openSheet={openBottomSheet}
        totalIn={totalIn}
        totalOut={totalOut}
        totalINPaidOnline={totalINPaidOnline}
        totalINPaidOffline={totalINPaidOffline}
        totalOUTPaidOffline={totalOUTPaidOffline}
        totalOUTPaidOnline={totalOUTPaidOnline}
        title={`${en.TODAYS_SUMMARY} (${moment().format('Do MMM')})`}
        callBack={handleSheetChanges}
        extra
      />
    </View>
  )
}
