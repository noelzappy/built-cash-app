import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
// import { ReportTab, CashTab } from '../stacks/Stacks'
import Reports from '../../../screens/Reports'
import CashBook from '../../../screens/CashBook/CashBook'
import en from '../../../languages/english'
import { colors } from '../../../theme'
import { appColors, appStyles } from '../../../theme/globalStyle'

const Tab = createMaterialTopTabNavigator()

export default function TopTabs() {
  return (
    <Tab.Navigator
      headerMode="screen"
      tabBarOptions={{
        activeTintColor: appColors.appWhite,
        inactiveTintColor: appColors.appLightAsh,
        style: {
          backgroundColor: appColors.appBase,
        },
        labelStyle: {
          ...appStyles.headRegular,
        },
      }}
    >
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
