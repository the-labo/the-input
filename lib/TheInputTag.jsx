'use strict'

import React from 'react'
import c from 'classnames'
import PropTypes from 'prop-types'
import TheInputText from './TheInputText'
import { TheIcon } from 'the-icon'
import { uniqueFilter } from 'the-array'
import { clone } from 'asobj'

class TheInputTag extends React.PureComponent {
  constructor (props) {
    super(props)
    const s = this
    s.state = {
      focused: false
    }
    s.handleKeyDown = s.handleKeyDown.bind(s)
    s.handleUpdate = s.handleUpdate.bind(s)
    s.handleInputRef = s.handleInputRef.bind(s)
    s.handleFocus = s.handleFocus.bind(s)
    s.handleBlur = s.handleBlur.bind(s)
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
                      'the-input-tag-focused': focused
                    })}
                    value={String(edittingValue).trim()}
                    onUpdate={s.handleUpdate}
                    onKeyDown={s.handleKeyDown}
                    onFocus={s.handleFocus}
                    onBlur={s.handleBlur}
                    inputRef={s.handleInputRef}
                    options={([].concat(options || [])).filter((option) => !tagValues.includes(option))}
      >
        {
          tagValues.filter(Boolean).reverse().map((text) => (
            <span key={text}
                  className={'the-input-tag-tag'}
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

  componentDidMount () {

  }

  componentWillUnmount () {
    const s = this
  }

  handleUpdate (values) {
    const s = this
    const {name} = s.props
    const edittingValue = values[name]
    const [, ...tagValues] = s.splitValue()
    s.updateBySplitValues([edittingValue, ...tagValues])
  }

  splitValue () {
    const s = this
    const {splitter, value} = s.props
    return String(value || '').split(splitter).reverse().filter(uniqueFilter())
  }

  handleKeyDown (e) {
    const s = this
    const {onKeyDown} = s.props
    switch (e.keyCode) {
      case 8:
        s.handleBack()
        break
      default:
        break
    }
    onKeyDown && onKeyDown(e)
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

  handleInputRef (input) {
    const s = this
    s.input = input
  }

  handleFocus (e) {
    const s = this
    const {onFocus} = s.props
    onFocus && onFocus(e)
    s.setState({focused: true})
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

  removeTag (text) {
    const s = this
    const tagValues = s.splitValue()
    s.updateBySplitValues(
      tagValues.filter((tagValue) => tagValue !== text)
    )
  }

  updateBySplitValues (splitValues) {
    const s = this
    const {name, onUpdate} = s.props
    const value = splitValues.reverse().join(' ')
    onUpdate && onUpdate({[name]: value})
  }
}

TheInputTag.TAG_ICON = 'fa fa-tags'
TheInputTag.CLOSE_ICON = 'fa fa-close'
TheInputTag.propTypes = Object.assign(
  clone(TheInputText.propTypes, {without: []}),
  {
    splitter: PropTypes.any
  }
)
TheInputTag.defaultProps = Object.assign(
  clone(TheInputText.defaultProps, {without: []}),
  {
    splitter: /[\s,]+/,
    options: []
  }
)
TheInputTag.displayName = 'TheInputTag'

export default TheInputTag
