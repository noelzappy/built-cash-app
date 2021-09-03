import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, StatusBar } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import en from '../../languages/english'
import AllCard from '../../components/AllCard/AllCard'
import CashTable from '../../components/CashTable/CashTable'
import ActionButton from '../../components/ActionButton'
import ReportTable from '../../components/ReportsTable/ReportTable'

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

const Home = () => {
  const [activateCashBook, setActivateCashBook] = useState(true)
  const [activateReports, setActivateReports] = useState(false)
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.inNavContainer}>
        <View>
          <Button
            title={en.CASHBOOK}
            onPress={() => {
              setActivateCashBook(true)
              setActivateReports(false)
            }}
            backgroundColor="transparent"
            style={
              activateReports === false ? styles.btnActive : styles.btnInactive
            }
            textStyle={
              activateReports === false
                ? styles.btnActiveText
                : styles.btnInactiveText
            }
          />
        </View>

        <View>
          <Button
            title={en.REPORTS}
            onPress={() => {
              setActivateCashBook(false)
              setActivateReports(true)
            }}
            backgroundColor="transparent"
            style={
              activateReports === true ? styles.btnActive : styles.btnInactive
            }
            textStyle={
              activateReports === true
                ? styles.btnActiveText
                : styles.btnInactiveText
            }
          />
        </View>
      </View>
      {activateCashBook ? (
        <>
          <AllCard />
          <CashTable time="10:15AM" cashIn={200} />
          <ActionButton />
        </>
      ) : (
        <ReportTable />
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
