import immDomains from '../immDomains.js'

export default async function fetchIsValidDomain(domainHexPrefixed) {
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
