'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { htmlAttributesFor, eventHandlersFor } from 'the-component-util'

/**
 * Input of the-components
 */
class TheInputText extends React.PureComponent {
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
           className={ classnames('the-input-text', className) }
      >
        <input type="text" onChange={(e) => s.handleChange(e)}/>
        { children }
      </div>
    )
  }

  handleChange (e) {
    const s = this
    let { parser, onChange, onUpdate } = s.props
    let { name, value } = e.target
    onChange && onChange(e)
    onUpdate && onUpdate({ [name]: parser(value) })
  }
}

TheInputText.propTypes = {
  /** Text type */
  type: PropTypes.string,
  /** Name of input */
  name: PropTypes.string.isRequired,
  /** Value of input */
  value: PropTypes.any.isRequired,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Value parser */
  parser: PropTypes.func.parse,
  /** Options */
  options: PropTypes.object
}

TheInputText.defaultProps = {
  type: 'text',
  parser: String,
  options: {}
}

TheInputText.displayName = 'TheInputText'

export default TheInputText
