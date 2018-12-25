import React from 'react'
import { View, Text, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { inject, observer } from 'mobx-react'

@inject('account')
@observer
export default class FindScreen extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>find</Text>
        <TouchableOpacity style={{marginTop: 20}} onPress={() => {
          this.props.account.add()
        }}>
          <Text>add Badge !!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
