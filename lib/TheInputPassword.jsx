'use strict'

import React from 'react'
import c from 'classnames'
import TheInputText from './TheInputText'
import TheIcon from 'the-icon'
import { clone } from 'asobj'

class TheInputPassword extends React.PureComponent {
  constructor (props) {
    super(props)
    const s = this
    s.state = {
      showing: false
    }
  }

  render () {
    const s = this
    const { props, state } = s
    let { value } = props
    let { showing } = state
    let icon = showing ? TheInputPassword.HIDE_ICON : TheInputPassword.SHOW_ICON
    return (
      <TheInputText {...props}
                    className={c('the-input-password')}
                    type={showing ? 'text' : 'password'}
                    options={[]}
      >
        {
          value && (
            <a className={c('the-input-password-toggle')}
               tabIndex={-1}
               onMouseDown={() => s.toggleShowing(true)}
               onMouseUp={() => s.toggleShowing(false)}
               onMouseOut={() => s.toggleShowing(false)}
            >
              <TheIcon className={icon}/>
            </a>
          )
        }
      </TheInputText>
    )
  }

  toggleShowing (showing) {
    const s = this
    s.setState({ showing })
  }
}

TheInputPassword.SHOW_ICON = 'fa fa-eye'
TheInputPassword.HIDE_ICON = 'fa fa-eye-slash'

TheInputPassword.propTypes = clone(TheInputText.propTypes, { without: [ 'type', 'options' ] })
TheInputPassword.defaultProps = clone(TheInputText.defaultProps, { without: [ 'type', 'options' ] })
TheInputPassword.displayName = 'TheInputPassword'

export default TheInputPassword
