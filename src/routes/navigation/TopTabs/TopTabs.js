import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
// import { ReportTab, CashTab } from '../stacks/Stacks'
import Reports from '../../../scenes/Reports'
import CashBook from '../../../scenes/CashBook/CashBook'
import en from '../../../languages/english'
import { colors } from '../../../theme'

const Tab = createMaterialTopTabNavigator()

export default function TopTabs() {
  const navigationProps = {
    tabBarItemStyle: {
      backgroundColor: colors.darkPurple,
    },
    tabBarStyle: { backgroundColor: colors.darkPurple },
    tabBarLabelStyle: { fontSize: 18 },
  }

  return (
    <Tab.Navigator headerMode="screen" screenOptions={navigationProps}>
      <Tab.Screen
        name="Reports"
        component={CashBook}
        options={() => ({
          title: en.CASHBOOK,
        })}
      />
      <Tab.Screen
        name="CashBook"
        component={Reports}
        options={() => ({
          title: en.REPORTS,
        })}
      />
    </Tab.Navigator>
  )
}
