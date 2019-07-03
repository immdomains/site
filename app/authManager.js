import govApiClient from './govApiClient.js'
import Me from './Me.js'

class AuthManager {
  constructor() {
    const hash = window.location.hash.split('/')
    if (hash[1] !== 'auth') {
      return
    }
    localStorage.setItem('user.id', hash[2])
    localStorage.setItem('user.secret', hash[3])
    window.location.hash = ''
  }

  getUserId() {
    return parseInt(localStorage.getItem('user.id'))
  }

  getUserSecret() {
    return parseInt(localStorage.getItem('user.secret'))
  }

  getHeaders() {
    return {
      'x-user-id': this.getUserId(),
      'x-user-secret': this.getUserSecret()
    }
  }

  async fetchMe() {
    const userId = this.getUserId()
    const userSecret = this.getUserSecret()

    if (!userId || !userSecret) {
      return null
    }

    const mePojo = await govApiClient.fetch('/me/', {
      headers: this.getHeaders()
    })

    if (mePojo === null) {
      return null
    }

    return new Me(mePojo, userSecret)
  }

  login() {
    const doSubscribe = confirm('You\'ll need to login with Reddit. Would you also like to subcribe to /r/immdomains?')
    window.location = `${govApiClient.apiUrl}/auth/?callbackUrl=${encodeURIComponent(window.location.origin)}&subscribe=${doSubscribe ? 'yes' : 'no'}`

  }
}

export default new AuthManager
