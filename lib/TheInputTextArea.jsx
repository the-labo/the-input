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
      onEnter,
      onKeyDown,
      onCombineEnter,
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
                  {...{onBlur, onChange, onFocus, onKeyPress, onKeyUp}}
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
