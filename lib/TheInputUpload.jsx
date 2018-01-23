'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { htmlAttributesFor, eventHandlersFor, newId } from 'the-component-util'
import { TheIcon } from 'the-icon'
import { TheSpin } from 'the-spin'
import { TheCondition } from 'the-condition'
import { readFile, isImageUrl, normalizeArrayValue, renderErrorMessage } from './helpers'

class TheInputUpload extends React.PureComponent {
  constructor (props) {
    super(props)
    this.id = newId()
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.state = {
      spinning: false,
      error: null,
      urls: [].concat(props.value).filter(Boolean)
    }
  }

  render () {
    const {props, state} = this
    const {
      className,
      multiple,
      name,
      value,
      id = this.id,
      error,
      accept,
      text,
      width,
      height,
      children
    } = props
    const {
      spinning,
      urls
    } = state

    return (
      <div {...htmlAttributesFor(props, {except: ['id', 'className']})}
           {...eventHandlersFor(props, {except: []})}
           className={c('the-input-upload', className, {
             'the-input-error': !!error
           })}
           data-value={value}
           id={id}
      >
        {renderErrorMessage(error)}
        <input type='file'
               className={c('the-input-upload-input')}
               multiple={multiple}
               name={name}
               id={`${id}-file`}
               accept={accept}
               onChange={this.handleChange}
               style={{width, height}}
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
                   enabled
                   cover
          />
        </TheCondition>
        <TheCondition if={!!urls && urls.length > 0}>
          <div>
            <a onClick={this.handleRemove}
               className={'the-input-upload-close'}
            >
              <TheIcon className={c(TheInputUpload.CLOSE_ICON)}

              />
            </a>

            {
              (urls || [])
                .filter((url) => isImageUrl(url))
                .map((url, i) => (
                  <div className={c('the-input-upload-preview')}
                       key={url}
                       style={{
                         width,
                         height,
                         left: `${i * 10}%`,
                         top: `${i * 10}%`
                       }}>
                    <img src={url}
                         {...{width, height}}
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
    const {onChange, onError, onLoad, onUpdate, name, multiple,} = props
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
        onLoad && onLoad({urls, target})
        onUpdate && onUpdate({[name]: multiple ? urls : urls[0]})
        this.setState({urls})
      } catch (error) {
        onError && onError(error)
        this.setState({spinning: false, error, urls: []})
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
      urls
    })
    onLoad && onLoad(urls)
  }

}

TheInputUpload.GUIDE_ICON = 'fa fa-cloud-upload'
TheInputUpload.CLOSE_ICON = 'fa fa-close'

TheInputUpload.propTypes = {
  /** Name of input */
  name: PropTypes.string.isRequired,
  /** Allow multiple upload */
  multiple: PropTypes.bool,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Error message */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** Handler for load event */
  onLoad: PropTypes.func,
  /** Handler for error event */
  onError: PropTypes.func,
  /** Image width */
  width: PropTypes.number,
  /** Image height */
  height: PropTypes.number,
  /** Guide text */
  text: PropTypes.string,
  /** Accept file type */
  accept: PropTypes.string,
  /** Spinner theme */
  spinner: PropTypes.string,
  /** Value of input */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
}

TheInputUpload.defaultProps = {
  error: null,
  multiple: false,
  width: 180,
  height: 180,
  accept: null,
  text: 'Upload File'
}

TheInputUpload.displayName = 'TheInputUpload'

export default TheInputUpload