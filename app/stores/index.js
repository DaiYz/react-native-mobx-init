import Account from './store.account'
import App from './stroe.app'
import Find from './store.find'
const StoreMaps = {
  account: new Account(),
  app: new App(),
  find: new Find()
}

export default StoreMaps
