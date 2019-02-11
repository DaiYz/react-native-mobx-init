import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import Material from 'react-native-vector-icons/MaterialIcons'
import Views from './views'
import SvgIcon from 'react-native-svg-iconfont'
import * as iconPath from './source/svg'
import Stores from './stores'
const _HEADER_BACK_BUTTON = (navigation) => {
  const { routeName } = navigation.state
  return (<TouchableOpacity
    activeOpacity={0.7}
    style={{ top: 1, width: 54, paddingLeft: 15, justifyContent: 'center', alignItems: 'flex-start' }}
    onPress={() => navigation.goBack()}
  >
    <Material name={'keyboard-arrow-left'} size={30} color={'#333'} />
  </TouchableOpacity>)
}
const MODAL_DEFAULT_OPTIONS = {
  mode: 'modal',
  headerMode: 'none'
}

const TAB_BAR_DEFAULT_OPTIONS = {
  defaultNavigationOptions: ({ navigation }) => {
    const tabBarOnPress = ({ navigation, defaultHandler }) => {
      defaultHandler()
    }
    const tabBarIcon = ({ focused, tintColor }) => {
      const { routeName, params = {} } = navigation.state
      const badge = params?.badge ? params.badge : Stores.account.badge
      let iconName
      if (routeName === 'Find') { iconName = iconPath.easy } else
      if (routeName === 'Video') { iconName = iconPath.video } else
      if (routeName === 'Mine') { iconName = iconPath.music } else
      if (routeName === 'Friends') { iconName = iconPath.friends } else {
        return <View style={{ flexDirection: 'row', paddingTop: 4, paddingRight: 4 }}>
          <SvgIcon path={iconPath.account} size={22} fill={focused ? ['#d62804'] : ['#666']} />
          <View style={{ backgroundColor: 'red', width: 14, height: 14, position: 'absolute', top: 0, right: 0, justifyContent: 'center', alignItems: 'center', borderRadius: 7 }}>
            <Text style={{ color: '#fff', fontSize: 12 }}>{badge}</Text>
          </View>
        </View>
      }
      return (<SvgIcon path={iconName} size={22} fill={focused ? ['#d62804'] : ['#666']} />)
    }
    let title = ''
    const { routeName } = navigation.state
    if (routeName === 'Find') { title = '发现' } else
    if (routeName === 'Video') { title = '视频' } else
    if (routeName === 'Mine') { title = '我的' } else
    if (routeName === 'Friends') { title = '朋友' } else { title = '账号' }

    return {
      tabBarOnPress,
      tabBarIcon,
      title
    }
  },
  tabBarOptions: {
    style: {
      borderTopWidth: 0.2,
      borderColor: '#f9f9f9',
      borderTopColor: '#aaa',
      backgroundColor: '#f9f9f9',
      opacity: 1
    },
    labelStyle: {
      fontSize: 10
    },
    activeTintColor: '#d62804',
    inactiveTintColor: '#aaa'
  }
}

const STACKNAVIGATOR_DEFAULT_OPTIONS = {
  defaultNavigationOptions: ({ navigation }) => {
    const { routeName, params = {} } = navigation.state
    const appTheme = params?.theme ? params.theme : Stores.app.theme
    let options = {
      headerTitle: (
        null
      ),
      headerBackground: (
        (routeName === 'MainTabBar')
          ? <LinearGradient
            colors={appTheme.headerBg.slice()}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          /> : null
      ),
      drawerLockMode: 'locked-closed',
      headerStyle: {
        backgroundColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'transparent',
        shadowOpacity: 0,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        elevation: 0
      },
      headerTintColor: '#333',
      headerTitleStyle: { fontSize: 17, fontWeight: '600' },
      headerBackTitle: null,
      headerRight: <View style={{ top: 1, width: 54, paddingLeft: 15, justifyContent: 'center', alignItems: 'flex-start' }} />
    }
    if (!('index' in navigation.state)) {
      options = { ...options, headerLeft: _HEADER_BACK_BUTTON(navigation) }
    }
    return options
  }
}

const MainTabBar = createBottomTabNavigator({
  Find: Views.Find,
  Video: Views.Video,
  Mine: Views.Mine,
  Friends: Views.Friends,
  Account: Views.Account
}, {
  ...TAB_BAR_DEFAULT_OPTIONS,
  initialRouteName: 'Mine'
})

/* 将Header设置到Tabbar */
MainTabBar.navigationOptions = ({ navigation }) => {
  const { state = {} } = navigation
  const { index = 0 } = state
  return {
    headerTitle: <View style={{ flex: 1, alignItems: 'center' }}><Text>345</Text></View>,
    headerStyle: {
      backgroundColor: '#ce3232',
      shadowOffset: { width: 0, height: 0 },
      shadowColor: 'transparent',
      shadowOpacity: 0,
      borderBottomWidth: 0,
      borderBottomColor: 'transparent',
      elevation: 0
    },
    headerTintColor: '#fff',
    headerTitleStyle: { fontSize: 17, fontWeight: '600' },
    headerLeft: (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ top: 1,
          width: 54,
          paddingRight: 18,
          justifyContent: 'center',
          alignItems: 'flex-end'
        }}
        onPress={() => {}
        }
      >
        {index === 4 ? null : <SvgIcon path={index === 0 ? iconPath.identify : iconPath.cloud} size={24} fill={['#fff']} />}
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ top: 1,
          width: 54,
          paddingRight: 18,
          justifyContent: 'center',
          alignItems: 'flex-end'
        }}
        onPress={() => {}
        }
      >
        <SvgIcon path={iconPath.voice} size={24} fill={['#fff']} />
      </TouchableOpacity>

    )
  }
}

const ExtraViews = { ...Views, MainTabBar }
delete ExtraViews.Find
delete ExtraViews.Video
delete ExtraViews.Mine
delete ExtraViews.Friends
delete ExtraViews.Account
const AppNavigator = createStackNavigator({ ...ExtraViews }, { ...STACKNAVIGATOR_DEFAULT_OPTIONS, initialRouteName: 'MainTabBar' })

const IncludeModalContainerNavigator = createStackNavigator({
  Base: { screen: AppNavigator }
  /* add modal screen */
}, { ...MODAL_DEFAULT_OPTIONS })

const Base = createSwitchNavigator({
  Load: ExtraViews.Loading,
  App: IncludeModalContainerNavigator,
  Auth: ExtraViews.Login
}, { initialRouteName: 'Load' })

const AppContainer = createAppContainer(Base)

export default AppContainer
