'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
import PropTypes from 'prop-types'
import c from 'classnames'
import {TheCondition} from 'the-condition'
import { htmlAttributesFor, eventHandlersFor } from 'the-component-util'
import { get } from 'the-window'
import rangecal from 'rangecal'
import chopcal from 'chopcal'
import { normalizeOptions, renderErrorMessage } from './helpers'

/**
 * Range Input
 */
class TheInputRange extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      fromX: 0,
      toX: 0,
      minX: 0,
      maxX: 0
    }
    this.elm = null
    this.barElm = null
    this.fromHandleElm = null
    this.toHandleElm = null

    const methodsToBind = [
      'handleResize',
      'handleBarClick',
      'handleFromHandleMove',
      'handleToHandleMove'
    ]
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
      fromX,
      toX,
      minX,
      maxX
    } = state
    const {from, to} = value
    return (
      <div {...htmlAttributesFor(props, {except: ['id', 'className', 'type', 'value', 'name', 'placeholder']})}
           {...eventHandlersFor(props, {except: []})}
           className={c('the-input-range', className, {
             'the-input-error': !!error
           })}
           data-value-from={from}
           data-value-to={to}
           ref={(elm) => {
             this.elm = elm
             this.handleResize()
           }}
      >
        {renderErrorMessage(error)}
        <input type='hidden' name={`${name}[from]`} value={from} onChange={(v) => {}}/>
        <input type='hidden' name={`${name}[to]`} value={to} onChange={(v) => {}}/>
        <div className='the-input-range-inner'>
          <TheCondition unless={barOnly}>
            <TheInputRange.Label>{min}</TheInputRange.Label>
          </TheCondition>
          <div className='the-input-range-bar-wrap'>
            <div className='the-input-range-bar'
                 ref={(barElm) => {
                   this.barElm = barElm
                   this.handleResize()
                 }}
                 onClick={(e) => this.handleBarClick(e)}
            >
              <div className='the-input-range-bar-tap'>
              </div>
              <div className='the-input-range-bar-bg'>
              </div>
              <div className='the-input-range-bar-highlight' style={{left: fromX, width: toX - fromX}}>
              </div>
            </div>
            <TheInputRange.Handle {...{x: fromX, minX, maxX}}
                                  elmRef={(fromHandleElm) => {
                                    this.fromHandleElm = fromHandleElm
                                    this.handleResize()
                                  }}
                                  onMove={(e) => this.handleFromHandleMove(e)}
            />
            <TheInputRange.Handle {...{x: toX, minX, maxX}}
                                  elmRef={(toHandleElm) => {
                                    this.toHandleElm = toHandleElm
                                    this.handleResize()
                                  }}
                                  onMove={(e) => this.handleToHandleMove(e)}
            />
          </div>
          <TheCondition unless={barOnly}>
            <TheInputRange.Label>{max}</TheInputRange.Label>
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
    const {barElm, props} = this
    if (!barElm) {
      return
    }
    const w = barElm.offsetWidth
    const handleRadius = this.getHandleRadius()
    const minX = 0 - handleRadius
    const maxX = w - handleRadius
    if (minX === maxX) {
      return
    }
    const [from, to] = props.value
    const fromRate = this._rateWithValue(from)
    const toRate = this._rateWithValue(to)
    this.setState({
      minX: minX,
      maxX: maxX,
      fromX: rangecal.value(minX, maxX, fromRate),
      toX: rangecal.value(minX, maxX, toRate)
    })
  }

  getHandleRadius () {
    const {fromHandleElm} = this
    if (!fromHandleElm) {
      return 0
    }
    return fromHandleElm.offsetWidth / 2
  }

  handleBarClick (e) {
    const s = this
    const {barElm, state} = s
    if (!barElm) {
      return
    }
    const handleRadius = s.getHandleRadius()
    const {fromX, toX} = state
    const {left} = barElm.getBoundingClientRect()
    const x = e.clientX - left - handleRadius
    const xWithFromX = Math.abs(x - fromX)
    const xWithToX = Math.abs(x - toX)
    const rate = s._rateWithX(x)
    const value = s._valueWithRate(rate)
    const [from, to] = s.props.value
    if (xWithFromX > xWithToX) {
      s.setState({toX: x})
      s.setRangeValue(from, value)
    } else {
      s.setState({fromX: x})
      s.setRangeValue(value, to)
    }

  }

  handleFromHandleMove ({x}) {
    const s = this
    const rate = s._rateWithX(x)
    const from = s._valueWithRate(rate)
    const [, to] = s.props.value
    s.setRangeValue(from, to)
  }

  handleToHandleMove ({x}) {
    const s = this
    const rate = s._rateWithX(x)
    const to = s._valueWithRate(rate)
    const [from] = s.props.value
    s.setRangeValue(from, to)
  }

  setRangeValue (from, to) {
    const s = this
    const {state, props} = s
    const {minX, maxX} = state
    if (minX === maxX) {
      return
    }
    const {step, name} = props
    const [currentFrom, currentTo] = props.value
    if (to < from) {
      if (from === currentFrom) {
        from = to - step
      } else if (to === currentFrom.to) {
        to = from + step
      } else {
        to = from = (to + from) / 2
        to += step
        from -= step
      }
    }
    const duplicate = (currentFrom === from) && (currentTo === to)
    if (duplicate) {
      return
    }

    const fromRate = s._rateWithValue(from)
    const toRate = s._rateWithValue(to)
    s.setState({
      fromX: rangecal.value(minX, maxX, fromRate),
      toX: rangecal.value(minX, maxX, toRate)
    })

    from = chopcal.round(from, step)
    to = chopcal.round(to, step)

    const notChanged = (s._from === from) && (s._to === to)
    if (notChanged) {
      return
    }

    s._from = from
    s._to = to

    if (props.onUpdate) {
      props.onUpdate({[name]: [from, to]})
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
             className={c('the-input-range-label', className)}>
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
        <div className='the-input-range-handle'
             ref={elmRef}
             data-min-x={minX}
             data-max-x={maxX}
        >
          <div className='the-input-range-handle-area'>
          </div>
          <div className='the-input-range-handle-icon'>
          </div>
        </div>
      </Draggable>
    )
  }
}

TheInputRange.propTypes = {
  /** Name of input */
  name: PropTypes.string.isRequired,
  /** Value of input */
  value: PropTypes.arrayOf(PropTypes.number),
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

TheInputRange.defaultProps = {
  value: [0, 100],
  error: null,
  min: 0,
  max: 100,
  step: 0.1,
  barOnly: false
}

TheInputRange.displayName = 'TheInputRange'

export default TheInputRange