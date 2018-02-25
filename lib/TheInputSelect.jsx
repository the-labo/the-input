'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from 'the-component-util'
import { TheCondition } from 'the-condition'
import { TheIcon } from 'the-icon'
import { get } from 'the-window'
import { normalizeOptions, renderErrorMessage } from './helpers'

/**
 * Select Input
 */
class TheInputSelect extends React.PureComponent {
  static Options ({onSelect, options, parser, sorter, suggestingIndex}) {
    const optionValues = Object.keys(options)
    if (optionValues.length === 0) {
      return null
    }
    return (
      <ul className='the-input-select-options'>
        {
          optionValues.sort(sorter).map((optionValue, i) => (
            <li className={c('the-input-select-option', {
              'the-input-select-option-selected': i === suggestingIndex,
            })}
                data-value={parser(optionValue)}
                key={optionValue}
                onClick={() => onSelect({value: optionValue})}
            >
              {options[optionValue]}
            </li>
          ))
        }
      </ul>
    )
  }

  constructor (props) {
    super(props)
    this.elm = null
    this.state = {
      suggesting: false,
      suggestingIndex: this.getIndexForValue(this.props.value),
    }
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this._suggestOffTimer = -1
    this.input = null
  }

  componentDidMount () {
    const window = get('window')
    window.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount () {
    const window = get('window')
    window.removeEventListener('click', this.handleDocumentClick)
    clearTimeout(this._suggestOffTimer)
  }

  enterSuggested (value) {
    let {props, state} = this
    if (!state.suggesting) {
      return
    }
    this.setState({
      suggesting: false,
      suggestingIndex: this.getIndexForValue(value),
    })
    const {name} = this.props
    this.handleChange({
      target: {name, value},
    })
  }

  getIndexForValue (value) {
    return this.getOptionValues().indexOf(value)
  }

  getOptionValues () {
    const {props} = this
    const options = normalizeOptions(props.options)
    return Object.keys(options || {}).sort(props.sorter)
  }

  handleBlur (e) {
    const s = this
    const {onBlur} = s.props
    onBlur && onBlur(e)
  }

  handleChange (e) {
    const s = this
    let {onChange, onUpdate, parser} = s.props
    let {name, value} = e.target
    onChange && onChange(e)
    onUpdate && onUpdate({[name]: parser(value)})
  }

  handleDisplayClick (e) {
    clearTimeout(this._suggestOffTimer)
    const {input, state} = this
    const suggesting = !state.suggesting
    if (suggesting) {
      input.focus()
    } else {
      input.blur()
    }
    this.setState({
      suggesting,
      suggestingIndex: this.getIndexForValue(this.props.value),
    })
  }

  handleDocumentClick (e) {
    const {elm} = this

    if (!elm) {
      return
    }
    const inside = elm.contains(e.target)
    if (!inside) {
      this.offSuggestion()
    }
  }

  handleFocus (e) {
    clearTimeout(this._suggestOffTimer)
    this.setState({suggesting: true})
    const {onFocus} = this.props
    e.preventDefault()
    e.stopPropagation()
    onFocus && onFocus(e)
  }

  handleKeyDown (e) {
    const {onEnter, onKeyDown} = this.props
    switch (e.keyCode) {
      // UP
      case 38: {
        const moved = this.moveCandidateIndex(-1)
        if (moved) {
          e.preventDefault()
          e.stopPropagation()
        }
        break
      }
      // DOWN
      case 40: {
        const moved = this.moveCandidateIndex(+1)
        if (moved) {
          e.preventDefault()
          e.stopPropagation()
        }
        break
      }
      // Enter
      case 13: {
        const values = this.getOptionValues()
        const {suggestingIndex} = this.state
        this.enterSuggested(values[suggestingIndex])
        if (onEnter) {
          onEnter()
        }
        break
      }
      case 9: // Tab
        this.offSuggestion()
        break
      default:
        this.setState({suggesting: true})
        break
    }
    onKeyDown && onKeyDown(e)
  }

  handleKeyUp (e) {
    const s = this
    const {onKeyUp} = s.props
    onKeyUp && onKeyUp(e)
  }

  moveCandidateIndex (amount) {
    const {state} = this
    const values = this.getOptionValues()
    const index = state.suggestingIndex + amount
    const over = (index === -1) || (index === values.length)
    if (over) {
      return false
    }
    this.setState({
      suggestingIndex: index,
    })
    return true
  }

  offSuggestion (delay = 10) {
    clearTimeout(this._suggestOffTimer)
    this._suggestOffTimer = setTimeout(() => {
      this.setState({suggesting: false})
    }, delay)
  }

  render () {
    const s = this
    const {props} = s
    const {
      children,
      className,
      error,
      id,
      name,
      parser,
      placeholder,
      readOnly,
      sorter,
      type,
      value,
    } = props
    const options = normalizeOptions(props.options)
    const {suggesting, suggestingIndex} = s.state
    const selectedValue = options[value]
    const hasNotSelect = typeof selectedValue === 'undefined'
    return (
      <div {...htmlAttributesFor(props, {except: ['id', 'className', 'type', 'value', 'name', 'placeholder']})}
           {...eventHandlersFor(props, {except: []})}
           className={c('the-input-select', className, {
             'the-input-error': !!error,
           })}
           data-value={value}
           ref={(elm) => { s.elm = elm }}
      >
        {renderErrorMessage(error)}

        {
          !readOnly && (
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
          )
        }

        <input className='the-input-select-input'
               {...{id, name, placeholder, type}}
               onBlur={(e) => s.handleBlur(e)}
               onChange={(value) => {}}
               onFocus={(e) => s.handleFocus(e)}
               onKeyDown={(e) => s.handleKeyDown(e)}
               onKeyUp={(e) => s.handleKeyUp(e)}
               readOnly
               ref={(input) => { s.input = input }}
               value={value || ''}
        />

        {
          readOnly ? (
            <span className='the-input-select-readonly'>{options[value]}</span>
          ) : (
            <select className='the-input-select-select'
                    onChange={(e) => s.handleChange(e)}
                    tabIndex={-1}
                    value={value || ''}
            >
              {
                Object.keys(options).map((value) => (
                  <option key={value}
                          name={name}
                          value={value}
                  >{value}</option>
                ))
              }
            </select>
          )
        }


        {children}
        {
          !readOnly && suggesting && (
            <TheInputSelect.Options {...{options, parser, sorter, suggestingIndex}}
                                    onSelect={({value}) => s.enterSuggested(value)}
            />
          )
        }
      </div>
    )
  }
}

TheInputSelect.OPEN_ICON = 'fa fa-caret-down'

TheInputSelect.propTypes = {
  /** Name of input */
  /** Input error */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  name: PropTypes.string.isRequired,
  /** Handle for enter */
  onEnter: PropTypes.func,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Options */
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  /** Value parser */
  parser: PropTypes.func,
  /** Options sorter */
  sorter: PropTypes.func,
  /** Value of input */
  value: PropTypes.string,
}

TheInputSelect.defaultProps = {
  error: null,
  onEnter: null,
  options: {},
  parser: String,
  sorter: () => 1,
  value: '',
}

TheInputSelect.displayName = 'TheInputSelect'

export default TheInputSelect
