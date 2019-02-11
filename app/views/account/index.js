import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'

@inject('account', 'app')
@observer
export default class AccountScreen extends React.Component {

  change = () =>{
    const {app} = this.props
    const {currentTheme, changeTheme} = app
    let theme = currentTheme === '蓝色主题' ? 'yellow' : 'blue'
    changeTheme(theme)
  }

  render () {
    const {app, account} = this.props
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Account!</Text>
        <TouchableOpacity onPress={() => account.add()} style={{marginTop: 20, width:100, height: 41, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3cd7d9', borderRadius: 12}}>
          <Text>角标</Text>
        </TouchableOpacity>
        <Text style={{marginTop: 20}}>{`当前主题色：${app.currentTheme}`}</Text>
        <TouchableOpacity onPress={this.change} style={{marginTop: 20, width:100, height: 41, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3cd7d9', borderRadius: 12}}>
          <Text>切换主题</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.account.logout()} style={{marginTop: 40, width:100, height: 41, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3cd7d9', borderRadius: 12}}>
          <Text>退出登录</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
