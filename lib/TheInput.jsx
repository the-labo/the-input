'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from 'the-component-util'
import { renderErrorMessage } from './helpers'
import TheInputCheckbox from './TheInputCheckbox'
import TheInputPassword from './TheInputPassword'
import TheInputRadio from './TheInputRadio'
import TheInputRange from './TheInputRange'
import TheInputSearch from './TheInputSearch'
import TheInputSelect from './TheInputSelect'
import TheInputSlider from './TheInputSlider'
import TheInputStyle from './TheInputStyle'
import TheInputTag from './TheInputTag'
import TheInputText from './TheInputText'
import TheInputTextArea from './TheInputTextArea'
import TheInputToggle from './TheInputToggle'
import TheInputUpload from './TheInputUpload'

/**
 * Input of the-components
 */
class TheInput extends React.PureComponent {
  handleChange (e) {
    const s = this
    const {onChange, onUpdate, parser} = s.props
    const {name, value} = e.target
    onChange && onChange(e)
    onUpdate && onUpdate({[name]: parser(value)})
  }

  render () {
    const {props} = this
    let {
      autoComplete,
      autoFocus,
      children,
      className,
      error,
      id,
      inputRef,
      name,
      placeholder,
      required,
      type,
      value,
    } = props
    return (
      <div {...htmlAttributesFor(props, {
        except: [
          'id', 'className', 'type', 'value', 'required', 'name', 'placeholder', 'autoFocus', 'autoComplete'
        ],
      })}
           {...eventHandlersFor(props, {except: []})}
           className={c('the-input', className, {
             'the-input-error': !!error,
           })}
      >
        {renderErrorMessage(error)}
        {children}
        <input type='the-input-input'
               {...{autoComplete, autoFocus, id, name, placeholder, required, type}}
               onChange={(e) => this.handleChange(e)}
               ref={inputRef}
               value={value || ''}
        />
      </div>
    )
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
TheInput.Slider = TheInputSlider
TheInput.Range = TheInputRange
TheInput.Upload = TheInputUpload
TheInput.Tag = TheInputTag

TheInput.propTypes = {
  /** Input type */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** Name of input */
  name: PropTypes.string,
  /** Handle for update */
  onUpdate: PropTypes.func,
  type: PropTypes.string,
  /** Value of input */
  value: PropTypes.string,
}

TheInput.defaultProps = {
  error: null,
  name: '_the',
  options: {},
  type: 'text',
  value: '',
}

TheInput.displayName = 'TheInput'

export default TheInput
