import govApiClient from '../govApiClient.js'
import authManager from '../authManager.js'

export default async function SurveysController($scope) {

  async function refresh() {
    $scope.isUpdating = true
    $scope.me = await authManager.fetchMe()
    $scope.surveys = await govApiClient.fetchSurveys()

    if ($scope.me) {
      $scope.surveys.forEach((survey) => {
        const meVote = $scope.me.pojo.surveyVotes.find((surveyVote) => {
          return surveyVote.surveyId === survey.id
        })
        if (!meVote) {
          survey.meAnswerId = null
        } else {
          survey.meAnswerId = meVote.answerId
        }
      })
    }

    $scope.isUpdating = false
    $scope.$apply()
  }

  refresh()

  $scope.vote = async function setVote(surveyId, answerId) {
    $scope.isUpdating = true
    const me = await authManager.fetchMe()
    if (!me) {
      return authManager.login()
    }
    await me.setVote(surveyId, answerId)

    await refresh()
  }
}
