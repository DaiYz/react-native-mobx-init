import { observable, computed, action, autorun } from 'mobx'
import { persist } from 'mobx-persist'
import { NavigationActions } from 'react-navigation'
import utils from '../utils'

class find {
  @observable list: Array = []
  @observable firstLoad: boolean = true
  @observable loading: boolean = false
  @observable loadingMore:boolean = false
  @observable page: number = 1

  @action.bound async getList (more = false, limit = 10) {
    if (!more) {
      this.loading = true
    } else {
      this.loadingMore = true
    }
    try {
      const page = more ? this.page + 1 : 1
      const res = await (await fetch(`https://XXXXXXX&page=${page}&pagesize=10`)).json()
      this.list = more ? this.list.slice().concat(res) : res
      console.log(res)
      this.page = page
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
      this.loadingMore = false
      this.firstLoad = false
    }
  }
}

export default find
