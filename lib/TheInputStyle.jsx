'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { TheStyle } from 'the-style'
import { colorAlpha, asStyleData } from 'the-component-util'

/** Style for TheInput */
const TheInputStyle = ({id, className, options}) => (
  <TheStyle {...{id}}
            className={c('the-input-style', className)}
            styles={TheInputStyle.data(options)}
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
  const {ThemeValues} = TheStyle
  const {
    dominantColor = ThemeValues.dominantColor,
    contentWidth = ThemeValues.contentWidth,
    inputBorderColor = ThemeValues.inputBorderColor,
    inputShadowColor = ThemeValues.inputShadowColor,
    tappableHeight = ThemeValues.tappableHeight,
    lightBorderColor = ThemeValues.lightBorderColor,
    lightTextColor = ThemeValues.lightTextColor,
    backgroundColor = ThemeValues.backgroundColor,
    contentPadding = ThemeValues.contentPadding,
    hoverOpacity = ThemeValues.hoverOpacity,
    activeOpacity = ThemeValues.activeOpacity,
    warnColor = ThemeValues.warnColor,
    errorColor = ThemeValues.errorColor,
    toggleHandleSize = 24,
    animationDuration = 400,
    offLabelBackgroundColor = '#FAFAFA',
    sliderPadding = 6,
    handlePaddingRate = -20,
    sliderHandleSize = 24,
    sliderBarHeight = 4
  } = options

  const ToggleIconStyle = (values) => Object.assign({
    position: 'absolute',
    right: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    height: '30px',
    zIndex: 4,
    padding: '0 4px',
    minWidth: '1em',
    outlineColor: colorAlpha(dominantColor, 0.2),
    cursor: 'pointer',
    '&:hover': {opacity: hoverOpacity},
    '&:active': {opacity: activeOpacity}
  }, values)

  return Object.assign({},
    asStyleData('.the-input', {
      '&': {}
    }),
    asStyleData('.the-input-message', {
      '&': {
        transition: 'max-height 300ms',
        display: 'block',
        fontSize: 'small',
        padding: '4px 4px 0',
        margin: '0 0 -2px',
        fontStyle: 'italic',
        overflow: 'hidden',
        maxHeight: '2em'
      },
      '&.the-input-message-empty': {
        maxHeight: '0em',
        padding: 0,
        margin: 0
      }
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
        top: '100%',
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
      '&': {
        position: 'relative',
      },
      '.the-input-password-toggle': ToggleIconStyle({
        textDecoration: 'none',
        color: 'inherit'
      })
    }),
    asStyleData('.the-input-search', {
      '&': {
        position: 'relative',
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
        '&:hover': {opacity: hoverOpacity},
        '&:active': {opacity: activeOpacity}
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
      },
      '&.the-input-asButton': {
        '.the-input-radio-icon': {
          display: 'none'
        },
        '.the-input-radio-item': {
          border: `1px solid #CCC`,
          borderRadius: '4px',
          padding: '4px 8px',
          textAlign: 'center',
          margin: '4px',
          background: backgroundColor,
          fontSize: 'smaller'
        },
        '.the-input-radio-item-checked': {
          border: `2px solid ${dominantColor}`
        }
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
        '&:hover': {opacity: hoverOpacity},
        '&:active': {opacity: activeOpacity}
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
        boxShadow: `2px 0 0 ${toggleHandleSize / 4}px ${dominantColor}`
      },
      '.the-input-toggle-off-label': {
        background: offLabelBackgroundColor,
        color: '#AAA',
        borderRadius: `0 ${toggleHandleSize / 2}px ${toggleHandleSize / 2}px 0`,
        boxShadow: `-2px 0 0 ${toggleHandleSize / 4}px ${offLabelBackgroundColor}`
      },
      '&.the-input-toggle-on .the-input-toggle-off-label': {
        width: `0 !important`
      },
      '&.the-input-toggle-off .the-input-toggle-on-label': {
        width: `0 !important`
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
      '.the-input-select-display-value': {},
      '.the-input-select-display-alt': {
        color: lightTextColor,
        display: 'block',
        width: '100%',
        textAlign: 'left'
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
    asStyleData('.the-input-warn', {
      '.the-input-text-input,.the-input-textarea-input': {
        borderColor: warnColor
      },
      '.the-input-select-display': {
        borderColor: warnColor
      },
      '&.the-input-radio,&.the-input-checkbox': {
        border: `1px solid ${warnColor}`
      },
      '.the-input-warn-message': {
        color: warnColor
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
        color: errorColor
      }
    }),
    asStyleData('.the-input-slider', {
      '&': {
        position: 'relative',
        height: `${sliderHandleSize + 2}px`,
      },
      '.the-input-slider-inner': {
        display: 'flex',
        margin: '2px 0'
      },
      '.the-input-slider-bar-wrap': {
        display: 'block',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box'
      },
      '.the-input-slider-bar': {
        position: 'absolute',
        left: 0,
        right: 0,
        height: `${sliderBarHeight + sliderPadding}px`,
        top: `${sliderHandleSize / 2 - sliderPadding}px`,
      },
      '.the-input-slider-bar-tap': {
        display: 'block',
        position: 'absolute',
        left: 0,
        right: 0,
        top: -8,
        bottom: -8,
        zIndex: 1
      },
      '.the-input-slider-bar-bg': {
        position: 'absolute',
        left: 0,
        top: `${sliderPadding}px`,
        right: 0,
        height: `${sliderBarHeight}px`,
        borderRadius: sliderBarHeight / 2,
        border: '1px solid #BBB',
        backgroundColor: '#CCC'
      },
      '.the-input-slider-bar-highlight': {
        backgroundColor: dominantColor,
        top: sliderPadding,
        position: 'absolute',
        height: sliderBarHeight,
        borderRadius: sliderBarHeight / 2,
        border: '1px solid rgba(0,0,0,0.1)',
        maxWidth: '100%'
      },
      '.the-input-slider-handle': {
        position: 'relative',
        display: 'inline-block',
        cursor: '-webkit-grab',
        borderRadius: '50%',
        zIndex: 4,
        '&:active': {
          cursor: '-webkit-grabbing',
          backgroundColor: '#FCFCFC'
        },
        '.the-input-slider-handle-area': {
          position: 'absolute',
          display: 'inline-block',
          color: 'transparent',
          opacity: 0,
          left: `${handlePaddingRate}%`,
          top: `${handlePaddingRate}%`,
          right: `${handlePaddingRate}%`,
          bottom: `${handlePaddingRate}%`
        },
        '.the-input-slider-handle-icon': {
          width: `${sliderHandleSize}px`,
          height: `${sliderHandleSize}px`,
          borderRadius: '50%',
          display: 'inline-block',
          backgroundColor: 'white',
          border: '1px solid #DDD',
          boxShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          position: 'relative',
          zIndex: 3,
          '&:hover': {
            boxShadow: '1px 1px 3px rgba(0,0,0,0.5)'
          },
          '.the-input-slider-label': {
            display: 'inline-block',
            padding: '2px 4px',
            textAlign: 'right',
            minWidth: '24px',
            fontSize: '14px',
            lineHeight: `${sliderHandleSize}px`,
            boxSizing: 'border-box'
          }
        },
      }
    }),
    asStyleData('.the-input-range', {
      '&': {
        position: 'relative',
        height: `${sliderHandleSize + 2}px`,
      },
      '.the-input-range-inner': {
        display: 'flex',
        margin: '2px 0'
      },
      '.the-input-range-bar-wrap': {
        display: 'block',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box'
      },
      '.the-input-range-bar': {
        position: 'absolute',
        left: 0,
        right: 0,
        height: `${sliderBarHeight + sliderPadding}px`,
        top: `${sliderHandleSize / 2 - sliderPadding}px`,
      },
      '.the-input-range-bar-tap': {
        display: 'block',
        position: 'absolute',
        left: 0,
        right: 0,
        top: -8,
        bottom: -8,
        zIndex: 1
      },
      '.the-input-range-bar-bg': {
        position: 'absolute',
        left: 0,
        top: `${sliderPadding}px`,
        right: 0,
        height: `${sliderBarHeight}px`,
        borderRadius: sliderBarHeight / 2,
        border: '1px solid #BBB',
        backgroundColor: '#CCC'
      },
      '.the-input-range-bar-highlight': {
        backgroundColor: dominantColor,
        top: sliderPadding,
        position: 'absolute',
        height: sliderBarHeight,
        borderRadius: sliderBarHeight / 2,
        border: '1px solid rgba(0,0,0,0.1)',
        maxWidth: '100%'
      },
      '.the-input-range-handle': {
        position: 'absolute',
        display: 'inline-block',
        left: 0,
        cursor: '-webkit-grab',
        borderRadius: '50%',
        zIndex: 4,
        '&:active': {
          cursor: '-webkit-grabbing',
          backgroundColor: '#FCFCFC',
          zIndex: 5
        },
        '.the-input-range-handle-area': {
          position: 'absolute',
          display: 'inline-block',
          color: 'transparent',
          opacity: 0,
          left: `${handlePaddingRate}%`,
          top: `${handlePaddingRate}%`,
          right: `${handlePaddingRate}%`,
          bottom: `${handlePaddingRate}%`
        },
        '.the-input-range-handle-icon': {
          width: `${sliderHandleSize}px`,
          height: `${sliderHandleSize}px`,
          borderRadius: '50%',
          display: 'inline-block',
          backgroundColor: 'white',
          border: '1px solid #DDD',
          boxShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          position: 'relative',
          zIndex: 3,
          '&:hover': {
            boxShadow: '1px 1px 3px rgba(0,0,0,0.5)'
          },
          '.the-input-range-label': {
            display: 'inline-block',
            padding: '2px 4px',
            textAlign: 'right',
            minWidth: '24px',
            fontSize: '14px',
            lineHeight: `${sliderHandleSize}px`,
            boxSizing: 'border-box'
          }
        },
      }
    }),
    asStyleData('.the-input-upload', {
      '&': {
        position: 'relative',
        display: 'inline-block',
        color: '#888',
        overflow: 'hidden',
        '&:hover': {
          color: '#555'
        },
        '&:active': {
          textShadow: 'none',
          opacity: 1,
          color: '#777'
        }
      },
      '.the-input-upload-input': {
        opacity: 0,
        display: 'inline-block',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 2
      },
      '.the-input-upload-label': {
        position: 'absolute',
        zIndex: 1,
        textAlign: 'center',
        boxSizing: 'border-box',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        backgroundColor: `${backgroundColor}`,
        boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.33)',
        border: '1px solid #CCC',
        borderRadius: '2px'
      },
      '.the-input-upload-label-inner': {
        display: 'inline-block',
        verticalAlign: 'middle'
      },
      '.the-input-upload-icon': {
        display: 'block',
        fontSize: '2em'
      },
      '.the-input-upload-aligner': {
        display: 'inline-block',
        width: '1px',
        marginRight: '-1px',
        height: '100%',
        boxSizing: 'border-box',
        verticalAlign: 'middle'
      },
      '.the-input-upload-text': {},
      '.the-input-upload-spin': {},
      '.the-input-upload-close': {
        display: 'inline-block',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 5,
        margin: 0,
        border: 'none',
        padding: '8px',
        fontSize: '24px',
        color: '#AAA',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: 0,
        '&:hover': {
          opacity: 1,
          boxShadow: 'none',
          color: '#555'
        },
        '&:active': {
          opacity: 1,
          boxShadow: 'none',
          color: '#555'
        }
      },
      '.the-input-upload-preview': {
        display: 'inline-block',
        boxSizing: 'border-box',
        zIndex: 4,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        border: '1px solid #AAA'
      },
      '.the-input-upload-preview-img': {},
    }),
    asStyleData('.the-input-tag', {
      '&': {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: backgroundColor,
        boxShadow: `1px 1px 1px ${inputShadowColor} inset`,
        border: `1px solid ${inputBorderColor}`,
        boxSizing: 'border-box',
        alignItems: 'center',
        padding: '4px',
        overflow: 'auto',
        justifyContent: 'flex-start'
      },
      '&.the-input-tag-focused': {
        outline: `5px auto ${dominantColor}`,
        outlineOffset: '-2px'
      },
      '.the-input-tag-tag': {
        display: 'inline-flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 2px',
        margin: '2px',
        fontSize: 'small',
        borderRadius: '2px',
        backgroundColor: colorAlpha(dominantColor, 0.2),
        color: dominantColor,
        position: 'relative',
        zIndex: '1',
        flexGrow: '1',
      },
      '.the-input-tag-text': {
        display: 'inline-block',
        verticalAlign: 'middle',
        padding: '2px'
      },
      '.the-input-tag-remover': {
        display: 'inline-block',
        verticalAlign: 'middle',
        padding: '2px',
        '.the-icon': {
          padding: '0'
        },
        '&:hover': {
          cursor: 'pointer'
        }
      },
      '.the-input-text-input': {
        backgroundColor: 'transparent',
        outline: 'none',
        border: 'none',
        boxShadow: 'none',
        minWidth: '48px',
        flexGrow: 1,
        width: 'auto'
      }
    })
  )
}

export default TheInputStyle
