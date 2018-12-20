import React from 'react'
import { View, Text } from 'react-native'
import Splash from 'react-native-splash-screen'

export default class LoginScreen extends React.Component {
  componentDidMount () {
    setTimeout(() => Splash.hide(), 100)
  }
  render () {
    console.log(this.props)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>请登录!</Text>
      </View>
    )
  }
}
