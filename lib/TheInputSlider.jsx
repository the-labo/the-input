'use strict'

import React from 'react'
import Draggable from 'react-draggable'
import PropTypes from 'prop-types'
import c from 'classnames'
import { TheCondition } from 'the-condition'
import { htmlAttributesFor, eventHandlersFor } from 'the-component-util'
import { get } from 'the-window'
import rangecal from 'rangecal'
import chopcal from 'chopcal'
import { normalizeOptions, renderErrorMessage } from './helpers'

/**
 * Slider Input
 */
class TheInputSlider extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      x: 0,
      minX: 0,
      maxX: 0
    }
    this.elm = null
    this.barElm = null
    this.handleElm = null

    const methodsToBind = ['handleResize', 'handleBarClick', 'handleHandleMove']
    for (const methodName of methodsToBind) {
      this[methodName] = this[methodName].bind(this)
    }
  }

  render () {
    const {props, state} = this
    const {
      className,
      name,
      value,
      error,
      barOnly,
      min,
      max
    } = props
    const {
      x,
      minX,
      maxX
    } = state
    return (
      <div {...htmlAttributesFor(props, {except: ['id', 'className', 'type', 'value', 'name', 'placeholder']})}
           {...eventHandlersFor(props, {except: []})}
           className={c('the-input-slider', className, {
             'the-input-error': !!error
           })}
           data-value={value}
           ref={(elm) => {
             this.elm = elm
             this.handleResize()
           }}
      >
        {renderErrorMessage(error)}
        <input type='hidden' name={name} value={value} onChange={(v) => {}}/>
        <div className='the-input-slider-inner'>
          <TheCondition unless={barOnly}>
            <TheInputSlider.Label>{min}</TheInputSlider.Label>
          </TheCondition>
          <div className='the-input-slider-bar-wrap'>
            <div className='the-input-slider-bar'
                 ref={(barElm) => {
                   this.barElm = barElm
                   this.handleResize()
                 }}
                 onClick={(e) => this.handleBarClick(e)}
            >
              <div className='the-input-slider-bar-tap'>
              </div>
              <div className='the-input-slider-bar-bg'>
              </div>
              <div className='the-input-slider-bar-highlight' style={{left: 0, width: x}}>
              </div>
            </div>
            <TheInputSlider.Handle {...{x, minX, maxX}}
                                   elmRef={(handleElm) => {
                                     this.handleElm = handleElm
                                     this.handleResize()
                                   }}
                                   onMove={(e) => this.handleHandleMove(e)}
            />
          </div>
          <TheCondition unless={barOnly}>
            <TheInputSlider.Label>{max}</TheInputSlider.Label>
          </TheCondition>
        </div>
      </div>
    )
  }

  componentDidMount () {
    const {window} = get('window')
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount () {
    const {window} = get('window')
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize () {
    const {barElm, props} = this
    if (!barElm) {
      return
    }
    const w = barElm.offsetWidth
    const handleRadius = this.getHandleRadius()
    const minX = 0 - handleRadius
    const maxX = w - handleRadius
    const rate = this._rateWithValue(props.value)
    this.setState({
      minX: minX,
      maxX: maxX,
      x: rangecal.value(minX, maxX, rate)
    })
  }

  getHandleRadius () {
    const {handleElm} = this
    if (!handleElm) {
      return 0
    }
    return handleElm.offsetWidth / 2
  }

  handleBarClick (e) {
    const {barElm} = this
    if (!barElm) {
      return
    }
    const handleRadius = this.getHandleRadius()
    const {left} = barElm.getBoundingClientRect()
    const x = e.clientX - left - handleRadius
    this.setState({x})
    const rate = this._rateWithX(x)
    const value = this._valueWithRate(rate)
    this.setSliderValue(value)
  }

  handleHandleMove ({x}) {
    const rate = this._rateWithX(x)
    const value = this._valueWithRate(rate)
    this.setSliderValue(value)
  }

  setSliderValue (value) {
    const {state, props} = this
    const {step, name, onUpdate} = props
    const duplicate = props.value === value
    if (duplicate) {
      return
    }
    const {minX, maxX} = state
    const rate = this._rateWithValue(value)
    this.setState({
      x: rangecal.value(minX, maxX, rate)
    })

    value = chopcal.round(value, step)

    if (this._value === value) {
      return
    }

    this._value = value

    if (onUpdate) {
      onUpdate({[name]: value})
    }
  }

  _rateWithX (x) {
    const {state} = this
    const {minX, maxX} = state
    if (minX === maxX) {
      return 0
    }
    return rangecal.rate(minX, maxX, x + 2)
  }

  _rateWithValue (value) {
    const {props} = this
    const {min, max} = props

    value = rangecal.round(min, max, value)
    return chopcal.round(rangecal.rate(min, max, value), 0.01)
  }

  _valueWithRate (rate) {
    const {props} = this
    const {min, max} = props

    const value = chopcal.round(rangecal.value(min, max, rate), 0.01)
    return rangecal.round(min, max, value)
  }

  static Label ({className, children, ref}) {
    return (
      <label ref={ref}
             className={c('the-input-slider-label', className)}>
        <span>{children}</span>
      </label>
    )
  }

  static Handle (props) {
    const {
      step,
      x,
      minX,
      maxX,
      elmRef,
      onMove,
      shouldMove = true
    } = props
    return (
      <Draggable axis='x'
                 grid={step && [step, step]}
                 position={{x, y: 0}}
                 onStart={(e, {x, y}) => shouldMove && onMove({x, y})}
                 onDrag={(e, {x, y}) => shouldMove && onMove({x, y})}
                 onStop={(e, {x, y}) => shouldMove && onMove({x, y})}
                 bounds={{left: minX, right: maxX}}
      >
        <div className='the-input-slider-handle'
             ref={elmRef}
             data-min-x={minX}
             data-max-x={maxX}
        >
          <div className='the-input-slider-handle-area'>
          </div>
          <div className='the-input-slider-handle-icon'>
          </div>
        </div>
      </Draggable>
    )
  }
}

TheInputSlider.propTypes = {
  /** Name of input */
  name: PropTypes.string.isRequired,
  /** Value of input */
  value: PropTypes.number,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Input error */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** Min value */
  min: PropTypes.number,
  /** Max value */
  max: PropTypes.number,
  /** Value step */
  step: PropTypes.number,
  /** Hides min/max value text */
  barOnly: PropTypes.bool
}

TheInputSlider.defaultProps = {
  value: 0,
  error: null,
  min: 0,
  max: 100,
  step: 0.1,
  barOnly: false
}

TheInputSlider.displayName = 'TheInputSlider'

export default TheInputSlider