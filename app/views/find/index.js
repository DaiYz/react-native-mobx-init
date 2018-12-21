import React from 'react'
import { View, Text, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { inject, observer } from 'mobx-react'

@inject('account')
@observer
export default class FindScreen extends React.Component {
  render () {
    console.log(this.props)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>find</Text>
        <TouchableOpacity onPress={() => {
          this.props.account.add()
        }}>
          <Text>Test !!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
