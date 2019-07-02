import authManager from '../authManager.js'

export default async function KarmaController($scope) {
  $scope.me = await authManager.fetchMe()
  $scope.$apply()

  $scope.login = function login() {
    authManager.login()
  }
}
