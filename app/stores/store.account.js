import { observable, computed, action, autorun } from 'mobx'
import { persist } from 'mobx-persist'
import { NavigationActions } from 'react-navigation'
import utils from '../utils'

class account {
  @observable badge: number = 6

  @persist @observable authToken: String = ''

  @action.bound add () {
    let newBadge = this.badge
    newBadge++
    this.badge = newBadge
    utils.global.navigator.dispatch(NavigationActions.setParams({
      params: { badge: newBadge },
      key: 'Account'
    }))
  }

  @action.bound login () {
    this.authToken = 'xnjidijfeiw67879fasfa'
    utils.global.navigator.dispatch(NavigationActions.navigate(
      {
        routeName: 'App'
      }
    ))
  }

  @action.bound logout () {
    this.authToken = ''
    utils.global.navigator.dispatch(NavigationActions.navigate(
      {
        routeName: 'Auth'
      }
    ))
  }
}

export default account
