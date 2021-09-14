import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { ReportTab, CashTab } from '../stacks/Stacks'
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
        component={CashTab}
        options={() => ({
          title: en.REPORTS,
        })}
      />
      <Tab.Screen
        name="CashBook"
        component={ReportTab}
        options={() => ({
          title: en.CASHBOOK,
        })}
      />
    </Tab.Navigator>
  )
}
