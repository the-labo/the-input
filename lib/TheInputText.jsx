'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { htmlAttributesFor, eventHandlersFor } from 'the-component-util'
import { normalizeOptions } from './helpers'

/**
 * Text Input
 */
class TheInputText extends React.PureComponent {
  constructor (props) {
    super(props)
    const s = this
    s.state = {
      suggesting: false,
      selectedCandidate: null,
      candidates: []
    }
    s._offSuggestionOffTimer = -1
  }

  render () {
    const s = this
    const { props } = s
    let {
      id,
      className,
      children,
      parser,
      type,
      name,
      value,
      placeholder
    } = props
    let { suggesting, candidates, selectedCandidate } = s.state
    return (
      <div {...htmlAttributesFor(props, { except: [ 'id', 'className', 'type', 'value', 'name', 'placeholder' ] })}
           {...eventHandlersFor(props, { except: [] })}
           className={classnames('the-input-text', className)}
           data-value={value}
      >

        <input className='the-input-text-input'
               {...{ id, type, name, value, placeholder }}
               onFocus={ (e) => s.handleFocus(e) }
               onChange={ (e) => s.handleChange(e) }
               onBlur={ (e) => s.handleBlur(e) }
               onKeyUp={ (e) => s.handleKeyUp(e) }
               onKeyDown={ (e) => s.handleKeyDown(e) }

        />
        {children}
        {
          suggesting && (
            <TheInputText.Options {...{ parser, candidates, selectedCandidate }}
                                  onSelect={({ value }) => s.enterCandidate(value)}
            />
          )
        }
      </div>
    )
  }

  componentWillUnmount () {
    const s = this
    clearTimeout(s._offSuggestionOffTimer)
  }

  handleChange (e) {
    const s = this
    let { parser, onChange, onUpdate } = s.props
    let { name, value } = e.target
    onChange && onChange(e)
    onUpdate && onUpdate({ [name]: parser(value) })
  }

  handleFocus (e) {
    const s = this
    clearTimeout(s._offSuggestionOffTimer)
    s.setState({ suggesting: true })
    s.updateCandidates(-1)
    let { onFocus } = s.props
    onFocus && onFocus(e)
  }

  handleBlur (e) {
    const s = this
    let { onBlur } = s.props
    onBlur && onBlur(e)
  }

  handleKeyUp (e) {
    const s = this
    s.updateCandidates()
    let { onKeyUp } = s.props
    onKeyUp && onKeyUp(e)
  }

  handleKeyDown (e) {
    const s = this
    let { onKeyDown, onEnter } = s.props
    switch (e.keyCode) {
      case 38: // UP
        s.moveCandidateIndex(-1)
        break
      case 40: // DOWN
        s.moveCandidateIndex(+1)
        break
      case 13: // Enter
        s.enterCandidate(s.state.selectedCandidate)
        if (onEnter) {
          onEnter()
        }
        break
      case 9: // Tab
        s.offSuggestion()
        break
      default:
        s.setState({ suggesting: true })
        break
    }
    onKeyDown && onKeyDown(e)
  }

  updateCandidates (index) {
    const s = this
    let { options, value, matcher } = s.props
    options = normalizeOptions(options)
    value = value && String(value).trim()
    let { selectedCandidate } = s.state
    let candidates = Object.keys(options)
      .map((name) => options[ name ])
      .map((candidate) => String(candidate).trim())
      .filter((candidate) => !!candidate)
      .filter((candidate) => candidate !== value)
      .filter((candidate) => !value || matcher(String(candidate), String(value)))
    if (typeof index === 'undefined') {
      index = candidates.indexOf(selectedCandidate)
    }
    s.setState({
      candidates,
      selectedCandidate: candidates[ index ] || null
    })
  }

  moveCandidateIndex (amount) {
    const s = this
    let { candidates, selectedCandidate } = s.state
    if (!candidates) {
      return
    }
    let index = candidates.indexOf(selectedCandidate) + amount
    let over = (index <= -1) || (index >= candidates.length)
    if (over) {
      return
    }
    s.updateCandidates(index)
  }

  enterCandidate (value) {
    const s = this
    let { name } = s.props
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
      s.setState({ suggesting: false })
    }, delay)
  }

  static Options ({ parser, candidates, selectedCandidate, onSelect }) {
    if (candidates.length === 0) {
      return null
    }
    return (
      <ul className='the-input-text-options'>
        {
          candidates.map((candidate) => (
            <li className={classnames('the-input-text-option', {
              'the-input-text-option-selected': selectedCandidate === candidate
            })}
                key={candidate}
                data-value={parser(candidate)}
                onClick={() => onSelect({ value: candidate })}
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
  options: {},
  onEnter: null
}

TheInputText.displayName = 'TheInputText'

export default TheInputText
