import immDomains from '../immDomains.js'

export default async function fetchAddressHexPrefixed(domainHexPrefixed) {
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
