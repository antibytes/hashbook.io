import React from 'react'
import { Modal, Icon } from 'antd'
import {
  intlShape, injectIntl, defineMessages,
} from 'react-intl'
import PropTypes from 'prop-types'

const messages = defineMessages({
  title: {
    id: 'myAccount.signOnLedger',
    defaultMessage: 'Please sign Transaction on Ledger.',
  },
  cancel: {
    id: 'myAccount.cancel',
    defaultMessage: 'Cancel',
  },
})

const LedgerSignModal = ({ visible, onCancel, intl }) => {
  const { formatMessage } = intl
  return (
    <Modal
      title={(
        <span>
          <Icon
            type="check-circle-o"
            style={{ marginRight: '8px', color: 'green' }}
          />
          {formatMessage(messages.title)}
        </span>
)}
      visible={visible}
      wrapClassName="vertical-center-modal"
      footer={null}
      onCancel={onCancel}
    >
      <div>
        <pre
          style={{
            fontSize: '3px',
            margin: ' 0 auto',
            fontFamily: 'Courier New, Monospace',
          }}
        >
          {`
                                                                                                                                                                                      ██╗               ██████╗ ██╗   ██╗███████╗██╗  ██╗
                                                                                                                                                                                     ██╔╝               ██╔══██╗██║   ██║██╔════╝██║  ██║
                                █████╗█████╗█████╗                                                                                █████╗█████╗█████╗                                ██╔╝█████╗█████╗    ██████╔╝██║   ██║███████╗███████║
                                ╚════╝╚════╝╚════╝                                                                                ╚════╝╚════╝╚════╝                                ╚██╗╚════╝╚════╝    ██╔═══╝ ██║   ██║╚════██║██╔══██║
                                                                                                                                                                                     ╚██╗               ██║     ╚██████╔╝███████║██║  ██║
                                                                                                                                                                                      ╚═╝               ╚═╝      ╚═════╝ ╚══════╝╚═╝  ╚═╝

                                                                                                                                                                                                                     ██████╗ ███╗   ██╗  
                                                                                                                                                                                                                    ██╔═══██╗████╗  ██║  
            █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗                                            ██║   ██║██╔██╗ ██║  
            ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝                                            ██║   ██║██║╚██╗██║  
                                                                                                                                                                                                                    ╚██████╔╝██║ ╚████║  
                                                                                                                                                                                                                     ╚═════╝ ╚═╝  ╚═══╝  

            ██╗        ██╗  ██╗                             ██████╗ ██████╗ ███╗   ██╗███████╗██╗██████╗ ███╗   ███╗                            ██╗   ██╗            ██╗                ██╗     ███████╗██████╗  ██████╗ ███████╗██████╗ 
            ██║        ╚██╗██╔╝                            ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔══██╗████╗ ████║                            ╚██╗ ██╔╝            ██║                ██║     ██╔════╝██╔══██╗██╔════╝ ██╔════╝██╔══██╗
            ██║         ╚███╔╝                             ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██████╔╝██╔████╔██║                             ╚████╔╝             ██║                ██║     █████╗  ██║  ██║██║  ███╗█████╗  ██████╔╝
            ██║         ██╔██╗                             ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██╔══██╗██║╚██╔╝██║                              ╚██╔╝              ██║                ██║     ██╔══╝  ██║  ██║██║   ██║██╔══╝  ██╔══██╗
            ██║        ██╔╝ ██╗                            ╚██████╗╚██████╔╝██║ ╚████║██║     ██║██║  ██║██║ ╚═╝ ██║                               ██║               ██║                ███████╗███████╗██████╔╝╚██████╔╝███████╗██║  ██║
            ╚═╝        ╚═╝  ╚═╝                             ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝                               ╚═╝               ╚═╝                ╚══════╝╚══════╝╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝

            ██╗                        ████████╗██████╗  █████╗ ███╗   ██╗███████╗ █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗                                    ██╗                                                                 
            ██║                        ╚══██╔══╝██╔══██╗██╔══██╗████╗  ██║██╔════╝██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║                                    ██║                                                                 
            ██║                           ██║   ██████╔╝███████║██╔██╗ ██║███████╗███████║██║        ██║   ██║██║   ██║██╔██╗ ██║                                    ██║                                                                 
            ██║                           ██║   ██╔══██╗██╔══██║██║╚██╗██║╚════██║██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║                                    ██║                                                                 
            ██║                           ██║   ██║  ██║██║  ██║██║ ╚████║███████║██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║                                    ██║                                                                 
            ╚═╝                           ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝                                    ╚═╝                                                                 



            █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗                                                                 
            ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝                                                                 



            `}
        </pre>
      </div>
    </Modal>
  )
}

LedgerSignModal.propTypes = {
  visible: PropTypes.bool,
  intl: intlShape.isRequired,
  onCancel: PropTypes.func,
}


export default injectIntl(LedgerSignModal)
