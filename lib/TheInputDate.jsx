'use strict'

import { clone } from 'asobj'
import c from 'classnames'
import flatpickr from 'flatpickr'
import PropTypes from 'prop-types'
import React from 'react'
import { uniqueFilter } from 'the-array'
import { eventHandlersFor, htmlAttributesFor } from 'the-component-util'
import { TheIcon } from 'the-icon'
import { onOffBoolean } from './helpers'

class TheInputDate extends React.PureComponent {
  constructor (props) {
    super(props)
    this.elmRef = React.createRef()
    this.picker = null
  }

  componentDidMount () {
    this.picker = flatpickr(this.elmRef.current)
  }

  componentWillUnmount () {
    this.picker?.destroy()
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
      inputRef,
      name,
      parser,
      placeholder,
      prefix,
      readOnly,
      required,
      spellCheck,
      suffix,
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
      </div>
    )
  }

}

TheInputDate.propTypes = {}
TheInputDate.defaultProps = {}
TheInputDate.displayName = 'TheInputDate'

export default TheInputDate
