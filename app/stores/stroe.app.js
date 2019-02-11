import { observable, computed, action, autorun } from 'mobx'
import { persist } from 'mobx-persist'
import { zh_cn, en_us } from '../localize/strings'
import { yellow, blue } from '../localize/theme'
import { NavigationActions } from 'react-navigation'
import utils from '../utils'

class app {
  @persist @observable appTheme = 'blue'
  @observable theme = blue
  @observable currentTheme = '蓝色主题'

  @action.bound changeTheme (type: String) {
    switch (type) {
      case 'yellow':
        this.theme = yellow
        this.currentTheme = '黄色主题'
        break
      case 'blue':
        this.theme = blue
        this.currentTheme = '蓝色主题'
        break
    }
    this.appTheme = type
    utils.global.navigator.dispatch(NavigationActions.setParams({
      params: { theme: this.theme },
      key: 'Account'
    }))
  }

  @action.bound init (token, theme) {
    let targetRout = 'Auth'
    console.log(token)
    if (token.length > 0) {
      targetRout = 'App'
    }
    this.changeTheme(theme)
    utils.global.navigator.dispatch(NavigationActions.navigate({
      routeName: targetRout
    }))
  }
}

export default app
