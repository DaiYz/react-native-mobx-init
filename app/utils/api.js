
import axios from 'axios'
import Stores from '../stores'

const SESSION_TIMEOUT = 10000

const instance = axios.create({ timeout: SESSION_TIMEOUT })
// REQUEST HANDLE
instance.interceptors.request.use((config) => {
  const authToken = Stores.account.authToken
  if (authToken) {
    config.headers.Authorization = authToken
  }

  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use((response) => {
  const { config } = response
  const { url, method, headers } = config

  const _response = response || { data: null }

  // }
  return _response.data || {}
}, (err) => {
  try {
    if (err.config) {
      const { url = '', method = '' } = err.config
      const { data = {}, status = 0 } = err.response
      console.log(`[SESSION][${method.toUpperCase()}][${url}][${status}][${data}]`, err.response)
    } else {
      console.log(err)
    }
  } catch (e) {
    console.log(err)
  }
  return Promise.reject(err)
})

const sessionMethodBuild = (baseUrl) => {
  return {
    Post: async (path: string, body = {}) => {
      return await instance.post(`${baseUrl}${path}`, body)
    },

    Get: async (path: string, body = {}, params = {}) => {
      return await instance.get(`${baseUrl}${path}`, Object.assign({}, body, { params }))
    },

    Put: async (path: string, body = {}) => {
      return await instance.put(`${baseUrl}${path}`, body)
    },

    Delete: async (path: string, body = {}) => {
      return await instance.delete(`${baseUrl}${path}`, body)
    },

    Upload: async (path: string, body = {}) => {
      return await instance.post(`${baseUrl}${path}`, body, { timeout: 120000 })
    }
  }
}

export default {
  User: sessionMethodBuild('http://172.0.0.1:5000/')
}
