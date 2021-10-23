import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'native-base'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import { width, height } from 'react-native-dimension'
import { colors, globalStyles } from '../../theme'
import en from '../../languages/english'

const styles = StyleSheet.create({
  innerContainer: {
    padding: height(2),
    margin: width(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: width(95),
  },
  headinContainer: {},
})
export default function SingleEntry({ navigation, route }) {
  const { allTransactions } = useSelector((state) => state.mainReducer)
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
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text>{en.ENTRY_TYPE}</Text>
            {entryItem.entryType === 'cashIn' ? (
              <Text>{en.IN}</Text>
            ) : (
              <Text>{en.OUT}</Text>
            )}
          </View>
          <View>
            <Text>{en.AMOUNT}</Text>
            <Text>{entryItem.amount}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text>{en.ENTRY_DESCRIPTION}</Text>
            <Text>{entryItem.description}</Text>
          </View>
          <View>
            <Text>{en.PAYMENT_METHOD}</Text>
            <Text>{entryItem.paymentMethod}</Text>
          </View>
        </View>
        {entryItem.customer ? (
          <View>
            <Text>Customer</Text>
            <Text>{entryItem.customer.name}</Text>
          </View>
        ) : null}

        <View
          style={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}
        >
          <Button
            onPress={() => {
              navigation.navigate('EditEntry', {
                itemId: entryItemId,
                entryItem,
                itemDate,
              })
            }}
          >
            {en.EDIT_ENTRY}
          </Button>
        </View>
      </View>
    </View>
  ) : null
}
