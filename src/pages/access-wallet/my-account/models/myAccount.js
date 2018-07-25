import { unionBy, isArray } from 'lodash'
import { message } from 'antd'
import {
  loadAccountInfo, loadKTAccounts, sendToken, originateAccount,
} from '../services/account'

export default {
  namespace: 'myAccount',
  state: {
    accountLoaded: false,
    accounts: [],
    keys: {},
    activeAccountIndex: '',
    sendOperationModalVisible: false,
    lastOpHash: '',
    sending: false,

    originating: false,
  },
  effects: {
    * refreshAccounts (action, {
      all, call, put, select,
    }) {
      try {
        let promises = []
        const { accounts } = yield select(state => state.myAccount)
        accounts.forEach((account) => {
          const { address } = account
          promises.push(call(loadAccountInfo, address))
        })
        const accountsInfo = yield all(promises)
        for (let i = 0; i < accountsInfo.length; i++) {
          const { balance } = accountsInfo[i]
          yield put({
            type: 'updateAccountBalance',
            payload: { activeAccountIndex: i, balance },
          })
        }
      } catch (e) {
        console.log(e)
        throw new Error('Update Account Balance Error')
      }
    },

    * loadKTAccounts (action, { call, put, select }) {
      try {
        const { keys } = yield select(state => state.myAccount)
        const originationAcconts = yield call(loadKTAccounts, keys.pkh)
        yield put({
          type: 'importOriginationAccounts',
          payload: { accounts: originationAcconts },
        })
        yield put({ type: 'refreshAccounts' })
      } catch (e) {
        throw new Error('Load KT Acccount Failed, Check your internet connection.')
      }
    },
    * sendToken ({ payload }, { call, put, select }) {
      yield put({ type: 'sending' })
      const {
        toAddress, amountToSend, gas, gasLimit, data,
      } = payload
      try {
        const { accounts, keys, activeAccountIndex } = yield select(state => state.myAccount)
        const curAccount = accounts[activeAccountIndex]
        const { address } = curAccount
        // console.log('/ myAddress: ', address, '/ myKeys: ', keys, '/ toAddress:', toAddress, '/ amountToSend: ', amountToSend, '/ gas', gas)
        const response = yield call(sendToken, toAddress, address, keys, amountToSend, gas, gasLimit, data)
        yield put({ type: 'sendSuccess', payload: response })
        message.success('Send Operation Success!')
      } catch (error) {
        console.log(error)
        const { errors } = error
        yield put({ type: 'sendFailed' })
        let errorMessage = errors[0].id
        if (errorMessage === 'proto.alpha.gas_exhausted.operation') {
          errorMessage = 'Gas quota exceeded for the operation'
        }
        throw new Error(`Operation Failed! ${errorMessage}`)
      }
    },
    * originateAccount (action, { put, select, call }) {
      yield put({ type: 'originating' })
      try {
        const { accounts, activeAccountIndex } = yield select(state => state.myAccount)
        const curAccount = accounts[activeAccountIndex]
        const { keys } = curAccount
        const result = yield call(originateAccount, keys)
        // const result = { hash: 'hihihi', address: 'KT1111111111', operations: [] }
        yield put({ type: 'originateAccountSuccess', payload: result })
        message.success('Operation Success!')
      } catch (error) {
        const { errors } = error
        let errorMessage = errors[0].id
        console.log(errorMessage)
        if (errorMessage === 'proto.alpha.contract.balance_too_low') {
          errorMessage = 'Balance too low. 0.257xtz is needed to generate an delegatable account.'
        }
        throw new Error(`Operation Failed! ${errorMessage}`)
      }
    },

  },
  reducers: {
    setIdentity (draft, { payload: identity }) {
      const { keys } = identity
      draft.accountLoaded = true
      draft.accounts = [identity]
      draft.activeAccountIndex = '0'
      draft.keys = keys
    },
    updateAccountBalance (draft, { payload }) {
      const { activeAccountIndex, balance } = payload
      draft.accounts[activeAccountIndex].balance = balance
    },
    importOriginationAccounts (draft, { payload }) {
      const { accounts } = payload
      let accArray = accounts
      if (!isArray(accounts)) {
        accArray = [accounts]
      }
      draft.accounts = unionBy(draft.accounts, accArray, 'address')
    },
    changeActiveAccount (draft, { payload }) {
      const { activeAccountIndex } = payload
      draft.activeAccountIndex = activeAccountIndex
    },
    sending (draft) {
      draft.sending = true
    },
    sendSuccess (draft, { payload }) {
      const { hash } = payload
      draft.lastOpHash = hash
      draft.sendOperationModalVisible = true
      draft.sending = false
    },
    sendFailed (draft) {
      draft.sending = false
    },
    closeSendOperationModal (draft) {
      draft.sendOperationModalVisible = false
    },
    originating (draft) {
      draft.originating = true
    },
    originateAccountSuccess (draft, { payload }) {
      const { hash, address } = payload
      draft.lastOpHash = hash
      draft.sendOperationModalVisible = true
      draft.accounts.push({ type: 'KT', kind: 'origination', address })
    },
    originateAccountFailed (draft) {
      draft.originating = false
    },
    logout (draft) {
      draft.accountLoaded = false
      draft.accounts = []
      draft.activeAccountAddress = ''
    },
  },
}
