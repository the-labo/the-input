'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TheInputStyle from './TheInputStyle'
import TheInputText from './TheInputText'
import TheInputTextArea from './TheInputTextArea'
import TheInputRadio from './TheInputRadio'
import TheInputCheckbox from './TheInputCheckbox'
import TheInputSelect from './TheInputSelect'
import TheInputPassword from './TheInputPassword'
import TheInputSearch from './TheInputSearch'
import TheInputToggle from './TheInputToggle'
import { renderErrorMessage } from './helpers'
import { htmlAttributesFor, eventHandlersFor } from 'the-component-util'

/**
 * Input of the-components
 */
class TheInput extends React.PureComponent {
  render () {
    const s = this
    const { props } = s
    let {
      id,
      className,
      children,
      type,
      name,
      required,
      value,
      error,
      placeholder,
      autoFocus,
      autoComplete,
      inputRef
    } = props
    return (
      <div { ...htmlAttributesFor(props, {
        except: [
          'id', 'className', 'type', 'value', 'required', 'name', 'placeholder', 'autoFocus', 'autoComplete'
        ]
      }) }
           { ...eventHandlersFor(props, { except: [] })}
           className={ classnames('the-input', className, {
             'the-input-error': !!error
           }) }
      >
        { renderErrorMessage(error) }

        <input type='the-input-input'
               {...{ id, type, name, required, value, placeholder, autoFocus, autoComplete }}
               onChange={ (e) => s.handleChange(e) }
               ref={inputRef}
        />
        { children }
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
}

TheInput.Style = TheInputStyle
TheInput.Text = TheInputText
TheInput.Search = TheInputSearch
TheInput.Password = TheInputPassword
TheInput.TextArea = TheInputTextArea
TheInput.Radio = TheInputRadio
TheInput.Checkbox = TheInputCheckbox
TheInput.Select = TheInputSelect
TheInput.Toggle = TheInputToggle

TheInput.propTypes = {
  /** Input type */
  type: PropTypes.string,
  /** Name of input */
  name: PropTypes.string,
  /** Value of input */
  value: PropTypes.string,
  /** Handle for update */
  onUpdate: PropTypes.func,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

TheInput.defaultProps = {
  type: 'text',
  value: '',
  name: '_the',
  error: null,
  options: {}
}

TheInput.displayName = 'TheInput'

export default TheInput
