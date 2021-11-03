import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import moment from 'moment'
import { TouchableOpacity } from 'react-native'
import Settings from 'screens/settings'
import { width } from 'react-native-dimension'
import { MaterialIcons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { deleteEntry } from 'utils/actions'
import Reports from '../../../screens/Reports'
import CashBook from '../../../screens/CashBook/CashBook'
import TopTabs from '../TopTabs/TopTabs'
import HeaderRight from './HeaderRight'
import HeaderTitle from './HeaderTitle'
import EntryScreen from '../../../screens/EntryScreen/EntryScreen'
import AuthScreen from '../../../screens/Auth/AuthScreen'
import SingleReport from '../../../screens/SingleReport/SingleReport'
import SingleEntry from '../../../screens/SingleEntry/SingleEntry'
import en from '../../../languages/english'
import EditEntry from '../../../screens/EditEntry/EditEntry'
import { appColors } from '../../../theme/globalStyle'

const Stack = createStackNavigator()

const navigationProps = {
  headerStyle: {
    backgroundColor: appColors.appBase,
    elevation: 0,
    shadowOpacity: 0,
  },
}

// ------------------------------------
// Navigators
// ------------------------------------

export const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="AuthScreen" component={AuthScreen} />
  </Stack.Navigator>
)

export const CashTab = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="CashBook" component={CashBook} />
  </Stack.Navigator>
)

export const ReportTab = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="CashTab" component={Reports} />
  </Stack.Navigator>
)

export const HomeNavigator = () => {
  const dispatch = useDispatch()
  return (
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
        name="EntryScreen"
        component={EntryScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerTintColor: appColors.appWhite,
        })}
      />
      <Stack.Screen
        name="SingleReport"
        component={SingleReport}
        options={({ route }) => {
          const { date } = route.params.item
          return {
            title: `${en.REPORT_OF} ${moment(date.split('-').join('/')).format(
              'DD MMM',
            )}`,
            headerTintColor: appColors.appWhite,
          }
        }}
      />

      <Stack.Screen
        name="SingleEntry"
        component={SingleEntry}
        options={({ route, navigation }) => ({
          title: en.ENTRY_DETAIL,
          headerTintColor: appColors.appWhite,
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{ paddingRight: width(3), padding: width(2) }}
                onPress={() => {
                  dispatch(
                    deleteEntry({
                      id: route.params.itemId,
                      date: route.params.itemDate,
                    }),
                  )
                  navigation.navigate('Home')
                }}
              >
                <MaterialIcons
                  name="delete"
                  size={width(7)}
                  color={appColors.appWhite}
                />
              </TouchableOpacity>
            )
          },
        })}
      />

      <Stack.Screen
        name="EditEntry"
        component={EditEntry}
        options={({ route }) => ({
          title: en.EDIT_ENTRY,

          headerTintColor: appColors.appWhite,
        })}
      />
    </Stack.Navigator>
  )
}
