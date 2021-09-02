import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from 'theme'
import Home from 'scenes/home'
import Settings from 'scenes/settings'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import HeaderRight from './HeaderRight'
import HeaderTitle from './HeaderTitle'

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Language
import * as en from '../../../languages/english'
// ------------------------------------

const Stack = createStackNavigator()

const navigationProps = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: colors.darkPurple },
  headerTitleStyle: { fontSize: 18 },
}

// ------------------------------------
// Navigators
// ------------------------------------

const HomeNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        title: en.Home,
        headerRight: () => <HeaderRight navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="Settings"
      component={Settings}
      options={({ navigation }) => ({
        title: 'Home',
        headerLeft: () => (
          <FontIcon.Button
            name="arrow-circle-left"
            color="white"
            backgroundColor="transparent"
            onPress={() => {
              navigation.goBack()
            }}
            style={{ paddingLeft: 15 }}
          />
        ),
        headerTitle: () => <HeaderTitle />,
      })}
    />
  </Stack.Navigator>
)

// export const ProfileNavigator = () => (
//   <Stack.Navigator
//     initialRouteName="Profile"
//     headerMode="screen"
//     screenOptions={navigationProps}
//   >
//     <Stack.Screen
//       name="Profile"
//       component={Profile}
//       options={({ navigation }) => ({
//         title: en.Profile,
//         headerRight: () => <HeaderLeft navigation={navigation} />,
//         headerTitle: () => <HeaderTitle />,
//       })}
//     />
//     <Stack.Screen
//       name="Settings"
//       component={Settings}
//       options={{
//         title: 'Settings',
//       }}
//     />
//   </Stack.Navigator>
// )

export default HomeNavigator
