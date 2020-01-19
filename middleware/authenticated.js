export default function ({
  store,
  redirect
}) {
  // If the user is not authenticated
  if (!store.state.auth) {
    let auth = localStorage.getItem('auth')
    // console.log('auth: ', auth)
    if (auth && auth != 'undefined') {
      store.commit('setAuth', JSON.parse(auth))
      return redirect('/')
    }
    // else {
    //   return redirect('/login')
    // }
  }
}
