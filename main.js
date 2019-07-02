//web3

const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/ddf5fd9bc2314199814e9398df57f486'))
const immDomains = web3.eth.contract([
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "addresses",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_domain",
        "type": "bytes"
      }
    ],
    "name": "isValidDomain",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }
]).at('0x53634f89c25b140a8c5813175257a8e3f0f4110b')

//domain

const $domainInput = document.getElementById('domain-input')
const $domainResult = document.getElementById('domain-result')
const nullAddress = '0x0000000000000000000000000000000000000000'

async function fetchIsValidDomain(domainHexPrefixed) {
  return new Promise((resolve, reject) => {
    immDomains.isValidDomain(domainHexPrefixed, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

async function fetchAddressHexPrefixed(domainHexPrefixed) {
  return new Promise((resolve, reject) => {
    immDomains.addresses(domainHexPrefixed, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

async function onDomainInputChange() {
  const domainAscii = $domainInput.value
  const domainHexPrefixed = web3.fromAscii(domainAscii)

  $domainResult.innerText = '⏳ Fetching...'

  const isValidDomain = await fetchIsValidDomain(domainHexPrefixed)

  if ($domainInput.value === domainAscii && !isValidDomain) {
    $domainResult.innerText = '❌ Invalid domain (a-z; 0-9 only)'
    return
  }

  const addressHexPrefixed = await fetchAddressHexPrefixed(domainHexPrefixed)

  if ($domainInput.value === domainAscii) {
    if (addressHexPrefixed === nullAddress) {
      $domainResult.innerText = '😲 Domain available. Email request@imm.domains to request it.'
    } else {
      $domainResult.innerText = '✔️ ' + addressHexPrefixed
    }
  }

}

$domainInput.addEventListener('input', onDomainInputChange)

// default

const defaultDomain = 'weth'

defaultDomain.split('').forEach((character, index) => {
  setTimeout(() => {
    $domainInput.value = $domainInput.value + character
    onDomainInputChange()
  }, index * 50)
})


// info

const $infoLinks = Array.from(document.getElementsByClassName('info-link'))
let selectedContentId

function get$infoContent(contentId) {
  return document.querySelectorAll('.info-content[info-content-id="' + contentId + '"]')[0]
}

function get$infoLink(contentId) {
  return document.querySelectorAll('.info-link[info-content-id="' + contentId + '"]')[0]
}
function get$infoLinkAsterisk(contentId) {
  return document.querySelectorAll('.info-link[info-content-id="' + contentId + '"]')[0]
}
function selectInfo(contentId) {
  if (selectedContentId) {
    get$infoLink(selectedContentId).classList.remove('selected')
    get$infoContent(selectedContentId).style.display = 'none'
  }
  selectedContentId = contentId
  get$infoLink(selectedContentId).classList.add('selected')
  get$infoContent(contentId).style.display = 'block'
}

selectInfo('governance')

$infoLinks.forEach(($infoLink) => {
  const contentId = $infoLink.attributes['info-content-id'].value
  $infoLink.onclick = () => {
    selectInfo(contentId)
  }
})
