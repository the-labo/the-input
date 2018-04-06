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
  static Options ({
                    full = false,
                    onSelect,
                    options,
                    optionsRef,
                    parser,
                    sorter,
                    suggestingIndex,
                  }) {
    const optionValues = Object.keys(options)
    if (optionValues.length === 0) {
      return null
    }
    return (
      <div className={c('the-input-select-options', {
        'the-input-select-options-full': full,
      })}>
        <ul className='the-input-select-options-list'
            ref={optionsRef}
            role='listbox'
        >
          {
            optionValues.sort(sorter).map((optionValue, i) => (
              <li className={c('the-input-select-option', {
                'the-input-select-option-selected': i === suggestingIndex,
              })}
                  data-value={parser(optionValue)}
                  key={optionValue}
                  onClick={() => onSelect({value: optionValue})}
                  role='option'
              >
                {options[optionValue]}
              </li>
            ))
          }
        </ul>
      </div>
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

  componentDidUpdate () {
    const {optionsElm} = this
    if (optionsElm) {
      const minY = get('document.body.clientTop')
      const maxY = get('document.body.clientHeight')
      const rect = optionsElm.getBoundingClientRect()
      const topOut = rect.top < minY
      const bottomOut = rect.bottom > maxY
      if (!topOut && bottomOut) {
        const amount = Math.min(rect.bottom - maxY, rect.top - minY)
        optionsElm.style.top -= amount
      }
    }
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
    const {onBlur} = this.props
    onBlur && onBlur(e)
  }

  handleChange (e) {
    const {onChange, onUpdate, parser} = this.props
    const {name, value} = e.target
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
    const {onKeyUp} = this.props
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
    const {props} = this
    const {
      children,
      className,
      error,
      fullScreen,
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
    const {suggesting, suggestingIndex} = this.state
    const selectedValue = options[value]
    const hasNotSelect = typeof selectedValue === 'undefined'
    return (
      <div {...htmlAttributesFor(props, {except: ['id', 'className', 'type', 'value', 'name', 'placeholder']})}
           {...eventHandlersFor(props, {except: []})}
           className={c('the-input-select', className, {
             'the-input-error': !!error,
           })}
           data-value={value}
           ref={(elm) => { this.elm = elm }}
      >
        {renderErrorMessage(error)}

        {
          !readOnly && (
            <a className='the-input-select-display'
               onClick={(e) => this.handleDisplayClick(e)}
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
               onBlur={(e) => this.handleBlur(e)}
               onChange={(value) => {}}
               onFocus={(e) => this.handleFocus(e)}
               onKeyDown={(e) => this.handleKeyDown(e)}
               onKeyUp={(e) => this.handleKeyUp(e)}
               readOnly
               ref={(input) => { this.input = input }}
               value={value || ''}
        />

        {
          readOnly ? (
            <span className='the-input-select-readonly'>{options[value]}</span>
          ) : (
            <select className='the-input-select-select'
                    onChange={(e) => this.handleChange(e)}
                    tabIndex={-1}
                    value={value || ''}
            >
              {
                Object.keys(options).map((optionValue) => (
                  <option key={optionValue}
                          name={name}
                          value={optionValue}
                  >{optionValue}</option>
                ))
              }
            </select>
          )
        }


        {children}
        {
          !readOnly && suggesting && (
            <TheInputSelect.Options {...{options, parser, sorter, suggestingIndex}}
                                    full={fullScreen}
                                    onSelect={({value}) => this.enterSuggested(value)}
                                    optionsRef={(optionsElm) => { this.optionsElm = optionsElm }}
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
