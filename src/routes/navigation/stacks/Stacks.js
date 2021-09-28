import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from 'theme'
import Reports from '../../../scenes/Reports'
import CashBook from '../../../scenes/CashBook/CashBook'
import Settings from 'scenes/settings'
import TopTabs from '../TopTabs/TopTabs'
import HeaderRight from './HeaderRight'
import HeaderTitle from './HeaderTitle'
import CashIn from '../../../scenes/CashIn/CashIn'
import CashOut from 'scenes/CashOut'

const Stack = createStackNavigator()

const navigationProps = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: colors.darkPurple },
  headerTitleStyle: { fontSize: 18 },
}

// ------------------------------------
// Navigators
// ------------------------------------
// export const CashTab = () => (
//   <Stack.Navigator
//     screenOptions={{
//       headerShown: false,
//     }}
//   >
//     <Stack.Screen name="CashBook" component={CashBook} />
//   </Stack.Navigator>
// )

// export const ReportTab = () => (
//   <Stack.Navigator
//     screenOptions={{
//       headerShown: false,
//     }}
//   >
//     <Stack.Screen name="CashTab" component={Reports} />
//   </Stack.Navigator>
// )

export const HomeNavigator = () => (
  <Stack.Navigator headerMode="screen" screenOptions={navigationProps}>
    <Stack.Screen
      name="Home"
      component={TopTabs}
      options={({ navigation }) => ({
        title: 'Home',
        headerRight: () => <HeaderRight navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen
      name="CashIn"
      component={CashIn}
      options={() => ({
        title: 'Cash In Entry',
      })}
    />
    <Stack.Screen
      name="CashOut"
      component={CashOut}
      options={() => ({
        title: 'Cash Out Entry',
      })}
    />
  </Stack.Navigator>
)
