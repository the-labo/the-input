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
    const s = this
    s.elm = null
    s.state = {
      suggesting: false,
      selectedCandidate: null,
      candidates: [],
      committedValue: null
    }
    s.handleDocumentClick = s.handleDocumentClick.bind(s)
    s._offSuggestionOffTimer = -1
  }

  render () {
    const s = this
    const {props, state} = s
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
    const warning = s.getPatternWarning()
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
           ref={(elm) => { s.elm = elm }}
      >
        {renderWarningMessage(warning)}
        {renderErrorMessage(error)}

        {
          readOnly ? (
            <span className='the-input-text-readonly'>{value}</span>
          ) : (
            <input className='the-input-text-input'
                   {...{id, readOnly, type, name, required, placeholder, autoFocus, autoComplete}}
                   value={value || ''}
                   onChange={(e) => s.handleChange(e)}
                   onFocus={(e) => s.handleFocus(e)}
                   onBlur={(e) => s.handleBlur(e)}
                   onKeyUp={(e) => s.handleKeyUp(e)}
                   onKeyPress={(e) => s.handleKeyPress(e)}
                   onKeyDown={(e) => s.handleKeyDown(e)}
                   ref={inputRef}

            />
          )
        }

        {children}
        {
          !readOnly && suggesting && (
            <TheInputText.Options {...{parser, candidates, selectedCandidate}}
                                  onSelect={({value}) => s.enterCandidate(value)}
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

  handleChange (e) {
    const s = this
    const {parser, onChange, onUpdate} = s.props
    const {name, value} = e.target
    onChange && onChange(e)
    onUpdate && onUpdate({[name]: parser(value)})
  }

  handleFocus (e) {
    const s = this
    clearTimeout(s._offSuggestionOffTimer)
    s.setState({suggesting: true})
    s.updateCandidates(-1)
    const {onFocus} = s.props
    onFocus && onFocus(e)
  }

  handleBlur (e) {
    const s = this
    const {onBlur} = s.props
    onBlur && onBlur(e)
    s.commitValue()
  }

  handleKeyUp (e) {
    const s = this
    s.updateCandidates()
    const {onKeyUp} = s.props
    onKeyUp && onKeyUp(e)
  }

  handleKeyPress (e) {
    const s = this
    const {onKeyPress} = s.props
    onKeyPress && onKeyPress(e)
  }

  handleKeyDown (e) {
    const s = this
    const {onKeyDown, onEnter} = s.props
    switch (e.keyCode) {
      case 38: // UP
        s.moveCandidateIndex(-1)
        break
      case 40: // DOWN
        s.moveCandidateIndex(+1)
        break
      case 13: { // Enter
        let {selectedCandidate} = s.state
        if (selectedCandidate) {
          s.enterCandidate(selectedCandidate)
        }
        if (onEnter) {
          onEnter()
        }
        s.commitValue()
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

  updateCandidates (index) {
    const s = this
    let {options, value, matcher} = s.props
    options = normalizeOptions(options)
    value = value && String(value).trim()
    const {selectedCandidate} = s.state
    const candidates = Object.keys(options)
      .map((name) => options[name])
      .map((candidate) => String(candidate).trim())
      .filter((candidate) => !!candidate)
      .filter((candidate) => candidate !== value)
      .filter((candidate) => !value || matcher(String(candidate), String(value)))
    if (typeof index === 'undefined') {
      index = candidates.indexOf(selectedCandidate)
    }
    s.setState({
      candidates,
      selectedCandidate: candidates[index] || null
    })
  }

  moveCandidateIndex (amount) {
    const s = this
    const {candidates, selectedCandidate} = s.state
    if (!candidates) {
      return
    }
    const index = candidates.indexOf(selectedCandidate) + amount
    const over = (index <= -1) || (index >= candidates.length)
    if (over) {
      return
    }
    s.updateCandidates(index)
  }

  enterCandidate (value) {
    const s = this
    let {name} = s.props
    s.handleChange({
      target: {
        name,
        value
      }
    })
    s.offSuggestion()
  }

  offSuggestion (delay = 10) {
    const s = this
    clearTimeout(s._offSuggestionOffTimer)
    s._offSuggestionOffTimer = setTimeout(() => {
      s.setState({suggesting: false})
    }, delay)
  }

  commitValue () {
    const s = this
    const {state, props} = s
    const {value} = props

    if (state.committedValue === value) {
      return
    }
    s.setState({committedValue: value})
  }

  getPatternWarning () {
    const s = this
    const {state, props} = s
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
