import React from 'react'
import { View, Text, DeviceEventEmitter } from 'react-native'
import utils from '../../utils'
import Stores from '../../stores'
export default class AccountScreen extends React.Component {

  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Account!</Text>
      </View>
    )
  }
}
