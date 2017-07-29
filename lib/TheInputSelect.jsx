'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { htmlAttributesFor, eventHandlersFor } from 'the-component-util'
import { TheIcon } from 'the-icon'
import { get } from 'the-window'
import { normalizeOptions, renderErrorMessage } from './helpers'

/**
 * Text Input
 */
class TheInputSelect extends React.PureComponent {
  constructor (props) {
    super(props)
    const s = this
    s.elm = null
    s.state = {
      suggesting: false,
      suggestingIndex: s.getIndexForValue(s.props.value)
    }
    s.handleDocumentClick = s.handleDocumentClick.bind(s)
    s._suggestOffTimer = -1
    s.input = null
  }

  render () {
    const s = this
    const {props} = s
    let {
      id,
      className,
      children,
      parser,
      sorter,
      type,
      name,
      value,
      error,
      options,
      placeholder
    } = props
    options = normalizeOptions(options)
    let {suggesting, suggestingIndex} = s.state
    return (
      <div {...htmlAttributesFor(props, {except: ['id', 'className', 'type', 'value', 'name', 'placeholder']})}
           {...eventHandlersFor(props, {except: []})}
           className={classnames('the-input-select', className, {
             'the-input-error': !!error
           })}
           data-value={value}
           ref={(elm) => { s.elm = elm }}
      >
        {renderErrorMessage(error)}

        <a className='the-input-select-display'
           onClick={(e) => s.handleDisplayClick(e)}
        >
          <span className='the-input-select-display-value'>
            {options[value]}
          </span>
          <TheIcon className={TheInputSelect.OPEN_ICON}/>
        </a>
        <input className='the-input-select-input'
               {...{id, type, name, value, placeholder}}
               onFocus={(e) => s.handleFocus(e)}
               onBlur={(e) => s.handleBlur(e)}
               onKeyUp={(e) => s.handleKeyUp(e)}
               onKeyDown={(e) => s.handleKeyDown(e)}
               ref={(input) => { s.input = input }}

        />
        <select onChange={(e) => s.handleChange(e)}
                value={value}
                tabIndex={-1}
                className='the-input-select-select'
        >
          {
            Object.keys(options).map((value) => (
              <option name={name}
                      key={value}
                      value={value}
              >{value}</option>
            ))
          }
        </select>
        {children}
        {
          suggesting && (
            <TheInputSelect.Options {...{parser, sorter, options, suggestingIndex}}
                                    onSelect={({value}) => s.enterSuggested(value)}
            />
          )
        }
      </div>
    )
  }

  componentDidMount () {
    const s = this
    const window = get('window')
    window.addEventListener('click', s.handleDocumentClick)
  }

  componentWillUnmount () {
    const s = this
    const window = get('window')
    window.removeEventListener('click', s.handleDocumentClick)
    clearTimeout(s._suggestOffTimer)
  }

  handleChange (e) {
    const s = this
    let {parser, onChange, onUpdate} = s.props
    let {name, value} = e.target
    onChange && onChange(e)
    onUpdate && onUpdate({[name]: parser(value)})
  }

  handleDocumentClick (e) {
    const s = this
    const {elm} = s

    if (!elm) {
      return
    }
    const inside = elm.contains(e.target)
    if (!inside) {
      s.offSuggestion()
    }
  }

  offSuggestion (delay = 10) {
    const s = this
    clearTimeout(s._suggestOffTimer)
    s._suggestOffTimer = setTimeout(() => {
      s.setState({suggesting: false})
    }, delay)
  }

  handleDisplayClick (e) {
    const s = this
    clearTimeout(s._suggestOffTimer)
    let {input, state} = s
    let suggesting = !state.suggesting
    if (suggesting) {
      input.focus()
    } else {
      input.blur()
    }
    s.setState({
      suggesting,
      suggestingIndex: s.getIndexForValue(s.props.value)
    })
  }

  handleFocus (e) {
    const s = this
    clearTimeout(s._suggestOffTimer)
    s.setState({suggesting: true})
    let {onFocus} = s.props
    onFocus && onFocus(e)
  }

  handleBlur (e) {
    const s = this
    let {onBlur} = s.props
    onBlur && onBlur(e)
  }

  handleKeyUp (e) {
    const s = this
    let {onKeyUp} = s.props
    onKeyUp && onKeyUp(e)
  }

  handleKeyDown (e) {
    const s = this
    let {onKeyDown, onEnter} = s.props
    switch (e.keyCode) {
      case 38: // UP
        s.moveCandidateIndex(-1)
        break
      case 40: // DOWN
        s.moveCandidateIndex(+1)
        break
      case 13: { // Enter
        let values = s.getOptionValues()
        let {suggestingIndex} = s.state
        s.enterSuggested(values[suggestingIndex])
        if (onEnter) {
          onEnter()
        }
        break
      }
      case 9: // Tab
        s.offSuggestion()
        break
      default:
        s.setState({suggesting: true})
        break
    }
    onKeyDown && onKeyDown(e)
  }

  moveCandidateIndex (amount) {
    const s = this
    let {state} = s
    let values = s.getOptionValues()
    let index = state.suggestingIndex + amount
    let over = (index === -1) || (index === values.length)
    if (over) {
      return
    }
    s.setState({
      suggestingIndex: index
    })
  }

  enterSuggested (value) {
    const s = this
    let {state, props} = s
    if (!state.suggesting) {
      return
    }
    s.setState({
      suggesting: false,
      suggestingIndex: s.getIndexForValue(value)
    })
    let {name} = s.props
    s.handleChange({
      target: {name, value}
    })
  }

  getOptionValues () {
    const s = this
    let {props} = s
    let options = normalizeOptions(props.options)
    return Object.keys(options || {})
  }

  getIndexForValue (value) {
    const s = this
    return s.getOptionValues().indexOf(value)
  }

  static Options ({parser, sorter, options, suggestingIndex, onSelect}) {
    const optionValues = Object.keys(options)
    if (optionValues.length === 0) {
      return null
    }
    return (
      <ul className='the-input-select-options'>
        {
          optionValues.sort(sorter).map((optionValue, i) => (
            <li className={classnames('the-input-select-option', {
              'the-input-select-option-selected': i === suggestingIndex
            })}
                key={optionValue}
                data-value={parser(optionValue)}
                onClick={() => onSelect({value: optionValue})}
            >
              {options[optionValue]}
            </li>
          ))
        }
      </ul>
    )
  }
}

TheInputSelect.OPEN_ICON = 'fa fa-caret-down'

TheInputSelect.propTypes = {
  /** Name of input */
  name: PropTypes.string.isRequired,
  /** Value of input */
  value: PropTypes.string,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Handle for enter */
  onEnter: PropTypes.func,
  /** Value parser */
  parser: PropTypes.func,
  /** Options sorter */
  sorter: PropTypes.func,
  /** Input error */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** Options */
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.string)
  ])
}

TheInputSelect.defaultProps = {
  value: '',
  parser: String,
  sorter: () => 1,
  error: null,
  options: {},
  onEnter: null
}

TheInputSelect.displayName = 'TheInputSelect'

export default TheInputSelect
