import web3 from './web3.js'

export default web3.eth.contract([
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
]).at('0xeb5d45f2c9e15cbd4885f98a4fb59623077a1dc4')
