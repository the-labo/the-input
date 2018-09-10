'use strict'

import { clone } from 'asobj'
import c from 'classnames'
import React from 'react'
import { TheIcon } from 'the-icon'
import TheInputText from './TheInputText'

class TheInputNumber extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showing: false,
    }
  }

  render () {
    const {props, state} = this
    const {value} = props
    const {showing} = state
    const icon = showing ? TheInputNumber.HIDE_ICON : TheInputNumber.SHOW_ICON
    return (
      <TheInputText {...props}
                    className={c('the-input-password')}
                    options={[]}
                    type={showing ? 'text' : 'password'}
      >
        {
          value && (
            <a className={c('the-input-password-toggle')}
               href='javascript:void(0)'
               onClick={() => this.toggleShowing(!this.state.showing)}
               tabIndex={-1}
            >
              <TheIcon className={icon}/>
            </a>
          )
        }
      </TheInputText>
    )
  }

  toggleShowing (showing) {
    this.setState({showing})
  }
}

TheInputNumber.SHOW_ICON = 'fa fa-eye'
TheInputNumber.HIDE_ICON = 'fa fa-eye-slash'

TheInputNumber.propTypes = clone(TheInputText.propTypes, {without: ['type', 'options']})
TheInputNumber.defaultProps = Object.assign({},
  clone(TheInputText.defaultProps, {without: ['type', 'options']}),
  {
    autoCapitalize: false,
    autoCorrect: false,
    spellCheck: false,
  }
)
TheInputNumber.displayName = 'TheInputNumber'

export default TheInputNumber
