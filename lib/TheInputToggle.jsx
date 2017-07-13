'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { htmlAttributesFor, eventHandlersFor, newId } from 'the-component-util'
import TheInputRadio from './TheInputRadio'

/**
 * Toggle input of the-components
 */
class TheInputToggle extends React.PureComponent {
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
      name,
      on,
      className,
      width,
      error,
      style,
      onTitle,
      offTitle
    } = props
    const { Label, Radio } = TheInputToggle
    return (
      <div {...htmlAttributesFor(props, { except: [ 'id', 'className' ] })}
           {...eventHandlersFor(props, { except: [] })}
           {...{ id }}
           style={Object.assign({}, style, { width })}
           className={classnames('the-input-toggle', className, {
             'the-input-toggle-on': on,
             'the-input-toggle-off': !on,
             'the-input-error': !!error
           })}
      >
        <div className='the-input-toggle-inner'
        >
          <Label htmlFor={`${id}-radio-off`}
                 className='the-input-toggle-on-label'
                 title={onTitle}
          />
          <Radio id={`${id}-radio-off`}
                 value='off'
                 name={name}
                 checked={!on}
                 onChange={(e) => s.handleChange(e)}
                 onClick={(e) => s.handleClick(e)}
          />
          <div className='the-input-toggle-handle'
               onClick={(e) => s.handleClick(e)}
          >
          </div>
          <Label htmlFor={`${id}-radio-on`}
                 className='the-input-toggle-off-label'
                 title={offTitle}
          />
          <Radio id={`${id}-radio-on`}
                 value='on'
                 name={name}
                 checked={!!on}
                 onChange={(e) => s.handleChange(e)}
                 onClick={(e) => s.handleClick(e)}
          />
        </div>
        { props.children }
      </div>
    )
  }

  handleChange (e) {
    const s = this
    let { onChange } = s.props
    onChange && onChange(e)
  }

  handleClick (e) {
    const s = this
    let { on, onUpdate } = s.props
    let { name } = s.props
    onUpdate && onUpdate({ [name]: !on })
  }

  static Label ({ htmlFor, className, title }) {
    return (
      <label htmlFor={ htmlFor }
             className={ classnames('the-input-toggle-label', className) }>
        <span className='the-input-toggle-label-text'>{ title }</span>
      </label>
    )
  }

  static Radio ({ id, name, value, checked, onClick, onChange }) {
    return (
      <input type='radio'
             {...{ id, name, value, checked, onClick, onChange }}
             className='the-input-toggle-radio'/>
    )
  }
}

TheInputToggle.PropTypes = {
  /** Switch on or not */
  on: PropTypes.bool.isRequired,
  /** Title text for on state */
  onTitle: PropTypes.string,
  /** Title text for off state */
  offTitle: PropTypes.string,
  /** Width of component */
  width: PropTypes.number
}

TheInputToggle.defaultProps = {
  on: false,
  onTitle: '',
  offTitle: '',
  error: null,
  width: 64
}

TheInputToggle.displayName = 'TheInputToggle'

export default TheInputToggle
