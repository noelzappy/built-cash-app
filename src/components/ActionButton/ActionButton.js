import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { width, height as pHeight } from 'react-native-dimension'
import en from '../../languages/english'
import Button from '../Button'
import { appColors } from '../../theme/globalStyle'

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
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: appColors.appWhite,
    borderColor: '#fff',
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
          backgroundColor={appColors.appGreen}
          color="white"
          style={styles.btnStyle}
          txtStyle={styles.txtStyle}
          icon={
            <AntDesign
              name="pluscircleo"
              size={26}
              color={appColors.appWhite}
            />
          }
          onPress={() => {
            navigation.navigate('EntryScreen', {
              title: en.CASH_IN_ENTRY,
              entryType: 'cashIn',
            })
          }}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          title={en.OUT}
          backgroundColor={appColors.appRed}
          color="white"
          style={styles.btnStyle}
          txtStyle={styles.txtStyle}
          icon={
            <AntDesign
              name="minuscircleo"
              size={26}
              color={appColors.appWhite}
            />
          }
          onPress={() => {
            navigation.navigate('EntryScreen', {
              title: en.CASH_OUT_ENTRY,
              entryType: 'cashOut',
            })
          }}
        />
      </View>
    </View>
  )
}
