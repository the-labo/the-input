'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { TheCondition } from 'the-condition'
import c from 'classnames'
import { htmlAttributesFor, eventHandlersFor } from 'the-component-util'
import { TheIcon } from 'the-icon'
import { get } from 'the-window'
import { normalizeOptions, renderErrorMessage } from './helpers'

/**
 * Select Input
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
    const {
      id,
      className,
      children,
      parser,
      sorter,
      type,
      name,
      value,
      error,
      placeholder
    } = props
    const options = normalizeOptions(props.options)
    const {suggesting, suggestingIndex} = s.state
    const selectedValue = options[value]
    const hasNotSelect = typeof selectedValue === 'undefined'
    return (
      <div {...htmlAttributesFor(props, {except: ['id', 'className', 'type', 'value', 'name', 'placeholder']})}
           {...eventHandlersFor(props, {except: []})}
           className={c('the-input-select', className, {
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
            {selectedValue}
          </span>
          <TheCondition if={hasNotSelect}>
            <span className='the-input-select-display-alt'>
              {placeholder}
            </span>
          </TheCondition>
          <TheIcon className={TheInputSelect.OPEN_ICON}/>
        </a>
        <input className='the-input-select-input'
               {...{id, type, name, value, placeholder}}
               onFocus={(e) => s.handleFocus(e)}
               onBlur={(e) => s.handleBlur(e)}
               onKeyUp={(e) => s.handleKeyUp(e)}
               onKeyDown={(e) => s.handleKeyDown(e)}
               readOnly
               ref={(input) => { s.input = input }}
               onChange={(value) => {}}
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
    const {input, state} = s
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
    const {onFocus} = s.props
    e.preventDefault()
    e.stopPropagation()
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
      // UP
      case 38: {
        const moved = s.moveCandidateIndex(-1)
        if (moved) {
          e.preventDefault()
          e.stopPropagation()
        }
        break
      }
      // DOWN
      case 40: {
        const moved = s.moveCandidateIndex(+1)
        if (moved) {
          e.preventDefault()
          e.stopPropagation()
        }
        break
      }
      // Enter
      case 13: {
        const values = s.getOptionValues()
        const {suggestingIndex} = s.state
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
    const {state} = s
    const values = s.getOptionValues()
    const index = state.suggestingIndex + amount
    const over = (index === -1) || (index === values.length)
    if (over) {
      return false
    }
    s.setState({
      suggestingIndex: index
    })
    return true
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
    const {name} = s.props
    s.handleChange({
      target: {name, value}
    })
  }

  getOptionValues () {
    const s = this
    const {props} = s
    const options = normalizeOptions(props.options)
    return Object.keys(options || {}).sort(props.sorter)
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
            <li className={c('the-input-select-option', {
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
