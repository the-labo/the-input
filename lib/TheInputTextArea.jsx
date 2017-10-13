'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { htmlAttributesFor, eventHandlersFor } from 'the-component-util'
import { renderErrorMessage } from './helpers'

/**
 * TextArea Input
 */
class TheInputTextArea extends React.PureComponent {
  constructor (props) {
    super(props)
    const s = this
    s.state = {}
  }

  render () {
    const s = this
    const {props} = s
    let {
      id,
      className,
      children,
      rows,
      name,
      required,
      value,
      error,
      placeholder,
      onChange,
      onFocus,
      onBlur,
      onKeyUp,
      onKeyDown,
      onKeyPress
    } = props
    return (
      <div {...htmlAttributesFor(props, {
        except: [
          'id', 'className', 'rows', 'value', 'name', 'required', 'placeholder'
        ]
      })}
           {...eventHandlersFor(props, {
             except: [
               'onChange', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown', 'onKeyPress'
             ]
           })}
           className={c('the-input-textarea', className, {
             'the-input-error': !!error
           })}
           data-value={value}
      >
        {renderErrorMessage(error)}

        <textarea className='the-input-textarea-input'
                  {...{id, rows, name, required, value, placeholder}}
                  {...{onChange, onFocus, onBlur, onKeyUp, onKeyDown, onKeyPress}}
                  onChange={(e) => s.handleChange(e)}

        />
        {children}
      </div>
    )
  }

  componentWillUnmount () {
  }

  handleChange (e) {
    const s = this
    let {parser, onChange, onUpdate} = s.props
    let {name, value} = e.target
    onChange && onChange(e)
    onUpdate && onUpdate({[name]: parser(value)})
  }
}

TheInputTextArea.propTypes = {
  /** TextArea rows */
  rows: PropTypes.number,
  /** Name of input */
  name: PropTypes.string.isRequired,
  /** Value of input */
  value: PropTypes.string,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Value parser */
  parser: PropTypes.func
}

TheInputTextArea.defaultProps = {
  rows: 5,
  value: '',
  error: null,
  parser: String
}

TheInputTextArea.displayName = 'TheInputTextArea'

export default TheInputTextArea
