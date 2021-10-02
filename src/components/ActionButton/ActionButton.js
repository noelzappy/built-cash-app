import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import en from '../../languages/english'
import Button from '../Button'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: height - (height - 100),
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    borderTopColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  btnStyle: {
    justifyContent: 'space-evenly',
    padding: 5,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  txtStyle: {
    fontSize: 20,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
})

export default function ActionButton({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <Button
          title={en.IN}
          backgroundColor="rgba(0,128,0, 0.8)"
          color="white"
          style={styles.btnStyle}
          txtStyle={styles.txtStyle}
          icon={<AntDesign name="pluscircleo" size={26} color="white" />}
          onPress={() => {
            navigation.navigate('EntryScreen', {
              title: 'Cash In Entry',
              entryType: 'cashIn',
            })
          }}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          title={en.OUT}
          backgroundColor="rgba(255,0,0, 0.8)"
          color="white"
          style={styles.btnStyle}
          txtStyle={styles.txtStyle}
          icon={<AntDesign name="minuscircleo" size={26} color="white" />}
          onPress={() => {
            navigation.navigate('CashOut', {
              title: 'Cash In Entry',
              entryType: 'cashIn',
            })
          }}
        />
      </View>
    </View>
  )
}
