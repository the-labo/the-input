'use strict'

import chopcal from 'chopcal'
import c from 'classnames'
import PropTypes from 'prop-types'
import rangecal from 'rangecal'
import React from 'react'
import Draggable from 'react-draggable'
import { eventHandlersFor, htmlAttributesFor } from 'the-component-util'
import { TheCondition } from 'the-condition'
import { get } from 'the-window'
import { renderErrorMessage } from './helpers'

/**
 * Slider Input
 */
class TheInputSlider extends React.PureComponent {
  static Handle(props) {
    const { elmRef, maxX, minX, onMove, shouldMove = true, step, x } = props
    return (
      <Draggable
        axis='x'
        bounds={{ left: minX, right: maxX }}
        grid={step && [step, step]}
        onDrag={(e, { x, y }) => shouldMove && onMove({ x, y })}
        onStart={(e, { x, y }) => shouldMove && onMove({ x, y })}
        onStop={(e, { x, y }) => shouldMove && onMove({ x, y })}
        position={{ x, y: 0 }}
      >
        <div
          className='the-input-slider-handle'
          data-max-x={maxX}
          data-min-x={minX}
          ref={elmRef}
        >
          <div className='the-input-slider-handle-area' />
          <div className='the-input-slider-handle-icon' />
        </div>
      </Draggable>
    )
  }

  static Label({ children, className, ref }) {
    return (
      <label className={c('the-input-slider-label', className)} ref={ref}>
        <span>{children}</span>
      </label>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      maxX: 0,
      minX: 0,
      x: 0,
    }
    this.elm = null
    this.barElm = null
    this.handleElm = null

    const methodsToBind = ['handleResize', 'handleBarClick', 'handleHandleMove']
    for (const methodName of methodsToBind) {
      this[methodName] = this[methodName].bind(this)
    }
  }

  componentDidMount() {
    const { window } = get('window')
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    const { window } = get('window')
    window.removeEventListener('resize', this.handleResize)
  }

  getHandleRadius() {
    const { handleElm } = this
    if (!handleElm) {
      return 0
    }
    return handleElm.offsetWidth / 2
  }

  handleBarClick(e) {
    const { barElm } = this
    if (!barElm) {
      return
    }
    const handleRadius = this.getHandleRadius()
    const { left } = barElm.getBoundingClientRect()
    const x = e.clientX - left - handleRadius
    this.setState({ x })
    const rate = this._rateWithX(x)
    const value = this._valueWithRate(rate)
    this.setSliderValue(value)
  }

  handleHandleMove({ x }) {
    const rate = this._rateWithX(x)
    const value = this._valueWithRate(rate)
    this.setSliderValue(value)
  }

  handleResize() {
    const { barElm, props } = this
    if (!barElm) {
      return
    }
    const w = barElm.offsetWidth
    const handleRadius = this.getHandleRadius()
    const minX = 0 - handleRadius
    const maxX = w - handleRadius
    const rate = this._rateWithValue(props.value)
    this.setState({
      maxX,
      minX,
      x: rangecal.value(minX, maxX, rate),
    })
  }

  render() {
    const { props, state } = this
    const { barOnly, className, error, max, min, name, value } = props
    const { maxX, minX, x } = state
    return (
      <div
        {...htmlAttributesFor(props, {
          except: ['id', 'className', 'type', 'value', 'name', 'placeholder'],
        })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-input-slider', className, {
          'the-input-error': !!error,
        })}
        data-value={value}
        ref={(elm) => {
          this.elm = elm
          this.handleResize()
        }}
      >
        {renderErrorMessage(error)}
        <input name={name} onChange={() => {}} type='hidden' value={value} />
        <div className='the-input-slider-inner'>
          <TheCondition unless={barOnly}>
            <TheInputSlider.Label>{min}</TheInputSlider.Label>
          </TheCondition>
          <div className='the-input-slider-bar-wrap'>
            <div
              className='the-input-slider-bar'
              onClick={(e) => this.handleBarClick(e)}
              ref={(barElm) => {
                this.barElm = barElm
                this.handleResize()
              }}
            >
              <div className='the-input-slider-bar-tap' />
              <div className='the-input-slider-bar-bg' />
              <div
                className='the-input-slider-bar-highlight'
                style={{ left: 0, width: x }}
              />
            </div>
            <TheInputSlider.Handle
              {...{ maxX, minX, x }}
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

  setSliderValue(value) {
    const { props, state } = this
    const { name, onUpdate, step } = props
    const duplicate = props.value === value
    if (duplicate) {
      return
    }
    const { maxX, minX } = state
    const rate = this._rateWithValue(value)
    this.setState({
      x: rangecal.value(minX, maxX, rate),
    })

    value = chopcal.round(value, step)

    if (this._value === value) {
      return
    }

    this._value = value

    if (onUpdate) {
      onUpdate({ [name]: value })
    }
  }

  _rateWithValue(value) {
    const { props } = this
    const { max, min } = props

    value = rangecal.round(min, max, value)
    return chopcal.round(rangecal.rate(min, max, value), 0.01)
  }

  _rateWithX(x) {
    const { state } = this
    const { maxX, minX } = state
    if (minX === maxX) {
      return 0
    }
    return rangecal.rate(minX, maxX, x + 2)
  }

  _valueWithRate(rate) {
    const { props } = this
    const { max, min } = props

    const value = chopcal.round(rangecal.value(min, max, rate), 0.01)
    return rangecal.round(min, max, value)
  }
}

TheInputSlider.propTypes = {
  /** Name of input */
  /** Hides min/max value text */
  barOnly: PropTypes.bool,
  /** Input error */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Max value */
  max: PropTypes.number,
  /** Min value */
  min: PropTypes.number,
  name: PropTypes.string.isRequired,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Value step */
  step: PropTypes.number,
  /** Value of input */
  value: PropTypes.number,
}

TheInputSlider.defaultProps = {
  barOnly: false,
  error: null,
  max: 100,
  min: 0,
  step: 0.1,
  value: 0,
}

TheInputSlider.displayName = 'TheInputSlider'

export default TheInputSlider
