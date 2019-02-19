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
      const res = await (await fetch(`https://tcwm.zzsyongfen.top/app/index.php?i=2&t=0&v=1.20&from=wxapp&c=entry&a=wxapp&do=StoreList&m=zh_cjdianc&sign=e763c3663302efd71f6ae7cbc231d7ea&nopsf=2&nostart=2&yhhd=&lat=23.122103&lng=113.367485&page=${page}&pagesize=10`)).json()
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
