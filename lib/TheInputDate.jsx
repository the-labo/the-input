'use strict'

import { cleanup } from 'asobj'
import c from 'classnames'
import flatpickr from 'flatpickr'
import PropTypes from 'prop-types'
import React from 'react'
import { uniqueFilter } from 'the-array'
import { changedProps, eventHandlersFor, htmlAttributesFor } from 'the-component-util'
import { TheIcon } from 'the-icon'
import { onOffBoolean } from './helpers'

class TheInputDate extends React.Component {
  constructor (props) {
    super(props)
    this.elmRef = React.createRef()
    this.picker = null
  }

  componentDidMount () {
    this.picker = flatpickr(this.elmRef.current, {
      defaultDate: this.props.value,
      maxDate: this.props.maxDate,
      minDate: this.props.minDate,
      onChange: (selectedDates, dateStr) => {
        const {name, onUpdate} = this.props
        onUpdate && onUpdate({[name]: dateStr})
      },
    })
  }

  componentDidUpdate (prevProps) {
    const changed = changedProps(prevProps, this.props)
    this.updatePicker(changed)
  }

  componentWillUnmount () {
    this.picker.destroy()
    this.picker = null
  }

  render () {
    const {props} = this
    const {
      autoComplete,
      autoFocus,
      children,
      className,
      error,
      id,
      name,
      placeholder,
      readOnly,
      required,
      spellCheck,
      type,
      value,
    } = props
    const autoCapitalize = onOffBoolean(props.autoCapitalize)
    const autoCorrect = onOffBoolean(props.autoCorrect)
    return (
      <div {...htmlAttributesFor(props, {
        except: [
          'id',
          'className',
          'type',
          'value',
          'name',
          'required',
          'placeholder',
          'autoFocus',
          'autoComplete',
          'autoCapitalize',
          'autoCorrect',
          'spellCheck',
          'name',
        ],
      })}
           {...eventHandlersFor(props, {
             except: [
               'onChange', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown', 'onKeyPress'
             ],
           })}
           className={c('the-input-date', className, {
             'the-input-error': !!error,
           })}
           data-value={value}
      >
        <input className='the-input-date-input'
               name={name}
               ref={this.elmRef}
               {...{
                 autoCapitalize,
                 autoComplete,
                 autoCorrect,
                 autoFocus,
                 id,
                 name,
                 placeholder,
                 readOnly,
                 required,
                 spellCheck,
                 type,
               }}
        />
        {children}
      </div>
    )
  }

  updatePicker (config) {
    const skip = Object.keys(config).length === 0
    if (skip) {
      return
    }
    const {picker} = this
    if (!picker) {
      return
    }
    const {maxDate, minDate, value} = config
    picker.set(cleanup({maxDate, minDate}))
    if (value) {
      picker.jumpToDate(value)
    }
    picker.redraw()
  }

}

TheInputDate.propTypes = {
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
  name: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
}
TheInputDate.defaultProps = {
  maxDate: null,
  minDate: null,
}
TheInputDate.displayName = 'TheInputDate'

export default TheInputDate
