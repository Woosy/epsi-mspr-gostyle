import axios from 'axios'

const api = axios.create()

const ApiService = {
  init (baseURL) {
    api.defaults.baseURL = baseURL
    api.interceptors.response.use(response => {
      return response
    }, err => {
      // intercept connection errors
      if (!err.response) {
        const error = new Error('Connection failure')
        return Promise.reject(error)
      }

      return Promise.reject(err.response)
    })
  },

  get (resource) {
    return api.get(resource)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  post (resource, data) {
    return api.post(resource, data)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  put (resource, data) {
    return api.put(resource, data)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  patch (resource, data) {
    return api.patch(resource, data)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  delete (resource) {
    return api.delete(resource)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
  **/
  customRequest (data) {
    return api(data)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export default ApiService
