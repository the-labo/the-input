'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TheInputStyle from './TheInputStyle'
import TheInputText from './TheInputText'
import { htmlAttributesFor, eventHandlersFor } from 'the-component-util'

/**
 * Input of the-components
 */
class TheInput extends React.PureComponent {
  render () {
    const s = this
    const { props } = s
    let {
      className,
      children
    } = props
    return (
      <div { ...htmlAttributesFor(props, { except: [ 'className' ] }) }
           { ...eventHandlersFor(props, { except: [] })}
           className={ classnames('the-input', className) }
      >
        { children }
      </div>
    )
  }
}

TheInput.Style = TheInputStyle
TheInput.Text = TheInputText

TheInput.propTypes = {}

TheInput.defaultProps = {}

TheInput.displayName = 'TheInput'

export default TheInput
