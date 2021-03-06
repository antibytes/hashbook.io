// let Transport = require('@ledgerhq/hw-transport-node-hid').default
import Transport from '@ledgerhq/hw-transport-u2f'
import eztz from 'utils/eztz'

let App = require('basil-tezos-ledger').default

const genAddress = async (publicKey) => {
  try {
    const pk = await eztz.utility.b58cencode(eztz.utility.hex2buf(publicKey.substr(2)), eztz.prefix.edpk)
    const pkh = await eztz.utility.b58cencode(
      eztz.library.sodium.crypto_generichash(
        20,
        eztz.utility.b58cdecode(pk, eztz.prefix.edpk)
      ),
      eztz.prefix.tz1
    )
    return { pk, pkh }
  } catch (e) {
    throw e
  }
}

export const getAddress = async (path) => {
  try {
    const transport = await Transport.create()
    const xtz = new App(transport)
    const { publicKey } = await xtz.getAddress(path, true)
    const { pk, pkh } = await genAddress(publicKey)
    return { pk, pkh }
  } catch (err) {
    throw err
  }
}

export const signOperation = async (path, opBytes) => {
  try {
    const transport = await Transport.create()
    const xtz = new App(transport)
    const result = await xtz.signOperation(path, opBytes)
    return result
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const getVersion = async () => {
  try {
    const transport = await Transport.create()
    const xtz = new App(transport)
    const versionInfo = await xtz.getVersion()
    return versionInfo
  } catch (err) {
    throw err
  }
}
