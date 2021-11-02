import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { width, height } from 'react-native-dimension'
import en from 'languages/english'
import { appColors, appStyles } from '../../theme/globalStyle'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: 50,
    paddingBottom: 10,
    paddingTop: height(1),
    borderTopStartRadius: width(2),
    marginTop: height(3),
    borderColor: appColors.appDarkAsh,
    backgroundColor: appColors.appBase,
    borderTopEndRadius: width(2),
  },
  txtStyle: {
    ...appStyles.textMaxi,
    color: appColors.appWhite,
  },
})

export default function DownloadReportButton() {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => {
        console.log('Download Clicked')
      }}
    >
      <Text style={styles.txtStyle}>{en.DOWNLOAD_REPORTS}</Text>
    </TouchableOpacity>
  )
}
