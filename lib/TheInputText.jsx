'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { htmlAttributesFor, eventHandlersFor } from 'the-component-util'
import { get } from 'the-window'
import { normalizeOptions, renderErrorMessage, renderWarningMessage } from './helpers'
import * as patterns from './patterns'

/**
 * Text Input
 */
class TheInputText extends React.PureComponent {
  constructor (props) {
    super(props)
    this.elm = null
    this.state = {
      suggesting: false,
      selectedCandidate: null,
      candidates: [],
      committedValue: null
    }
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this._offSuggestionOffTimer = -1
  }

  render () {
    const {props, state} = this
    const {
      id,
      className,
      children,
      parser,
      type,
      name,
      required,
      readOnly,
      value,
      error,
      placeholder,
      autoFocus,
      inputRef
    } = props
    let {autoComplete} = props
    const {suggesting, candidates, selectedCandidate, committedValue} = state
    if (!autoComplete && candidates.length >= 0) {
      autoComplete = 'off'
    }
    const warning = this.getPatternWarning()
    return (
      <div {...htmlAttributesFor(props, {
        except: [
          'id', 'className', 'type', 'value', 'name', 'required', 'placeholder', 'autoFocus', 'autoComplete'
        ]
      })}
           {...eventHandlersFor(props, {
             except: [
               'onChange', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown', 'onKeyPress'
             ]
           })}
           className={c('the-input-text', className, {
             'the-input-warn': !!warning,
             'the-input-error': !!error,
           })}
           data-value={value}
           ref={(elm) => { this.elm = elm }}
      >
        {renderWarningMessage(warning)}
        {renderErrorMessage(error)}
        {children}
        {
          readOnly ? (
            <span className='the-input-text-readonly'>{value}</span>
          ) : (
            <input className='the-input-text-input'
                   {...{id, readOnly, type, name, required, placeholder, autoFocus, autoComplete}}
                   value={value || ''}
                   onChange={this.handleChange}
                   onFocus={this.handleFocus}
                   onBlur={this.handleBlur}
                   onKeyUp={this.handleKeyUp}
                   onKeyPress={this.handleKeyPress}
                   onKeyDown={this.handleKeyDown}
                   ref={inputRef}

            />
          )
        }

        {
          !readOnly && suggesting && (
            <TheInputText.Options {...{parser, candidates, selectedCandidate}}
                                  onSelect={({value}) => this.enterCandidate(value)}
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
    clearTimeout(s._offSuggestionOffTimer)
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

  handleChange (e) {
    const {onChange, onUpdate} = this.props
    const {name, value} = e.target
    onChange && onChange(e)
    onUpdate && onUpdate({[name]: value})
  }

  handleFocus (e) {
    clearTimeout(this._offSuggestionOffTimer)
    this.setState({suggesting: true})
    this.updateCandidates(-1)
    const {onFocus} = this.props
    onFocus && onFocus(e)
  }

  handleBlur (e) {
    const {onBlur} = this.props
    onBlur && onBlur(e)
    this.commitValue()
  }

  handleKeyUp (e) {
    this.updateCandidates()
    const {onKeyUp} = this.props
    onKeyUp && onKeyUp(e)
  }

  handleKeyPress (e) {
    const {onKeyPress} = this.props
    onKeyPress && onKeyPress(e)
  }

  handleKeyDown (e) {
    const {
      onKeyDown,
      onEnter,
      onUp,
      onDown,
      onLeft,
      onRight
    } = this.props
    switch (e.keyCode) {
      case 37: // LEFT
        onLeft && onLeft()
        break
      case 38: // UP
        onUp && onUp()
        this.moveCandidateIndex(-1)
        break
      case 39: // RIGHT
        onRight && onRight()
        break
      case 40: // DOWN
        onDown && onDown()
        this.moveCandidateIndex(+1)
        break
      case 13: { // Enter
        let {selectedCandidate} = this.state
        if (selectedCandidate) {
          this.enterCandidate(selectedCandidate)
        }
        onEnter && onEnter()
        this.commitValue()
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

  updateCandidates (index) {
    let {options, value, matcher} = this.props
    options = normalizeOptions(options)
    value = value && String(value).trim()
    const {selectedCandidate} = this.state
    const candidates = Object.keys(options)
      .map((name) => options[name])
      .map((candidate) => String(candidate).trim())
      .filter((candidate) => !!candidate)
      .filter((candidate) => candidate !== value)
      .filter((candidate) => !value || matcher(String(candidate), String(value)))
    if (typeof index === 'undefined') {
      index = candidates.indexOf(selectedCandidate)
    }
    this.setState({
      candidates,
      selectedCandidate: candidates[index] || null
    })
  }

  moveCandidateIndex (amount) {
    const {candidates, selectedCandidate} = this.state
    if (!candidates) {
      return
    }
    const index = candidates.indexOf(selectedCandidate) + amount
    const over = (index <= -1) || (index >= candidates.length)
    if (over) {
      return
    }
    this.updateCandidates(index)
  }

  enterCandidate (value) {
    const {name} = this.props
    this.handleChange({
      target: {
        name,
        value
      }
    })
    this.offSuggestion()
  }

  offSuggestion (delay = 10) {
    clearTimeout(this._offSuggestionOffTimer)
    this._offSuggestionOffTimer = setTimeout(() => {
      this.setState({suggesting: false})
    }, delay)
  }

  commitValue () {
    const {value, onUpdate, parser, name} = this.props
    const committedValue = parser(value)
    onUpdate && onUpdate({[name]: committedValue})

    if (this.state.committedValue === committedValue) {
      return
    }
    this.setState({committedValue})
  }

  getPatternWarning () {
    const {state, props} = this
    const {value, pattern, patternWarning} = props
    const {committedValue} = state
    if (!committedValue) {
      return null
    }
    if (!pattern) {
      return null
    }
    const ok = pattern.test(committedValue)
    if (ok) {
      return null
    }
    const willBeOK = value && pattern.test(value)
    if (willBeOK) {
      return null
    }
    return patternWarning
  }

  static Options ({parser, candidates, selectedCandidate, onSelect}) {
    if (candidates.length === 0) {
      return null
    }
    return (
      <ul className='the-input-text-options'>
        {
          candidates.map((candidate) => (
            <li className={c('the-input-text-option', {
              'the-input-text-option-selected': selectedCandidate === candidate
            })}
                key={candidate}
                data-value={parser(candidate)}
                onClick={() => onSelect({value: candidate})}
            >
              {candidate}
            </li>
          ))
        }
      </ul>
    )
  }
}

TheInputText.propTypes = {
  /** Text type */
  type: PropTypes.string,
  /** Name of input */
  name: PropTypes.string.isRequired,
  /** Value of input */
  value: PropTypes.string,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Handle for enter */
  onEnter: PropTypes.func,
  /** Handle for up */
  onUp: PropTypes.func,
  /** Handle for down */
  onDown: PropTypes.func,
  /** Handle for left */
  onLeft: PropTypes.func,
  /** Handle for right */
  onRight: PropTypes.func,
  /** Value parser */
  parser: PropTypes.func,
  /** Options parser */
  matcher: PropTypes.func,
  /** Regexp for input */
  pattern: PropTypes.instanceOf(RegExp),
  /** Warning text when pattern failed */
  patternWarning: PropTypes.string,
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

TheInputText.defaultProps = {
  type: 'text',
  value: '',
  parser: String,
  matcher: (candidate, value) => {
    return candidate.match(value) || candidate.toLowerCase().match(value.toLowerCase())
  },
  pattern: null,
  patternWarning: null,
  error: null,
  options: {},
  onEnter: null
}

TheInputText.displayName = 'TheInputText'

Object.assign(TheInputText, patterns)

export default TheInputText
