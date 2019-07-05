import fetchIsValidDomain from '../utils/fetchIsValidDomain.js'
import web3 from '../web3.js'
import fetchAddressHexPrefixed from '../utils/fetchAddressHexPrefixed.js'
import delay from '../utils/delay.js'

const nullAddress = '0x0000000000000000000000000000000000000000'
let defaultDomainAscii = 'weth'

function setDefaultDomainAscii() {
  const hashParts = window.location.hash.split('/')
  if (hashParts[1] !== 'domains') {
    return
  }
  defaultDomainAscii = hashParts[2]
}

let lastDomainAscii

export default function DomainController($scope) {

  $scope.domain = ''

  setDefaultDomainAscii()

  $scope.$watch('domain', async (domainAscii) => {
    lastDomainAscii = domainAscii

    const domainAsciiSuffixed = `"${domainAscii}.imm"`

    if (!domainAscii) {
      $scope.domainResult = ''
      return
    }

    const domainHexPrefixed = web3.fromAscii(domainAscii)

    $scope.domainResult = `⏳ Fetching ${domainAsciiSuffixed} ...`

    await delay(500)

    const isValidDomain = await fetchIsValidDomain(domainHexPrefixed)

    if (domainAscii !== lastDomainAscii) {
      return
    }

    if (!isValidDomain) {
      $scope.domainResult = `❌ ${domainAsciiSuffixed} is an invalid domain (a-z; 0-9 only)`
      $scope.$apply()
      return
    }

    const addressHexPrefixed = await fetchAddressHexPrefixed(domainHexPrefixed)

    if (domainAscii !== lastDomainAscii) {
      return
    }

    if (addressHexPrefixed === nullAddress) {
      $scope.domainResult = `😲 ${domainAsciiSuffixed} available. Email request@imm.domains to request it.`
    } else {
      $scope.domainResult = `✔️ ${domainAsciiSuffixed} > ${addressHexPrefixed}`
    }
    $scope.$apply()
  })

  setTimeout(() => {
    defaultDomainAscii.split('').forEach((character, index) => {
      setTimeout(() => {
        $scope.domain = $scope.domain + character
        $scope.$apply()
      }, 200 * index)
    })
  }, 500)
}
