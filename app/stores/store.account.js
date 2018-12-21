import { observable, computed, action, autorun } from 'mobx'
import { NavigationActions } from 'react-navigation'
import utils from '../utils'
import { DeviceEventEmitter } from 'react-native'

class account {
  @observable bage: number = 6

  @action.bound add () {
    let newBage = this.bage
    newBage++
    this.bage = newBage
    DeviceEventEmitter.emit('HEADERBAGE')
  }
}

export default account
