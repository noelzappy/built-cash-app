import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, View, StatusBar, Dimensions,
} from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import en from '../../languages/english'
import AllCard from '../../components/AllCard/AllCard'
import CashTable from '../../components/CashTable/CashTable'
import ActionButton from '../../components/ActionButton'
import ReportTab from '../../components/ReportTab'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inNavContainer: {
    color: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    backgroundColor: colors.darkPurple,
    paddingTop: 30,
  },
  btnInactive: {
    paddingVertical: 10,
  },
  btnActive: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
  btnInactiveText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 18,
  },
  btnActiveText: {
    color: 'white',
    fontSize: 20,
  },
})
const { height } = Dimensions.get('window')

const Home = () => {
  const [cashBookActive, setCashBookActive] = useState(true)

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.inNavContainer}>
        <View>
          <Button
            title={en.CASHBOOK}
            onPress={() => {
              setCashBookActive(!cashBookActive)
            }}
            backgroundColor="transparent"
            style={
              cashBookActive === true ? styles.btnActive : styles.btnInactive
            }
            textStyle={
              cashBookActive === true
                ? styles.btnActiveText
                : styles.btnInactiveText
            }
          />
        </View>

        <View>
          <Button
            title={en.REPORTS}
            onPress={() => {
              setCashBookActive(!cashBookActive)
            }}
            backgroundColor="transparent"
            style={!cashBookActive ? styles.btnActive : styles.btnInactive}
            textStyle={
              !cashBookActive ? styles.btnActiveText : styles.btnInactiveText
            }
          />
        </View>
      </View>
      {cashBookActive ? (
        <>
          <AllCard />
          <View
            style={{
              flex: 1,
              marginBottom: height - (height - 200),
            }}
          >
            <CashTable
              data={[
                { time: '10:15AM', cashIn: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashIn: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashIn: 200 },
                { time: '10:15AM', cashIn: 200 },
                { time: '10:15AM', cashIn: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashIn: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashIn: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashIn: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashIn: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashIn: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashIn: 200 },
                { time: '10:15AM', cashOut: 500 },
                { time: '10:15AM', cashIn: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashIn: 200 },
                { time: '10:15AM', cashOut: 500 },
                { time: '10:15AM', cashIn: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashIn: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashOut: 500 },
                { time: '10:15AM', cashIn: 200 },
                { time: '10:15AM', cashOut: 200 },
                { time: '10:15AM', cashIn: 100 },
                { time: '10:15AM', cashOut: 400 },
                { time: '10:15AM', cashIn: 600 },
                { time: '10:15AM', cashOut: 500 },
              ]}
            />
          </View>
          <ActionButton />
        </>
      ) : (
        <ReportTab />
      )}
    </View>
  )
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}

export default Home
