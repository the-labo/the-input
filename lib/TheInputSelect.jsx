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
    this.elm = null
    this.state = {
      suggesting: false,
      suggestingIndex: this.getIndexForValue(this.props.value)
    }
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this._suggestOffTimer = -1
    this.input = null
  }

  render () {
    const s = this
    const {props} = s
    const {
      id,
      className,
      children,
      parser,
      readOnly,
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
               {...{id, type, name, placeholder}}
               value={value || ''}
               onFocus={(e) => s.handleFocus(e)}
               onBlur={(e) => s.handleBlur(e)}
               onKeyUp={(e) => s.handleKeyUp(e)}
               onKeyDown={(e) => s.handleKeyDown(e)}
               readOnly
               ref={(input) => { s.input = input }}
               onChange={(value) => {}}
        />

        {
          readOnly ? (
            <span className='the-input-select-readonly'>{options[value]}</span>
          ) : (
            <select onChange={(e) => s.handleChange(e)}
                    value={value || ''}
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
          )
        }


        {children}
        {
          !readOnly && suggesting && (
            <TheInputSelect.Options {...{parser, sorter, options, suggestingIndex}}
                                    onSelect={({value}) => s.enterSuggested(value)}
            />
          )
        }
      </div>
    )
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

  handleChange (e) {
    const s = this
    let {parser, onChange, onUpdate} = s.props
    let {name, value} = e.target
    onChange && onChange(e)
    onUpdate && onUpdate({[name]: parser(value)})
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

  offSuggestion (delay = 10) {
    clearTimeout(this._suggestOffTimer)
    this._suggestOffTimer = setTimeout(() => {
      this.setState({suggesting: false})
    }, delay)
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
      suggestingIndex: this.getIndexForValue(this.props.value)
    })
  }

  handleFocus (e) {
    clearTimeout(this._suggestOffTimer)
    this.setState({suggesting: true})
    const {onFocus} = this.props
    e.preventDefault()
    e.stopPropagation()
    onFocus && onFocus(e)
  }

  handleBlur (e) {
    const s = this
    const {onBlur} = s.props
    onBlur && onBlur(e)
  }

  handleKeyUp (e) {
    const s = this
    const {onKeyUp} = s.props
    onKeyUp && onKeyUp(e)
  }

  handleKeyDown (e) {
    const {onKeyDown, onEnter} = this.props
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

  moveCandidateIndex (amount) {
    const {state} = this
    const values = this.getOptionValues()
    const index = state.suggestingIndex + amount
    const over = (index === -1) || (index === values.length)
    if (over) {
      return false
    }
    this.setState({
      suggestingIndex: index
    })
    return true
  }

  enterSuggested (value) {
    let {state, props} = this
    if (!state.suggesting) {
      return
    }
    this.setState({
      suggesting: false,
      suggestingIndex: this.getIndexForValue(value)
    })
    const {name} = this.props
    this.handleChange({
      target: {name, value}
    })
  }

  getOptionValues () {
    const {props} = this
    const options = normalizeOptions(props.options)
    return Object.keys(options || {}).sort(props.sorter)
  }

  getIndexForValue (value) {
    return this.getOptionValues().indexOf(value)
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
