import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { width, height as pHeight } from 'react-native-dimension'
import BottomSheet from '@gorhom/bottom-sheet'
import {
  FontAwesome,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import CustomCard from 'components/CustomCard'
import DetailsCard from '../DetailsCard'
import { appStyles, appColors } from '../../theme/globalStyle'
import en from '../../languages/english'

export default function DetailBottomSheet(props) {
  const { totalAmountInHand, businessDetails } = useSelector(
    (state) => state.mainReducer,
  )
  const {
    openSheet,
    totalIn,
    totalOut,
    totalINPaidOnline,
    totalINPaidOffline,
    totalOUTPaidOffline,
    totalOUTPaidOnline,
    title,
    callBack,
    extra,
  } = props

  const bottomSheetRef = useRef(null)
  const snapPoints = useMemo(() => {
    if (extra) {
      return ['30%', '90%']
    }
    return ['30%', '60%']
  }, [])

  const handleSheetChanges = useCallback((index) => {
    callBack(index)
  }, [])
  useEffect(() => {
    if (openSheet) {
      bottomSheetRef.current.expand()
    } else {
      bottomSheetRef.current.close()
    }
  }, [openSheet])

  return (
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
      style={{ elevation: 2 }}
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
              {title}
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

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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

        {extra ? (
          <>
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
                    {`${businessDetails.country.currency[0]} ${totalAmountInHand.offlineBalance}`}
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
                    {`${businessDetails.country.currency[0]} ${totalAmountInHand.onlineBalance}`}
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
                      parseFloat(totalAmountInHand.offlineBalance) +
                      parseFloat(totalAmountInHand.onlineBalance)
                    }`}
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : null}
      </View>
    </BottomSheet>
  )
}
