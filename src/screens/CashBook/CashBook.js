import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import {
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native'
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { width, height as pHeight } from 'react-native-dimension'
import BottomSheet from '@gorhom/bottom-sheet'
import { FontAwesome } from '@expo/vector-icons'
import BalanceCard from '../../components/BalanceCard/BalanceCard'
import CashTable from '../../components/CashTable/CashTable'
import ActionButton from '../../components/ActionButton'
import {
  fetchTransactions,
  watchTransactions,
  setTodaysBalance,
  watchCashInHand,
  fetchCashInHand,
  getBalanceOfDay,
} from '../../utils/actions'
import { appColors, appStyles } from '../../theme/globalStyle'
import NotFound from '../../../assets/images/not_found.svg'
import en from '../../languages/english'

const { height } = Dimensions.get('window')

export default function CashBook({ navigation, route }) {
  const { allTransactions } = useSelector((state) => state.mainReducer)

  const bottomSheetRef = useRef(null)

  const dispatch = useDispatch()
  const [localData, setLocalData] = useState([])
  const [totalIn, setTotalIn] = useState(0)
  const [totalOut, setTotalOut] = useState(0)
  const [openBottomSheet, setOpenBottomSheet] = useState(false)

  const snapPoints = useMemo(() => ['30%', '90%'], [])

  const handleSheetChanges = useCallback((index) => {
    if (index == -1) {
      setOpenBottomSheet(false)
    }
  }, [])

  const sortLocalData = useCallback(() => {
    const nowDate = new Date()
    const today =
      `${nowDate.getDate()}-${nowDate.getMonth()}-${nowDate.getFullYear()}`.toString()

    const tempArray = []
    let total_in = 0
    let total_out = 0
    if (!_.isEmpty(allTransactions) && !_.isEmpty(allTransactions[today])) {
      Object.entries(allTransactions[today]).forEach((item) => {
        if (!item.includes('balanceOfDay')) {
          const item_1 = item[1]
          tempArray.push({
            key: item[0],
            time: item_1.time,
            [item_1.entryType]: item_1.amount,
            itemDate: today,
          })
          if (item_1.entryType === 'cashIn') {
            total_in += parseFloat(item_1.amount)
          } else {
            total_out += parseFloat(item_1.amount)
          }
        }
      })
    } else {
      setLocalData(tempArray)
    }

    setTotalIn(total_in)
    setTotalOut(total_out)
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
          if (openBottomSheet) {
            bottomSheetRef.current.close()
          } else {
            bottomSheetRef.current.expand()
          }
        }}
      >
        <BalanceCard />
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
      <StatusBar
        style={appStyles.statusBar}
        animated
        backgroundColor={appColors.appBase}
        barStyle="light-content"
      />
      {openBottomSheet ? (
        <View
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
        />
      ) : null}

      <ActionButton navigation={navigation} />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        handleStyle={{
          backgroundColor: appColors.appWhite,
          borderTopStartRadius: width(12),
          borderTopEndRadius: width(12),
        }}
      >
        <View
          style={{
            flex: 1,
            padding: width(4),
            backgroundColor: appColors.appWhite,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: appColors.appLightAsh,
              borderBottomWidth: width(0.07),
              paddingBottom: pHeight(1.5),
            }}
          >
            <View
              style={{
                backgroundColor: 'rgba(47, 87, 148, 0.2)',
                padding: width(3),
                borderRadius: width(1),
              }}
            >
              <FontAwesome
                name="bar-chart"
                size={width(7)}
                color={appColors.appBase}
              />
            </View>
            <View style={{ paddingHorizontal: width(3) }}>
              <Text
                style={{ ...appStyles.textMaxi, color: appColors.appDarkAsh }}
              >
                {en.SINGLE_DAY}
              </Text>
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}
