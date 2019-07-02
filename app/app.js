import DomainController from './controllers/Domain.js'
import ContentController from './controllers/Content.js'
import SurveysController from './controllers/Surveys.js'
import KarmaController from './controllers/Karma.js'
import authManager from './authManager.js'

const app = angular.module('app', ['ngSanitize', 'ng-showdown'])

app.controller('DomainController', DomainController)
app.controller('ContentController', ContentController)
app.controller('SurveysController', SurveysController)
app.controller('KarmaController', KarmaController)
