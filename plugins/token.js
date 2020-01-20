export default ({ $axios, store }) => {
  if (process.server) {
    return
  }

  $axios.interceptors.request.use(request => {
    let user
    let auth = localStorage.getItem('auth')
    if (auth && auth != 'undefined') {
      user = JSON.parse(auth)
    }
    if (user) {
      const token = user.access

      if (token) {
        request.headers.common['Authorization'] = `Bearer ${token}`
      }
    }
    return request
  })
}
