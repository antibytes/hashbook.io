import sotez from 'sotez'

const generateIdentity = (keys) => {
  const { sk, pk, pkh } = keys
  let type
  const prefix = (pkh.slice(0, 2))
  if (prefix === 'tz') type = 'Manager'
  else if (prefix === 'KT') type = 'Smart Contract'
  let identity = {
    type,
    sk,
    pk,
    pkh,
    address: pkh,
  }
  return identity
}

export const unlockWallet = (type, payload) => {
  console.log('[Unlock Wallet Type]', type)
  let identity
  if (type === 'mnemonic') {
    const { mnemonic, password } = payload
    const keys = sotez.crypto.generateKeys(mnemonic, password)
    identity = generateIdentity(keys)
    return { success: true, identity }
  } if (type === 'ico') {
    const {
      seed, email, password, code,
    } = payload
    const keys = sotez.crypto.generateKeys(seed, email + password)
    if (code) {
      sotez.rpc.activate({ sk: keys.sk, pk: keys.pk, pkh: keys.pkh }, code).then(() => {
        return { success: true, identity }
      }).catch(() => {
        return { success: false, error: 'Activation Failed. Please check you input.' }
      })
    }
    return { success: true, identity }
  } if (type === 'privateKey') {
    const { privateKey } = payload
    const keys = sotez.crypto.extractKeys(privateKey)
    identity = generateIdentity(keys)
    return { success: true, identity }
  }
  return { success: false, error: 'Wallet Type Not Found' }
}
