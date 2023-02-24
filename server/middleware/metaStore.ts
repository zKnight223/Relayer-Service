import { TX } from "../types"
import BN from "bignumber.js"

var store: Array<object> = []

export default function(time: number, fee: BN) {
  const add = (_tx: TX) => {
    store.push(_tx)
  }

  const remove = (_tx: TX) => {
    if (store.findIndex(tx => JSON.stringify(_tx) == JSON.stringify(tx)) === -1) return false
    store = store.filter(tx => JSON.stringify(_tx) !== JSON.stringify(tx))
    return true
  }

  const fetch = () => {
    return store
  }

  const execute = () => {}

  const timer = setInterval(execute, time)

  return { add, remove, fetch }
}
