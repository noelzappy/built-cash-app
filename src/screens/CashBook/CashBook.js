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
import {
  FontAwesome,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
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
  getBalanceOfDay,
} from '../../utils/actions'
import { appColors, appStyles } from '../../theme/globalStyle'
import NotFound from '../../../assets/images/not_found.svg'
import en from '../../languages/english'
import CustomCard from '../../components/CustomCard/CustomCard'
import DetailsCard from '../../components/DetailsCard'

const { height } = Dimensions.get('window')

export default function CashBook({ navigation, route }) {
  const { allTransactions, totalAmountInHand, businessDetails } = useSelector(
    (state) => state.mainReducer,
  )

  const bottomSheetRef = useRef(null)

  const dispatch = useDispatch()
  const [localData, setLocalData] = useState([])
  const [totalIn, setTotalIn] = useState(0)
  const [totalOut, setTotalOut] = useState(0)
  const [totalINPaidOnline, setTotalINPaidOnline] = useState(0)
  const [totalINPaidOffline, setTotalINPaidOffline] = useState(0)
  const [totalOUTPaidOnline, setTotalOUTPaidOnline] = useState(0)
  const [totalOUTPaidOffline, setTotalOUTPaidOffline] = useState(0)
  const [openBottomSheet, setOpenBottomSheet] = useState(false)

  const snapPoints = useMemo(() => ['30%', '90%'], [])
  const nowDate = new Date()
  const today =
    `${nowDate.getDate()}-${nowDate.getMonth()}-${nowDate.getFullYear()}`.toString()

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
    let paidOflineIN = 0
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
              paidOflineIN += parseFloat(item[1].amount)
            } else {
              paidOfflineOUT += parseFloat(item[1].amount)
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
    setTotalINPaidOffline(paidOflineIN)
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
            bottomSheetRef.current.close()
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
                {`${en.TODAYS_SUMMARY} (${moment().format('Do MMM')})`}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomColor: appColors.appLightAsh,
              borderBottomWidth: width(0.07),
              paddingBottom: pHeight(1.5),
            }}
          >
            <CustomCard color="green" amount={totalIn} />
            <Entypo
              name="minus"
              size={width(7)}
              color={appColors.appDarkAsh}
              style={{ paddingTop: pHeight(2) }}
            />
            <CustomCard color="red" amount={totalOut} />
            <MaterialCommunityIcons
              name="equal"
              size={width(7)}
              color={appColors.appDarkAsh}
              style={{ paddingTop: pHeight(2) }}
            />
            <CustomCard color="blue" amount={totalIn - totalOut} />
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <DetailsCard
              type="IN"
              cashAmount={totalINPaidOffline}
              onlineAmount={totalINPaidOnline}
            />
            <DetailsCard
              type="OUT"
              cashAmount={totalOUTPaidOffline}
              onlineAmount={totalOUTPaidOnline}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderTopColor: appColors.appLightAsh,
              borderTopWidth: width(0.07),
              marginTop: pHeight(2),
              paddingTop: pHeight(2),
            }}
          >
            <View
              style={{
                backgroundColor: 'rgba(47, 87, 148, 0.2)',
                padding: width(3),
                borderRadius: width(1),
              }}
            >
              <MaterialIcons
                name="swap-vert"
                size={width(7)}
                color={appColors.appBase}
              />
            </View>
            <View style={{ paddingHorizontal: width(3) }}>
              <Text
                style={{ ...appStyles.textMaxi, color: appColors.appDarkAsh }}
              >
                {`${en.RUNNING_BALANCE}`}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(47, 87, 148, 0.1)',
              padding: width(3),
              borderRadius: width(1),
              marginTop: pHeight(2),
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: width(2),
              }}
            >
              <View>
                <Text
                  style={{ ...appStyles.textMaxi, color: appColors.appBlue }}
                >
                  {en.CASH_IN_HAND}
                </Text>
              </View>
              <View>
                <Text
                  style={{ ...appStyles.textMaxi, color: appColors.appGreen }}
                >
                  {`${businessDetails.country.currency[0]} ${totalAmountInHand}`}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: width(2),
                paddingVertical: pHeight(2),
              }}
            >
              <View>
                <Text
                  style={{ ...appStyles.textMaxi, color: appColors.appBlue }}
                >
                  {en.ONLINE_BALANCE}
                </Text>
              </View>
              <View>
                <Text
                  style={{ ...appStyles.textMaxi, color: appColors.appGreen }}
                >
                  {`${businessDetails.country.currency[0]} ${totalINPaidOnline}`}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderTopColor: appColors.appDarkAsh,
                borderTopWidth: width(0.07),
                marginTop: pHeight(2),
                paddingTop: pHeight(2),
                justifyContent: 'space-between',
                paddingHorizontal: width(2),
              }}
            >
              <View>
                <Text
                  style={{ ...appStyles.textMaxi, color: appColors.appBlue }}
                >
                  {en.TOTAL_RUNNING_BALANCE}
                </Text>
              </View>
              <View>
                <Text
                  style={{ ...appStyles.textMaxi, color: appColors.appGreen }}
                >
                  {`${businessDetails.country.currency[0]} ${
                    totalAmountInHand + totalINPaidOnline
                  }`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}
