import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Button, Card } from 'native-base'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import { width, height } from 'react-native-dimension'
import { AntDesign } from '@expo/vector-icons'
import en from '../../languages/english'
import { appColors, appStyles } from '../../theme/globalStyle'

export default function SingleEntry({ navigation, route }) {
  const { allTransactions, businessDetails } = useSelector(
    (state) => state.mainReducer,
  )
  const { itemId, itemDate } = route.params
  const [entryItem, setEntryItem] = useState(null)
  const [entryItemId, setEntryItemId] = useState(null)

  const getItem = () => {
    Object.entries(allTransactions).forEach((item) => {
      if (item.includes(itemDate)) {
        Object.entries(item[1]).forEach((element) => {
          if (element.includes(itemId)) {
            setEntryItemId(element[0])
            setEntryItem(element[1])
          }
        })
      }
    })
  }

  useEffect(() => {
    getItem()
  }, [])

  return entryItem && entryItemId ? (
    <View style={{ backgroundColor: appColors.appDirtyWhite }}>
      <Card
        style={{
          backgroundColor: appColors.appWhite,
          marginVertical: height(2),
          marginHorizontal: width(3),
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: height(1),
          }}
        >
          {entryItem.entryType === 'cashIn' ? (
            <AntDesign
              name="pluscircle"
              size={width(7)}
              color={appColors.appGreen}
            />
          ) : (
            <AntDesign
              name="minuscircle"
              size={width(7)}
              color={appColors.appRed}
            />
          )}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <View
            style={{
              paddingTop: height(1),
              paddingLeft: '5%',
              paddingRight: '5%',
              borderRadius: width(2),
              paddingBottom: height(3),
              marginTop: height(3),
              borderColor: '#fff',
              elevation: 2,
              backgroundColor:
                entryItem.entryType === 'cashIn'
                  ? appColors.appGreen
                  : appColors.appRed,
            }}
          >
            <Text
              style={{
                ...appStyles.textRegular,
                color: appColors.appDirtyWhite,
                textAlign: 'center',
                paddingBottom: height(0.5),
              }}
            >
              {en.ENTRY_TYPE}
            </Text>
            {entryItem.entryType === 'cashIn' ? (
              <Text style={{ ...appStyles.textMaxi, textAlign: 'center' }}>
                {en.IN}
              </Text>
            ) : (
              <Text style={{ ...appStyles.textMaxi, textAlign: 'center' }}>
                {en.OUT}
              </Text>
            )}
          </View>
          <View
            style={{
              paddingTop: height(1),
              paddingLeft: '5%',
              paddingRight: '5%',
              borderRadius: width(2),
              paddingBottom: height(3),
              marginTop: height(3),
              borderColor: '#fff',
              elevation: 2,
              backgroundColor:
                entryItem.entryType === 'cashIn'
                  ? appColors.appGreen
                  : appColors.appRed,
            }}
          >
            <Text
              style={{
                ...appStyles.textRegular,
                color: appColors.appDirtyWhite,
                textAlign: 'center',
                paddingBottom: height(0.5),
              }}
            >
              {en.AMOUNT}
            </Text>
            <Text style={{ ...appStyles.textMaxi, textAlign: 'center' }}>
              {`${businessDetails.country.currency[0]} ${entryItem.amount}`}
            </Text>
          </View>
        </View>

        <View
          style={{
            // flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          {entryItem.description ? (
            <View
              style={{
                paddingTop: height(1),
                paddingLeft: '5%',
                paddingRight: '5%',
                borderRadius: width(2),
                paddingBottom: height(3),
                marginTop: height(3),
                borderColor: '#fff',
                elevation: 1,
                alignItems: 'center',
                backgroundColor: appColors.appBase,
              }}
            >
              <Text
                style={{
                  ...appStyles.textRegular,
                  color: appColors.appWhite,
                  marginVertical: height(1),
                  borderBottomColor: appColors.appLightAsh,
                  borderBottomWidth: width(0.4),
                }}
              >
                {en.ENTRY_DESCRIPTION}
              </Text>
              <Text
                style={{ ...appStyles.textMaxi, color: appColors.appWhite }}
              >
                {entryItem.description}
              </Text>
            </View>
          ) : null}

          <View
            style={{
              paddingTop: height(1),
              paddingLeft: '5%',
              paddingRight: '5%',
              borderRadius: width(2),
              paddingBottom: height(3),
              marginTop: height(3),
              borderColor: '#fff',
              elevation: 1,
              alignItems: 'center',
              backgroundColor: appColors.appBase,
            }}
          >
            <Text
              style={{
                ...appStyles.textRegular,
                color: appColors.appWhite,
                marginVertical: height(1),
                borderBottomColor: appColors.appLightAsh,
                borderBottomWidth: width(0.4),
              }}
            >
              {en.PAYMENT_METHOD}
            </Text>
            <Text style={{ ...appStyles.textMaxi, color: appColors.appWhite }}>
              {entryItem.paymentMethod.toUpperCase()}
            </Text>
          </View>
        </View>
        {entryItem.customer ? (
          <View
            style={{
              paddingTop: height(1),
              paddingLeft: '5%',
              paddingRight: '5%',
              borderRadius: width(2),
              paddingBottom: height(3),
              marginTop: height(3),
              borderColor: '#fff',
              elevation: 1,
              alignItems: 'center',
              backgroundColor: appColors.appBase,
            }}
          >
            <Text
              style={{
                ...appStyles.textRegular,
                color: appColors.appWhite,
                marginVertical: height(1),
                borderBottomColor: appColors.appLightAsh,
                borderBottomWidth: width(0.4),
              }}
            >
              {en.CUSTOMER}
            </Text>
            <Text style={{ ...appStyles.textMaxi, color: appColors.appWhite }}>
              {entryItem.customer.name.toUpperCase()}
            </Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={{
            paddingTop: height(2),
            paddingLeft: '5%',
            paddingRight: '5%',
            borderRadius: width(2),
            paddingBottom: height(2),
            marginTop: height(3),
            borderColor: '#fff',
            elevation: 1,
            alignItems: 'center',
            backgroundColor: appColors.appDirtyWhite,
            justifyContent: 'center',
            flexDirection: 'row',
          }}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('EditEntry', {
              itemId: entryItemId,
              entryItem,
              itemDate,
            })
          }}
        >
          <AntDesign name="edit" size={24} color={appColors.appRed} />
          <Text
            style={{
              ...appStyles.headBig,
              color: appColors.appRed,
              paddingLeft: width(3),
            }}
          >
            {en.EDIT_ENTRY}
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  ) : null
}
