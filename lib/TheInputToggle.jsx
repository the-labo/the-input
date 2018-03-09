'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor, newId } from 'the-component-util'
import TheInputRadio from './TheInputRadio'

/**
 * Toggle input of the-components
 */
class TheInputToggle extends React.PureComponent {
  static Label ({className, htmlFor, title}) {
    return (
      <label className={c('the-input-toggle-label', className)}
             htmlFor={htmlFor}>
        <span className='the-input-toggle-label-text'>{title}</span>
      </label>
    )
  }

  static Radio ({checked, id, name, onChange, onClick, value}) {
    return (
      <input type='radio'
             {...{checked, id, name, onChange, onClick, value}}
             className='the-input-toggle-radio'/>
    )
  }

  constructor (props) {
    super(props)
    const s = this
    s.id = newId()
  }

  handleChange (e) {
    const s = this
    let {onChange} = s.props
    onChange && onChange(e)
  }

  handleClick (e) {
    const s = this
    let {on, onUpdate} = s.props
    let {name} = s.props
    onUpdate && onUpdate({[name]: !on})
  }

  render () {
    const s = this
    const {props} = s
    let {
      className,
      error,
      id = s.id,
      name,
      offTitle,
      on,
      onTitle,
      style,
      width,
    } = props
    const {Label, Radio} = TheInputToggle
    return (
      <div {...htmlAttributesFor(props, {except: ['id', 'className']})}
           {...eventHandlersFor(props, {except: []})}
           {...{id}}
           aria-checked={on}
           className={c('the-input-toggle', className, {
             'the-input-error': !!error,
             'the-input-toggle-off': !on,
             'the-input-toggle-on': on,
           })}
           role='switch'
           style={Object.assign({}, style, {width})}
      >
        <div className='the-input-toggle-inner'
        >
          <Label className='the-input-toggle-on-label'
                 htmlFor={`${id}-radio-off`}
                 title={onTitle}
          />
          <Radio checked={!on}
                 id={`${id}-radio-off`}
                 name={name}
                 onChange={(e) => s.handleChange(e)}
                 onClick={(e) => s.handleClick(e)}
                 value='off'
          />
          <div className='the-input-toggle-handle'
               onClick={(e) => s.handleClick(e)}
          >
          </div>
          <Label className='the-input-toggle-off-label'
                 htmlFor={`${id}-radio-on`}
                 title={offTitle}
          />
          <Radio checked={!!on}
                 id={`${id}-radio-on`}
                 name={name}
                 onChange={(e) => s.handleChange(e)}
                 onClick={(e) => s.handleClick(e)}
                 value='on'
          />
        </div>
        {props.children}
      </div>
    )
  }
}

TheInputToggle.propTypes = {
  /** Switch on or not */
  /** Title text for off state */
  offTitle: PropTypes.string,
  on: PropTypes.bool.isRequired,
  /** Title text for on state */
  onTitle: PropTypes.string,
  /** Width of component */
  width: PropTypes.number,
}

TheInputToggle.defaultProps = {
  error: null,
  offTitle: '',
  on: false,
  onTitle: '',
  width: 64,
}

TheInputToggle.displayName = 'TheInputToggle'

export default TheInputToggle
