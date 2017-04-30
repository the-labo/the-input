'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { htmlAttributesFor, eventHandlersFor, newId } from 'the-component-util'
import { TheIcon } from 'the-icon'
import { normalizeOptions } from './helpers'

/**
 * Radio input of the-components
 */
class TheInputRadio extends React.PureComponent {
  constructor (props) {
    super(props)
    const s = this
    s.id = newId()
  }

  render () {
    const s = this
    const { props } = s
    let {
      id = s.id,
      className,
      name,
      options,
      value
    } = props

    options = normalizeOptions(options)

    return (
      <div {...htmlAttributesFor(props, { except: [ 'id', 'className' ] })}
           {...eventHandlersFor(props, { except: [] })}
           className={classnames('the-input-radio', className)}
           data-value={value}
           id={id}
      >
        {
          Object.keys(options).map((optionValue) => (
            <TheInputRadio.Option name={name}
                                  checked={String(optionValue).trim() === String(value).trim()}
                                  id={s.idFor(optionValue)}
                                  key={optionValue}
                                  value={optionValue}
                                  onChange={(e) => s.handleChange(e)}
                                  label={options[ optionValue ]}
            />
          ))
        }
      </div>
    )
  }

  handleChange (e) {
    const s = this
    let { parser, onChange, onUpdate } = s.props
    let { name, value } = e.target
    onChange && onChange(e)
    onUpdate && onUpdate({ [name]: parser(value) })
  }

  idFor (optionValue) {
    const s = this
    let { id = s.id } = s.props
    return [ id, optionValue ].join('-')
  }

  static Option ({ name, value, id, checked, onChange, label }) {
    const icon = checked ? TheInputRadio.CHECKED_ICON : TheInputRadio.NORMAL_ICON
    return (
      <div className='the-input-radio-item'
           key={value}
      >
        <input type='radio'
               className='the-input-radio-radio'
               {...{ name, checked, id, value, onChange }}
        />
        <label htmlFor={id}
               className='the-input-radio-label'
        >
          <TheIcon className={classnames('the-input-radio-icon', icon)}/>
          {label}
        </label>
      </div>
    )
  }
}

TheInputRadio.NORMAL_ICON = 'fa fa-circle-o'
TheInputRadio.CHECKED_ICON = 'fa fa-dot-circle-o'

TheInputRadio.PropTypes = {
  /** Name of input */
  name: PropTypes.string.isRequired,
  /** Value of input */
  value: PropTypes.string,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Value parser */
  parser: PropTypes.func,
  /** Options */
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.string)
  ])
}

TheInputRadio.defaultProps = {
  value: '',
  parser: String,
  options: {}
}

TheInputRadio.displayName = 'TheInputRadio'

export default TheInputRadio
