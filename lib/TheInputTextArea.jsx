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
    this.textareaRef = React.createRef()
    this.state = {
      actualRows: props.minRows,
    }
  }

  adjustRows () {
    const {maxRows, minRows} = this.props
    const textarea = this.textareaRef.current
    const lineHeight = textarea.offsetHeight / this.state.actualRows

    // 入力行数が少なくなったらそれに合わせてテキストエリアの行数も減らす
    // テキストエリアが offsetHeight < scrollHeight になるまで高さを小さくして、scrollHeight の最小値を求める
    const originalHeight = textarea.style.height
    let height = textarea.offsetHeight
    while (true) {
      if (textarea.offsetHeight < textarea.scrollHeight || textarea.offsetHeight < lineHeight * minRows) {
        break
      }
      height -= 3
      textarea.style.height = height + 'px'
    }
    const minScrollHeight = textarea.scrollHeight
    textarea.style.height = originalHeight

    let rows = Math.round(minScrollHeight / lineHeight)
    if (rows < minRows) {
      rows = minRows
    }
    if (maxRows && rows > maxRows) {
      rows = maxRows
    }

    if (rows !== this.state.actualRows) {
      this.setState({actualRows: rows})
    }
  }

  componentWillUnmount () {
  }

  handleChange (e) {
    const {onChange, onUpdate, parser} = this.props
    const {name, value} = e.target
    onChange && onChange(e)
    onUpdate && onUpdate({[name]: parser(value)})

    const {autoExpand} = this.props
    if (autoExpand) {
      this.adjustRows()
    }
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
      autoExpand,
      autoFocus,
      children,
      className,
      error,
      id,
      name,
      onBlur,
      onFocus,
      onKeyPress,
      onKeyUp,
      placeholder,
      required,
      role,
      spellCheck,
      value,
    } = props
    const rows = autoExpand ? this.state.actualRows : this.props.rows
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
                  {...{autoFocus, id, name, placeholder, required, role, spellCheck}}
                  {...{onBlur, onFocus, onKeyPress, onKeyUp}}
                  aria-multiline='true'
                  onChange={(e) => this.handleChange(e)}
                  onKeyDown={this.handleKeyDown}
                  ref={this.textareaRef}
                  rows={rows}
                  value={value || ''}
        />
        {children}
      </div>
    )
  }
}

TheInputTextArea.propTypes = {
  /** Auto expanding text area height */
  autoExpand: PropTypes.bool,
  /** Max rows when autoExpand is enabled */
  maxRows: PropTypes.number,
  /** Min rows when autoExpand is enabled */
  minRows: PropTypes.number,
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
  autoExpand: false,
  error: null,
  maxRows: 10,
  minRows: 1,
  parser: String,
  role: 'textbox',
  rows: 5,
  spellCheck: false,
  value: '',
}

TheInputTextArea.displayName = 'TheInputTextArea'

export default TheInputTextArea
