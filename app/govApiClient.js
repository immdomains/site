class GovApiClient {
  constructor() {
    this.apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://imm-gov-api.herokuapp.com'
  }
  async fetch(endpoint, options) {
    const response = await fetch(`${this.apiUrl}${endpoint}`, options)
    return response.json()
  }
  async post(endpoint, body = {}, _options = {}) {
    const options = Object.assign({ method: 'POST', body: JSON.stringify(body) }, _options)

    if (!options.headers) {
      options.headers = {}
    }

    options.headers['Content-Type'] = 'application/json'

    return this.fetch(endpoint, options)
  }

  async fetchSurveys() {
    return this.fetch('/surveys/')
  }
}

export default new GovApiClient
