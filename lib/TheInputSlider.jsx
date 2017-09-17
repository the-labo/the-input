'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
import PropTypes from 'prop-types'
import c from 'classnames'
import TheCondition from 'the-condition'
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
    const s = this
    s.state = {
      x: 0,
      minX: 0,
      maxX: 0
    }
    s.elm = null
    s.barElm = null
    s.handleElm = null

    const methodsToBind = ['handleResize', 'handleBarClick', 'handleHandleMove']
    for (const methodName of methodsToBind) {
      s[methodName] = s[methodName].bind(s)
    }
  }

  render () {
    const s = this
    const {props, state} = s
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
             s.elm = elm
             s.handleResize()
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
                   s.barElm = barElm
                   s.handleResize()
                 }}
                 onClick={(e) => s.handleBarClick(e)}
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
                                     s.handleElm = handleElm
                                     s.handleResize()
                                   }}
                                   onMove={(e) => s.handleHandleMove(e)}
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
    const s = this
    const {window} = get('window')
    window.addEventListener('resize', s.handleResize)
    s.handleResize()
  }

  componentWillUnmount () {
    const s = this
    const {window} = get('window')
    window.removeEventListener('resize', s.handleResize)
  }

  handleResize () {
    const s = this
    const {barElm, props} = s
    if (!barElm) {
      return
    }
    const w = barElm.offsetWidth
    const handleRadius = s.getHandleRadius()
    const minX = 0 - handleRadius
    const maxX = w - handleRadius
    const rate = s._rateWithValue(props.value)
    s.setState({
      minX: minX,
      maxX: maxX,
      x: rangecal.value(minX, maxX, rate)
    })
  }

  getHandleRadius () {
    const s = this
    const {handleElm} = s
    if (!handleElm) {
      return 0
    }
    return handleElm.offsetWidth / 2
  }

  handleBarClick (e) {
    const s = this
    const {barElm} = s
    if (!barElm) {
      return
    }
    const handleRadius = s.getHandleRadius()
    const {left} = barElm.getBoundingClientRect()
    const x = e.clientX - left - handleRadius
    s.setState({x})
    const rate = s._rateWithX(x)
    const value = s._valueWithRate(rate)
    s.setSliderValue(value)
  }

  handleHandleMove ({x}) {
    const s = this
    const rate = s._rateWithX(x)
    const value = s._valueWithRate(rate)
    s.setSliderValue(value)
  }

  setSliderValue (value) {
    const s = this
    const {state, props} = s
    const {step, name, onUpdate} = props
    const duplicate = props.value === value
    if (duplicate) {
      return
    }
    const {minX, maxX} = state
    const rate = s._rateWithValue(value)
    s.setState({
      x: rangecal.value(minX, maxX, rate)
    })

    value = chopcal.round(value, step)

    if (s._value === value) {
      return
    }

    s._value = value

    if (onUpdate) {
      onUpdate({[name]: value})
    }
  }

  _rateWithX (x) {
    const s = this
    const {state} = s
    const {minX, maxX} = state
    if (minX === maxX) {
      return 0
    }
    return rangecal.rate(minX, maxX, x + 2)
  }

  _rateWithValue (value) {
    const s = this
    const {props} = s
    const {min, max} = props

    value = rangecal.round(min, max, value)
    return chopcal.round(rangecal.rate(min, max, value), 0.01)
  }

  _valueWithRate (rate) {
    const s = this
    const {props} = s
    const {min, max} = props

    let value = chopcal.round(rangecal.value(min, max, rate), 0.01)
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