import React from 'react'
import { View, Text } from 'react-native'
import { SvgIcon, iconPath } from '../../components/svgIcon'

export default class AccountScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const tabBarIcon = ({ focused, tintColor }) => {
      return <View style={{ flexDirection: 'row', paddingTop: 4, paddingRight: 4 }}>
        <SvgIcon path={iconPath.account} size={22} fill={focused ? ['#d62804'] : ['#666']} />
        <View style={{ backgroundColor: 'red', width: 14, height: 14, position: 'absolute', top: 0, right: 0, justifyContent: 'center', alignItems: 'center', borderRadius: 7 }}>
          <Text style={{ color: '#fff', fontSize: 12 }}>7</Text>
        </View>
      </View>
    }
    return {
      tabBarIcon
    }
  }

  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Account!</Text>
      </View>
    )
  }
}
