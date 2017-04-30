'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TheStyle from 'the-style'
import { asStyleData } from 'the-component-util'

/** Style for TheInput */
const TheInputStyle = ({ id, className, options }) => (
  <TheStyle { ...{ id } }
            className={ classnames('the-input-style', className) }
            styles={ TheInputStyle.data(options) }
  />
)

TheInputStyle.displayName = 'TheInputStyle'
TheInputStyle.propTypes = {
  /** Style options */
  options: PropTypes.object
}

TheInputStyle.defaultProps = {
  options: {}
}

TheInputStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  let {
    dominantColor = ThemeValues.dominantColor,
    contentWidth = ThemeValues.contentWidth,
    inputBorderColor = ThemeValues.inputBorderColor,
    inputShadowColor = ThemeValues.inputShadowColor,
    tappableHeight = ThemeValues.tappableHeight,
    lightBorderColor = ThemeValues.lightBorderColor,
    backgroundColor = ThemeValues.backgroundColor,
    contentPadding = ThemeValues.contentPadding,
  } = options
  return Object.assign({},
    asStyleData('.the-input', {
      '&': {}
    }),
    asStyleData('.the-input-text', {
      '&': {
        display: 'inline-block',
        maxWidth: contentWidth,
        verticalAlign: 'middle',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative'
      },
      '.the-input-text-input': {
        display: 'block',
        outlineColor: dominantColor,
        boxShadow: `1px 1px 1px ${inputShadowColor} inset`,
        boxSizing: 'border-box',
        padding: '4px 8px',
        borderRadius: '2px',
        width: '100%',
        border: `1px solid ${inputBorderColor}`
      },
      '.the-input-text-options': {
        padding: 0,
        margin: '-1px 0 0',
        position: 'absolute',
        left: 0,
        right: 0,
        listStyle: 'none',
        border: `1px solid ${lightBorderColor}`,
        boxShadow: '2px 2px 4px rgba(0,0,0,0.33)',
        boxSizing: 'border-box',
        borderRadius: '0 0 2px 2px'
      },
      '.the-input-text-option': {
        display: 'flex',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        cursor: 'pointer',
        minHeight: tappableHeight,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: backgroundColor,
        borderBottom: `1px solid ${lightBorderColor}`,
        padding: contentPadding,
        boxSizing: 'border-box',
        '&:last-child': {
          borderBottom: 'none'
        },
        '&.the-input-text-option-selected': {
          backgroundColor: dominantColor
        }
      }
    })
  )
}

export default TheInputStyle
