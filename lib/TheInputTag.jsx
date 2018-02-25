'use strict'

import { clone } from 'asobj'
import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { uniqueFilter } from 'the-array'
import { TheIcon } from 'the-icon'
import TheInputText from './TheInputText'

class TheInputTag extends React.PureComponent {
  constructor (props) {
    super(props)
    const s = this
    s.state = {
      focused: false,
    }
    s.handleKeyDown = s.handleKeyDown.bind(s)
    s.handleUpdate = s.handleUpdate.bind(s)
    s.handleInputRef = s.handleInputRef.bind(s)
    s.handleFocus = s.handleFocus.bind(s)
    s.handleBlur = s.handleBlur.bind(s)
  }

  componentDidMount () {
  }

  componentWillUnmount () {
    const s = this
  }

  handleBack () {
    const s = this
    const [edittingValue, ...tagValues] = s.splitValue()
    if (edittingValue.length === 0) {
      s.updateBySplitValues(
        ['', ...tagValues.slice(1)]
      )
    }
  }

  handleBlur (e) {
    const s = this
    const {onBlur} = s.props
    const [edittingValue, ...tagValues] = s.splitValue()
    if (edittingValue.length > 0) {
      s.updateBySplitValues(['', edittingValue, ...tagValues])
    }

    onBlur && onBlur(e)
    s.setState({focused: false})
  }

  handleEnter () {
    const s = this
    const [edittingValue, ...tagValues] = s.splitValue()
    if (edittingValue.length > 0) {
      s.updateBySplitValues(
        ['', edittingValue, ...tagValues.slice()]
      )
    }
  }

  handleFocus (e) {
    const s = this
    const {onFocus} = s.props
    onFocus && onFocus(e)
    s.setState({focused: true})
  }

  handleInputRef (input) {
    const s = this
    s.input = input
  }

  handleKeyDown (e) {
    const s = this
    const {onKeyDown} = s.props
    switch (e.keyCode) {
      case 8:
        s.handleBack()
        break
      case 13:
        s.handleEnter()
        break
      default:
        break
    }
    onKeyDown && onKeyDown(e)
  }

  handleUpdate (values) {
    const s = this
    const {name} = s.props
    const edittingValue = values[name]
    const [, ...tagValues] = s.splitValue()
    s.updateBySplitValues([edittingValue, ...tagValues])
  }

  removeTag (text) {
    const s = this
    const tagValues = s.splitValue()
    s.updateBySplitValues(
      tagValues.filter((tagValue) => tagValue !== text)
    )
  }

  render () {
    const s = this
    const {props} = s
    const [edittingValue, ...tagValues] = s.splitValue()
    const inputProps = clone(props, {without: ['value', 'splitter', 'options']})
    const {options} = props
    const {focused} = s.state
    return (
      <TheInputText {...inputProps}
                    className={c('the-input-tag', {
                      'the-input-tag-focused': focused,
                    })}
                    inputRef={s.handleInputRef}
                    onBlur={s.handleBlur}
                    onFocus={s.handleFocus}
                    onKeyDown={s.handleKeyDown}
                    onUpdate={s.handleUpdate}
                    options={([].concat(options || [])).filter((option) => !tagValues.includes(option))}
                    value={String(edittingValue).trim()}
      >
        {
          tagValues.filter(Boolean)
            .filter(uniqueFilter())
            .reverse()
            .map((text) => (
              <span className='the-input-tag-tag'
                    key={text}
              >
              <span className='the-input-tag-text'>
                {text}
              </span>
              <span className={c('the-input-tag-remover')}
                    onClick={() => s.removeTag(text)}>
              <TheIcon className={TheInputTag.CLOSE_ICON}/>
              </span>
            </span>
            ))
        }
      </TheInputText>
    )
  }

  splitValue () {
    const s = this
    const {splitter, value} = s.props
    return String(value || '').split(splitter).reverse()
  }

  updateBySplitValues (splitValues) {
    const s = this
    const {name, onUpdate} = s.props
    const [edittingValue, ...tagValues] = splitValues
    const value = [edittingValue, ...tagValues.filter(uniqueFilter())].reverse().join(' ')
    onUpdate && onUpdate({[name]: value})
  }
}

TheInputTag.TAG_ICON = 'fa fa-tags'
TheInputTag.CLOSE_ICON = 'fa fa-close'
TheInputTag.propTypes = Object.assign(
  clone(TheInputText.propTypes, {without: []}),
  {
    splitter: PropTypes.any,
  }
)
TheInputTag.defaultProps = Object.assign(
  clone(TheInputText.defaultProps, {without: []}),
  {
    options: [],
    splitter: /[\s,]+/,
  }
)
TheInputTag.displayName = 'TheInputTag'

export default TheInputTag
