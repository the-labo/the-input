'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TheStyle from 'the-style'
import { colorAlpha, asStyleData } from 'the-component-util'

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
    hoverOpacity = ThemeValues.hoverOpacity,
    activeOpacity = ThemeValues.activeOpacity,
    errorColor = ThemeValues.errorColor,
    toggleHandleSize = 24,
    animationDuration = 400
  } = options

  const ToggleIconStyle = (values) => Object.assign({
    position: 'absolute',
    right: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    zIndex: 4,
    padding: '0 4px',
    minWidth: '1em',
    outlineColor: colorAlpha(dominantColor, 0.2),
    cursor: 'pointer',
    '&:hover': { opacity: hoverOpacity },
    '&:active': { opacity: activeOpacity }
  }, values)

  return Object.assign({},
    asStyleData('.the-input', {
      '&': {}
    }),
    asStyleData('.the-input-text', {
      '&': {
        display: 'inline-block',
        maxWidth: contentWidth,
        margin: '0 4px',
        verticalAlign: 'middle',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative'
      },
      '.the-input-text-input': {
        display: 'block',
        outlineColor: dominantColor,
        minHeight: '28px',
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
        zIndex: 8,
        border: `1px solid ${lightBorderColor}`,
        boxShadow: '2px 2px 4px rgba(0,0,0,0.33)',
        boxSizing: 'border-box',
        borderRadius: '0 0 2px 2px',
        backgroundColor
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
          backgroundColor: colorAlpha(dominantColor, 0.2)
        }
      }
    }),
    asStyleData('.the-input-password', {
      position: 'relative',
      '.the-input-password-toggle': ToggleIconStyle()
    }),
    asStyleData('.the-input-search', {
      position: 'relative',
      '&': {
        transition: `max-width ${animationDuration}ms`,
        maxWidth: '2em'
      },
      '&.the-input-search-open': {
        maxWidth: contentWidth,
        '.the-input-text-input': {
          opacity: 1
        },
        '.the-input-search-toggle': {
          padding: '0 4px'
        }
      },
      '.the-input-search-toggle': ToggleIconStyle({
        color: dominantColor,
        outline: 'none',
        padding: '0 8px',
        transition: `opacity ${animationDuration}ms`
      }),
      '.the-input-text-input': {
        opacity: 0,
        transition: `opacity ${animationDuration}ms`
      }
    }),
    asStyleData('.the-input-textarea', {
      '&': {
        display: 'inline-block',
        maxWidth: contentWidth,
        verticalAlign: 'middle',
        width: '100%',
        margin: '0 4px',
        boxSizing: 'border-box',
        position: 'relative'
      },
      '.the-input-textarea-input': {
        display: 'block',
        outlineColor: dominantColor,
        boxShadow: `1px 1px 1px ${inputShadowColor} inset`,
        boxSizing: 'border-box',
        padding: '4px 8px',
        borderRadius: '2px',
        width: '100%',
        border: `1px solid ${inputBorderColor}`,
        resize: 'none'
      }
    }),
    asStyleData('.the-input-radio', {
      '&': {
        display: 'inline-block',
        maxWidth: contentWidth,
        verticalAlign: 'middle',
        width: '100%',
        margin: '4px 0',
        borderRadius: '2px',
        boxSizing: 'border-box',
        position: 'relative'
      },
      '.the-input-radio-item': {
        display: 'inline-flex',
        justifyContent: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        boxSizing: 'border-box',
        alignItems: 'center',
        margin: '0 2px'
      },
      '.the-input-radio-label': {
        display: 'inline-block',
        padding: '2px 4px',
        cursor: 'pointer',
        '&:hover': { opacity: hoverOpacity },
        '&:active': { opacity: activeOpacity }
      },
      '.the-input-radio-radio': {
        opacity: 0,
        overflow: 'hidden',
        width: 1,
        height: 1,
        marginRight: -1,
        marginBottom: -1,
        visibility: 'hidden',
        zIndex: -1,
        position: 'absolute',
        left: 0,
        top: 0

      },
      '.the-input-radio-icon': {
        color: dominantColor
      }
    }),
    asStyleData('.the-input-checkbox', {
      '&': {
        display: 'inline-block',
        maxWidth: contentWidth,
        verticalAlign: 'middle',
        width: '100%',
        margin: '4px 0',
        borderRadius: '2px',
        boxSizing: 'border-box',
        position: 'relative'
      },
      '.the-input-checkbox-item': {
        display: 'inline-flex',
        justifyContent: 'flex-center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        boxSizing: 'border-box',
        alignItems: 'center',
        margin: '0 2px'
      },
      '.the-input-checkbox-label': {
        display: 'inline-block',
        padding: '2px 4px',
        cursor: 'pointer',
        '&:hover': { opacity: hoverOpacity },
        '&:active': { opacity: activeOpacity }
      },
      '.the-input-checkbox-checkbox': {
        opacity: 0,
        overflow: 'hidden',
        width: 1,
        height: 1,
        marginRight: -1,
        marginBottom: -1,
        visibility: 'hidden',
        zIndex: -1,
        position: 'absolute',
        left: 0,
        top: 0

      },
      '.the-input-checkbox-icon': {
        color: dominantColor,
        minWidth: '1em'
      }
    }),
    asStyleData('.the-input-toggle', {
      '&': {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
      },
      '.the-input-toggle-radio': {
        display: 'none'
      },
      '.the-input-toggle-label': {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        textAlign: 'center',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        padding: 0,
        flexGrow: 1,
        flexShrink: 1,
        cursor: 'pointer',
        transition: `width ${animationDuration}ms`,
        lineHeight: `${toggleHandleSize}px`
      },
      '.the-input-toggle-label-text': {
        display: 'inline-block',
        width: '100%',
        padding: '0 8px',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: toggleHandleSize * 1.5
      },
      '.the-input-toggle-on-label': {
        background: dominantColor,
        color: 'white',
        borderRadius: `${toggleHandleSize / 2}px 0 0 ${toggleHandleSize / 2}px`,
        marginRight: -1 * toggleHandleSize / 2
      },
      '.the-input-toggle-off-label': {
        background: '#FAFAFA',
        color: '#AAA',
        borderRadius: `0 ${toggleHandleSize / 2}px ${toggleHandleSize / 2}px 0`,
        marginLeft: -1 * toggleHandleSize / 2
      },
      '&.the-input-toggle-on .the-input-toggle-off-label': {
        width: `${toggleHandleSize / 2 + 2}px !important`
      },
      '&.the-input-toggle-off .the-input-toggle-on-label': {
        width: `${toggleHandleSize / 2 + 2}px !important`
      },
      '.the-input-toggle-inner': {
        display: 'inline-flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        height: toggleHandleSize,
        borderRadius: (toggleHandleSize / 2 + 1),
        minWidth: toggleHandleSize * 3 + 2,
        border: `1px solid ${inputBorderColor}`,
        overflow: 'hidden',
        width: '100%'
      },
      '.the-input-toggle-handle': {
        display: 'inline-block',
        borderRadius: '50%',
        width: toggleHandleSize,
        height: toggleHandleSize,
        backgroundColor: 'white',
        border: `1px solid ${inputBorderColor}`,
        flexGrow: 0,
        flexShrink: 0,
        position: 'relative',
        zIndex: 4
      }

    }),
    asStyleData('.the-input-select', {
      '&': {
        display: 'inline-block',
        maxWidth: contentWidth,
        verticalAlign: 'middle',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative'
      },
      '.the-input-select-display': {
        verticalAlign: 'middle',
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 2px 4px 8px',
        color: 'inherit',
        fontSize: 'smaller',
        minHeight: '28px',
        maxWidth: contentWidth,
        width: '100%',
        cursor: 'pointer',
        backgroundColor,
        boxSizing: 'border-box',
        borderRadius: '2px',
        border: `1px solid ${inputBorderColor}`,
        justifyContent: 'space-between',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      '.the-input-select-options': {
        padding: 0,
        margin: '-1px 0 0',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        listStyle: 'none',
        zIndex: 8,
        border: `1px solid ${lightBorderColor}`,
        boxShadow: '2px 2px 4px rgba(0,0,0,0.33)',
        boxSizing: 'border-box',
        borderRadius: '0 0 2px 2px',
        backgroundColor
      },
      '.the-input-select-option': {
        display: 'flex',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        cursor: 'pointer',
        minHeight: tappableHeight,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: backgroundColor,
        borderBottom: `1px solid ${lightBorderColor}`,
        padding: `${contentPadding}px ${contentPadding * 2}px`,
        boxSizing: 'border-box',
        '&:last-child': {
          borderBottom: 'none'
        },
        '&:hover': {
          backgroundColor: colorAlpha(dominantColor, 0.1)
        },
        '&.the-input-select-option-selected': {
          backgroundColor: colorAlpha(dominantColor, 0.2)
        }
      },
      '.the-input-select-select,.the-input-select-input': {
        opacity: '0',
        zIndex: '-99',
        position: 'absolute',
        display: 'block',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }
    }),
    asStyleData('.the-input-error', {
      '.the-input-text-input,.the-input-textarea-input': {
        borderColor: errorColor
      },
      '.the-input-select-display': {
        borderColor: errorColor
      },
      '&.the-input-radio,&.the-input-checkbox': {
        border: `1px solid ${errorColor}`
      },
      '.the-input-error-message': {
        color: errorColor,
        display: 'block',
        fontSize: 'small',
        padding: '4px 4px 0',
        margin: '0 0 -2px',
        fontStyle: 'italic'
      }
    })
  )
}

export default TheInputStyle
