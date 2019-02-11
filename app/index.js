import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import Stores from './stores'
import { observer, Provider, inject } from 'mobx-react'
import { create } from 'mobx-persist'
import Navigator from './navigator.config'
import utils from './utils'

const hydrate = create({ storage: AsyncStorage })

// 在正式环境中清空console.log()
if (!__DEV__) {
  global.console = {
    info: () => {
    },
    log: () => {
    },
    warn: () => {
    },
    error: () => {
    }
  }
}

@inject('app', 'account')
@observer
class HomeScreen extends Component {
  async componentDidMount () {
    const { app, account } = this.props
    await hydrate('authToken', account)
    await hydrate('appTheme', app)
    app.init(account.authToken, app.appTheme)
  }

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
