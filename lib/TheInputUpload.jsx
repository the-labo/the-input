'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor, newId } from 'the-component-util'
import { TheCondition } from 'the-condition'
import { TheIcon } from 'the-icon'
import { TheSpin } from 'the-spin'
import { isImageUrl, normalizeArrayValue, readFile, renderErrorMessage } from './helpers'

class TheInputUpload extends React.PureComponent {
  constructor (props) {
    super(props)
    this.id = newId()
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.state = {
      error: null,
      spinning: false,
      urls: [].concat(props.value).filter(Boolean),
    }
  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
    const {props} = this
    const {value} = nextProps
    const hasValue = value && value.length > 0
    if (hasValue && (props.value !== value)) {
      this.setState({urls: [].concat(value)})
    }
  }

  componentWillUnmount () {
    this.gone = true
  }

  handleChange (e) {
    const {props} = this
    const {target} = e
    const {multiple, name, onChange, onError, onLoad, onUpdate} = props
    if (target.files.length === 0) {
      return
    }
    this.setState({spinning: true})
    onChange && onChange(e)
    ;(async () => {
      try {
        const urls = await Promise.all(
          [...target.files].map(readFile)
        )
        if (this.gone) {
          return
        }
        onLoad && onLoad({target, urls})
        onUpdate && onUpdate({[name]: multiple ? urls : urls[0]})
        this.setState({urls})
      } catch (error) {
        onError && onError(error)
        this.setState({error, spinning: false, urls: []})
      } finally {
        this.setState({spinning: false})
      }
    })()
  }

  handleRemove () {
    const {props} = this
    const {onLoad} = props
    const urls = []
    this.setState({
      error: null,
      urls,
    })
    onLoad && onLoad(urls)
  }

  render () {
    const {props, state} = this
    const {
      accept,
      children,
      className,
      error,
      height,
      id = this.id,
      multiple,
      name,
      text,
      value,
      width,
    } = props
    const {
      spinning,
      urls,
    } = state

    return (
      <div {...htmlAttributesFor(props, {except: ['id', 'className']})}
           {...eventHandlersFor(props, {except: []})}
           className={c('the-input-upload', className, {
             'the-input-error': !!error,
           })}
           data-value={value}
           id={id}
      >
        {renderErrorMessage(error)}
        <input accept={accept}
               className={c('the-input-upload-input')}
               id={`${id}-file`}
               multiple={multiple}
               name={name}
               onChange={this.handleChange}
               style={{height, width}}
               type='file'
        />
        <label className='the-input-upload-label' htmlFor={`${id}-file`}>
          <span className='the-input-upload-aligner'>
          </span>
          <span className='the-input-upload-label-inner'>
            <i className={c('the-input-upload-icon', TheInputUpload.GUIDE_ICON)}/>
            <span className='the-input-upload-text'>{text}</span>
            {children}
          </span>
        </label>
        <TheCondition if={spinning}>
          <TheSpin className='the-input-upload-spin'
                   cover
                   enabled
          />
        </TheCondition>
        <TheCondition if={!!urls && urls.length > 0}>
          <div>
            <a className='the-input-upload-close'
               onClick={this.handleRemove}
            >
              <TheIcon className={c(TheInputUpload.CLOSE_ICON)}

              />
            </a>

            {
              (urls || [])
                .filter(Boolean)
                .filter((url) => isImageUrl(url))
                .map((url, i) => (
                  <div className={c('the-input-upload-preview')}
                       key={url}
                       style={{
                         height,
                         left: `${i * 10}%`,
                         top: `${i * 10}%`,
                         width,
                       }}>
                    <img src={url}
                         {...{height, width}}
                         className={c('the-input-upload-preview-img')}
                    />
                  </div>
                ))
            }
          </div>
        </TheCondition>


      </div>
    )
  }

}

TheInputUpload.GUIDE_ICON = 'fas fa-cloud-upload-alt'
TheInputUpload.CLOSE_ICON = 'fas fa-times'

TheInputUpload.propTypes = {
  /** Name of input */
  /** Accept file type */
  accept: PropTypes.string,
  /** Error message */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** Image height */
  height: PropTypes.number,
  /** Allow multiple upload */
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  /** Handler for error event */
  onError: PropTypes.func,
  /** Handler for load event */
  onLoad: PropTypes.func,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Spinner theme */
  spinner: PropTypes.string,
  /** Guide text */
  text: PropTypes.string,
  /** Value of input */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  /** Image width */
  width: PropTypes.number,
}

TheInputUpload.defaultProps = {
  accept: null,
  error: null,
  height: 180,
  multiple: false,
  text: 'Upload File',
  width: 180,
}

TheInputUpload.displayName = 'TheInputUpload'

export default TheInputUpload
