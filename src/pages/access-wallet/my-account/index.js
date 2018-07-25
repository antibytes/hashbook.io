import React from 'react'
import { Page } from 'components'
import PropTypes from 'prop-types'
import {
  intlShape, FormattedMessage, injectIntl, defineMessages,
} from 'react-intl'
import router from 'umi/router'
import {
  Row, Col, Tooltip, Icon, Modal,
} from 'antd'
import { connect } from 'dva'
import ReactTimeout from 'react-timeout'

import {
  AccountOperationPanel, AccountCollapse, SendOperationModal, SendConfirmModal,
} from './components'
import styles from './index.less'

const messages = defineMessages({
  toolTip: {
    id: 'myAccount.originateAccountToolTip',
    defaultMessage: 'You need to create an delegable which address starts with "KT" to delegate your baking right to a delegation service',
  },
  originationModalTitle: {
    id: 'myAccount.originateModalTitle',
    defaultMessage: 'Create an delegable account (Origination Account)',
  },
  originationModalContent: {
    id: 'myAccount.originateModalContent',
    defaultMessage: 'This operation need to spend ~0.25ꜩ. If you need to access delegation option and delegate your tokens, this step is necessary.',
  },
})

class myAccountIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = ({
      sendConfirmModalVisible: false,
      sendConfirmModalContent: {},
    })
  }

  componentWillMount () {
    const { myAccount } = this.props
    const { accountLoaded } = myAccount
    if (!accountLoaded) {
      router.push('/access-wallet')
    }
  }

  componentDidMount () {
    this.initAccount()
  }

  componentWillUnmount () {
    const { dispatch } = this.props
    dispatch({
      type: 'myAccount/logout',
    })
  }

  initAccount = () => {
    const { dispatch, setInterval } = this.props
    dispatch({
      type: 'myAccount/loadKTAccounts',
    })
    setInterval(this.refreshAccounts, 60000)
  }

  refreshAccounts = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'myAccount/refreshAccounts',
    })
  }

  refreshAccounts = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'myAccount/refreshAccounts',
    })
  }

  confirmOriginateAcountModal = () => {
    const { dispatch, intl } = this.props
    const { formatMessage } = intl
    Modal.confirm({
      title: formatMessage(messages.originationModalTitle),
      content: formatMessage(messages.originationModalContent),
      onOk () {
        dispatch({
          type: 'myAccount/originateAccount',
        })
      },
    })
  }

  closeOriginateAccountModal = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'myAccount/closeOriginateAccountModal',
    })
  }

  closeSendOperationModal = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'myAccount/closeSendOperationModal',
    })
  }

  openSendConfirmModal = (payload) => {
    this.setState({
      sendConfirmModalContent: payload,
      sendConfirmModalVisible: true,
    })
  }

  closeSendConfirmModal =() => {
    this.setState({
      sendConfirmModalVisible: false,
      sendConfirmModalContent: {},
    })
  }

  logout = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'myAccount/logout',
    })
    router.push('/access-wallet')
  }

  onAccountChange = (activeAccountIndex) => {
    const { dispatch } = this.props
    dispatch({
      type: 'myAccount/changeActiveAccount',
      payload: { activeAccountIndex },
    })
  }

  onSendClick = (payload) => {
    this.setState({
      sendConfirmModalVisible: false,
      sendConfirmModalContent: {},
    })
    const { dispatch } = this.props
    dispatch({
      type: 'myAccount/sendToken',
      payload,
    })
  }

  onSetDelegateClick = ({ delegation }) => {
    console.log(delegation)
  }

  render () {
    const { myAccount, loading, intl } = this.props
    const { sendConfirmModalContent, sendConfirmModalVisible } = this.state
    const {
      accounts, activeAccountIndex, showNewAccountModal, sendOperationModalVisible, lastOpHash, sending,
    } = myAccount
    const { formatMessage } = intl
    return (
      <Page loading={loading.global} className={styles.container}>
        <h1>
          <FormattedMessage id="myAccount.title" defaultMessage="Send Token & Delegation" />
        </h1>
        <Row gutter={32} style={styles.container}>
          <Col md={15}>
            <AccountOperationPanel
              curAccount={accounts[activeAccountIndex]}
              onSendClick={this.openSendConfirmModal}
              onSetDelegateClick={this.onSetDelegateClick}
              sending={sending}
            />
          </Col>
          <Col md={9}>
            <AccountCollapse
              accounts={accounts}
              onAccountChange={this.onAccountChange}
              activeAccountIndex={activeAccountIndex}
              showNewAccountModal={showNewAccountModal}
            />
            <Row type="flex" align="space-between" className={styles.buttonGroup}>
              <div>
                <a onClick={() => { this.confirmOriginateAcountModal() }}>
                  <FormattedMessage id="myAccount.originateAccount" defaultMessage="+ New Delegable Account" />
                </a>
                <Tooltip placement="topLeft" title={formatMessage(messages.toolTip)} className={styles.toolTip}>
                  <Icon type="question-circle-o" />
                </Tooltip>
              </div>

              <a onClick={() => { this.logout() }}>
                <FormattedMessage id="myAccount.logout" defaultMessage="Log out" />
              </a>
            </Row>
          </Col>
        </Row>

        <SendOperationModal visible={sendOperationModalVisible} opHash={lastOpHash} onClose={this.closeSendOperationModal} />
        <SendConfirmModal visible={sendConfirmModalVisible} operation={sendConfirmModalContent} onOk={this.onSendClick} onClose={this.closeSendConfirmModal} />
      </Page>
    )
  }
}


myAccountIndex.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  myAccount: PropTypes.object,
  intl: intlShape.isRequired,
  setInterval: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    myAccount: state.myAccount,
    loading: state.loading,
  }
}

export default connect(mapStateToProps)(ReactTimeout(injectIntl(myAccountIndex)))
