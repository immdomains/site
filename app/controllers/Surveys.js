import govApiClient from '../govApiClient.js'
import authManager from '../authManager.js'

export default async function SurveysController($scope) {

  let highlightedSurveyId

  async function setHighlightedSurvey() {
    const hashParts = window.location.hash.split('/')
    if (hashParts[1] !== 'polls') {
      return
    }
    const surveyId = parseInt(hashParts[2])
    if (!surveyId) {
      return
    }

    highlightedSurveyId = surveyId
  }

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

    if (highlightedSurveyId) {
      const highlightedSurvey = $scope.surveys.find((survey) => {
        return survey.id === highlightedSurveyId
      })
      if (highlightedSurvey) {
        highlightedSurvey.isHighlighted = true
        setTimeout(() => {
          const $highlightedSurvey = document.querySelectorAll(`[survey-id="${highlightedSurveyId}"]`)[0]
          $highlightedSurvey.scrollIntoView()
        })

      } else {
        highlightedSurvey.isHighlighted = false
      }
    }


    $scope.isUpdating = false
    $scope.$apply()
  }

  $scope.vote = async function setVote(surveyId, answerId) {
    $scope.isUpdating = true
    const me = await authManager.fetchMe()
    if (!me) {
      return authManager.login()
    }
    await me.setVote(surveyId, answerId)

    await refresh()
  }

  setHighlightedSurvey()
  refresh()

}
