import React, { Component } from 'react'
import { View, Text, DeviceEventEmitter } from 'react-native'
import Stores from './stores'
import { observer, Provider, inject } from 'mobx-react'
import Splash from 'react-native-splash-screen'
import Navigator from './navigator.config'
import utils from './utils'
import { createAppContainer, createStackNavigator, NavigationActions } from 'react-navigation'

class HomeScreen extends Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
        <Navigator ref={e => utils.global.navigator = e} />
      </View>
    )
  }
}

export default class App extends Component<{}> {
  render () {
    return (
      <Provider {...Stores}>
        <View style={{ flex: 1 }}>
          <HomeScreen />
        </View>
      </Provider>
    )
  }
}
