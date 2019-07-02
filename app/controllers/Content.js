export default function ContentController($scope) {
  $scope.pages = [
    {
      name: 'governance',
      title: 'Governance'
    }, {
      name: 'karma',
      title: 'ImmKarma'
    }, {
      name: 'solidity',
      title: 'Solidity'
    }, {
      name: 'abi',
      title: 'ABI'
    }, {
      name: 'web3',
      title: 'Web3.js Integration'
    }
  ]

  $scope.pageName = 'governance'

  $scope.$watch('pageName', (pageName) => {
    $scope.pageUrl = `/pages/${pageName}.html`
  })

  $scope.setPageName = function setPageName(pageName) {
    $scope.pageName = pageName
  }
}
