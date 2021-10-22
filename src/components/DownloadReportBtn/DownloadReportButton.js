import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import en from 'languages/english'
import { colors } from 'theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    borderTopColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 50,
    paddingBottom: 10,
    backgroundColor: colors.darkPurple,
  },
  txtStyle: {
    fontSize: 20,
    color: '#fff',
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
