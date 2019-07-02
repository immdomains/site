import govApiClient from './govApiClient.js'
import authManager from './authManager.js'

export default class Me {
  constructor(pojo, secret) {
    this.pojo = pojo
    this.secret = secret
  }
  async setVote(surveyId, answerId) {
    return this.post(`/me/vote/`, { surveyId, answerId })
  }
  async post(endpoint, body = {}) {
    return govApiClient.post(endpoint, body, {
      headers: authManager.getHeaders()
    })
  }
  getKarma() {
    return this.pojo.surveyVotes.length
  }
}
