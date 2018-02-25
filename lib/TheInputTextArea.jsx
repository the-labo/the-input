'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from 'the-component-util'
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

  componentWillUnmount () {
  }

  handleChange (e) {
    const s = this
    let {onChange, onUpdate, parser} = s.props
    let {name, value} = e.target
    onChange && onChange(e)
    onUpdate && onUpdate({[name]: parser(value)})
  }

  render () {
    const s = this
    const {props} = s
    let {
      children,
      className,
      error,
      id,
      name,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      placeholder,
      required,
      rows,
      value,
    } = props
    return (
      <div {...htmlAttributesFor(props, {
        except: [
          'id', 'className', 'rows', 'value', 'name', 'required', 'placeholder'
        ],
      })}
           {...eventHandlersFor(props, {
             except: [
               'onChange', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown', 'onKeyPress'
             ],
           })}
           className={c('the-input-textarea', className, {
             'the-input-error': !!error,
           })}
           data-value={value}
      >
        {renderErrorMessage(error)}

        <textarea className='the-input-textarea-input'
                  {...{id, name, placeholder, required, rows}}
                  {...{onBlur, onChange, onFocus, onKeyDown, onKeyPress, onKeyUp}}
                  onChange={(e) => s.handleChange(e)}
                  value={value || ''}

        />
        {children}
      </div>
    )
  }
}

TheInputTextArea.propTypes = {
  /** TextArea rows */
  /** Name of input */
  name: PropTypes.string.isRequired,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Value parser */
  parser: PropTypes.func,
  rows: PropTypes.number,
  /** Value of input */
  value: PropTypes.string,
}

TheInputTextArea.defaultProps = {
  error: null,
  parser: String,
  rows: 5,
  value: '',
}

TheInputTextArea.displayName = 'TheInputTextArea'

export default TheInputTextArea
