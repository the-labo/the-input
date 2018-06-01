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
    this.state = {}
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentWillUnmount () {
  }

  handleChange (e) {
    const {onChange, onUpdate, parser} = this.props
    const {name, value} = e.target
    onChange && onChange(e)
    onUpdate && onUpdate({[name]: parser(value)})
  }

  handleKeyDown (e) {
    const {
      onCombineEnter,
      onEnter,
      onKeyDown,
    } = this.props
    switch (e.keyCode) {
      case 13: { // Enter
        const isCombine = e.metaKey || e.shiftKey || e.altKey || e.ctrlKey
        if (isCombine) {
          onCombineEnter && onCombineEnter()
        } else {
          onEnter && onEnter()
        }
        break
      }
      default:
        break
    }
    onKeyDown && onKeyDown(e)
  }

  render () {
    const {props} = this
    let {
      autoFocus,
      children,
      className,
      error,
      id,
      name,
      onBlur,
      onChange,
      onFocus,
      onKeyPress,
      onKeyUp,
      placeholder,
      required,
      role,
      rows,
      spellCheck,
      value,
    } = props
    return (
      <div {...htmlAttributesFor(props, {
        except: [
          'id', 'className', 'rows', 'value', 'name', 'required', 'placeholder', 'role'
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
                  {...{autoFocus, id, name, placeholder, required, role, rows, spellCheck}}
                  {...{onBlur, onChange, onFocus, onKeyPress, onKeyUp}}
                  aria-multiline='true'
                  onChange={(e) => this.handleChange(e)}
                  onKeyDown={this.handleKeyDown}
                  value={value || ''}

        />
        {children}
      </div>
    )
  }
}

TheInputTextArea.propTypes = {
  /** Name of input */
  name: PropTypes.string.isRequired,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Value parser */
  parser: PropTypes.func,
  /** TextArea rows */
  rows: PropTypes.number,
  /** Value of input */
  value: PropTypes.string,
}

TheInputTextArea.defaultProps = {
  error: null,
  parser: String,
  role: 'textbox',
  rows: 5,
  spellCheck: false,
  value: '',
}

TheInputTextArea.displayName = 'TheInputTextArea'

export default TheInputTextArea
