'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { asStyleData, colorAlpha } from 'the-component-util'
import { TheStyle } from 'the-style'

/** Style for TheInput */
const TheInputStyle = ({className, id, options}) => (
  [
    <TheStyle {...{id}}
              className={c('the-input-style', className)}
              key='base'
              styles={TheInputStyle.data(options)}
    />,
    ...TheInputStyle.externals.map((src) => (
      <link className={c('the-input-style-external')}
            href={src}
            key={src}
            rel='stylesheet'
      />
    ))
  ]

)

TheInputStyle.displayName = 'TheInputStyle'
TheInputStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheInputStyle.defaultProps = {
  options: {},
}

TheInputStyle.externals = [
  'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css'
]
TheInputStyle.data = (options) => {
  const {ThemeValues} = TheStyle
  const {
    activeOpacity = ThemeValues.activeOpacity,
    animationDuration = 400,
    backgroundColor = ThemeValues.backgroundColor,
    contentPadding = ThemeValues.contentPadding,
    contentWidth = ThemeValues.contentWidth,
    dominantColor = ThemeValues.dominantColor,
    errorColor = ThemeValues.errorColor,
    handlePaddingRate = -20,
    hoverOpacity = ThemeValues.hoverOpacity,
    inputBorderColor = ThemeValues.inputBorderColor,
    inputShadowColor = ThemeValues.inputShadowColor,
    lightBorderColor = ThemeValues.lightBorderColor,
    lightTextColor = ThemeValues.lightTextColor,
    offLabelBackgroundColor = '#FAFAFA',
    sliderBarHeight = 4,
    sliderHandleSize = 24,
    sliderPadding = 6,
    tappableHeight = ThemeValues.tappableHeight,
    toggleHandleSize = 24,
    warnColor = ThemeValues.warnColor,
  } = options

  const ToggleIconStyle = (values) => Object.assign({
    '&:active': {opacity: activeOpacity},
    '&:hover': {opacity: hoverOpacity},
    alignItems: 'center',
    bottom: 0,
    cursor: 'pointer',
    display: 'inline-flex',
    height: '30px',
    justifyContent: 'center',
    minWidth: '1em',
    outlineColor: colorAlpha(dominantColor, 0.2),
    padding: '0 4px',
    position: 'absolute',
    right: 0,
    zIndex: 4,
  }, values)

  return Object.assign({},
    asStyleData('.the-input', {
      '&': {},
    }),
    asStyleData('.the-input-message', {
      '&': {
        display: 'block',
        fontSize: 'small',
        fontStyle: 'italic',
        margin: '0 0 -2px',
        maxHeight: '2em',
        overflow: 'hidden',
        padding: '4px 4px 0',
        transition: 'max-height 300ms',
      },
      '&.the-input-message-empty': {
        margin: 0,
        maxHeight: '0em',
        padding: 0,
      },
    }),
    asStyleData('.the-input-text', {
      '.the-input-text-input': {
        border: `1px solid ${inputBorderColor}`,
        borderRadius: '2px',
        boxShadow: `1px 1px 1px ${inputShadowColor} inset`,
        boxSizing: 'border-box',
        display: 'block',
        minHeight: '28px',
        outlineColor: dominantColor,
        padding: '4px 8px',
        width: '100%',
      },
      '.the-input-text-input-wrap': {
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'stretch',
        whiteSpace: 'nowrap',
      },
      '.the-input-text-option': {
        '&:last-child': {
          borderBottom: 'none',
        },
        '&.the-input-text-option-selected': {
          backgroundColor: colorAlpha(dominantColor, 0.2),
        },
        alignItems: 'center',
        backgroundColor: backgroundColor,
        borderBottom: `1px solid ${lightBorderColor}`,
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'flex-start',
        minHeight: tappableHeight,
        overflow: 'hidden',
        padding: contentPadding,
        textOverflow: 'ellipsis',
      },
      '.the-input-text-options': {
        backgroundColor,
        border: `1px solid ${lightBorderColor}`,
        borderRadius: '0 0 2px 2px',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.33)',
        boxSizing: 'border-box',
        left: 0,
        listStyle: 'none',
        margin: '-1px 0 0',
        maxHeight: '50vh',
        overflow: 'auto',
        padding: 0,
        position: 'absolute',
        right: 0,
        top: '100%',
        zIndex: 8,
      },
      '&': {
        boxSizing: 'border-box',
        display: 'inline-block',
        margin: '0 4px',
        maxWidth: contentWidth,
        position: 'relative',
        verticalAlign: 'middle',
        width: '100%',
      },
    }),
    asStyleData('.the-input-password', {
      '.the-input-password-toggle': ToggleIconStyle({
        color: 'inherit',
        textDecoration: 'none',
      }),
      '&': {
        position: 'relative',
      },
    }),
    asStyleData('.the-input-search', {
      '.the-input-search-toggle': ToggleIconStyle({
        color: dominantColor,
        outline: 'none',
        padding: '0 8px',
        transition: `opacity ${animationDuration}ms`,
      }),
      '.the-input-text-input': {
        opacity: 0,
        transition: `opacity ${animationDuration}ms`,
      },
      '&': {
        maxWidth: '2em',
        position: 'relative',
        transition: `max-width ${animationDuration}ms`,
      },
      '&.the-input-search-open': {
        '.the-input-search-toggle': {
          padding: '0 4px',
        },
        '.the-input-text-input': {
          opacity: 1,
        },
        maxWidth: contentWidth,
      },
    }),
    asStyleData('.the-input-textarea', {
      '.the-input-textarea-input': {
        border: `1px solid ${inputBorderColor}`,
        borderRadius: '2px',
        boxShadow: `1px 1px 1px ${inputShadowColor} inset`,
        boxSizing: 'border-box',
        display: 'block',
        outlineColor: dominantColor,
        padding: '4px 8px',
        resize: 'none',
        width: '100%',
      },
      '&': {
        boxSizing: 'border-box',
        display: 'inline-block',
        margin: '0 4px',
        maxWidth: contentWidth,
        position: 'relative',
        verticalAlign: 'middle',
        width: '100%',
      },
    }),
    asStyleData('.the-input-radio', {
      '.the-input-radio-icon': {
        color: dominantColor,
      },
      '.the-input-radio-item': {
        '&.the-input-radio-item-disabled': {
          '.the-input-radio-icon': {
            color: 'inherit',
          },
          opacity: '0.5',
          pointerEvents: 'none',
        },
        alignItems: 'center',
        boxSizing: 'border-box',
        display: 'inline-flex',
        justifyContent: 'center',
        margin: '0 2px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '.the-input-radio-label': {
        '&:active': {opacity: activeOpacity},
        '&:hover': {opacity: hoverOpacity},
        '> *': {// https://github.com/ftlabs/fastclick/issues/60
          pointerEvents: 'none',
        },
        cursor: 'pointer',
        display: 'inline-block',
        padding: '2px 4px',
      },
      '.the-input-radio-radio': {
        height: 1,
        left: 0,
        marginBottom: -1,
        marginRight: -1,
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        visibility: 'hidden',
        width: 1,
        zIndex: -1,

      },
      '&': {
        borderRadius: '2px',
        boxSizing: 'border-box',
        display: 'inline-block',
        margin: '0',
        maxWidth: contentWidth,
        position: 'relative',
        verticalAlign: 'middle',
        width: '100%',
      },
      '&.the-input-as-button': {
        '.the-input-radio-icon': {
          display: 'none',
        },
        '.the-input-radio-item': {
          background: backgroundColor,
          border: `1px solid #CCC`,
          borderRadius: '4px',
          fontSize: 'smaller',
          margin: '4px',
          padding: '4px 8px',
          textAlign: 'center',
        },
        '.the-input-radio-item-checked': {
          border: `2px solid ${dominantColor}`,
        },
      },
      '&.the-input-as-toggle': {
        '.the-input-radio-icon': {
          display: 'none',
        },
        '.the-input-radio-item': {
          '.the-input-radio-label': {
            boxSizing: 'border-box',
            padding: '6px 12px',
          },
          '&:first-child': {
            borderRadius: '4px 0 0 4px',
            marginLeft: '4px',
          },
          '&:last-child': {
            borderRadius: '0 4px 4px 0',
            marginRight: '4px',
          },
          '&.the-input-radio-item-checked': {
            backgroundColor: dominantColor,
            borderWidth: '1px',
            color: backgroundColor,
            position: 'relative',
            zIndex: 1,
          },
          background: backgroundColor,
          border: `1px solid #CCC`,
          borderRadius: '0',
          fontSize: 'smaller',
          margin: '4px -1px 4px 0',
          padding: '0',
          textAlign: 'center',
        },
        '.the-input-radio-item-checked': {
          border: `2px solid ${dominantColor}`,
        },
      },
      'the-input-radio-readonly-label': {
        display: 'inline-block',
        margin: '4px 0',
      },
    }),
    asStyleData('.the-input-checkbox', {
      '.the-input-checkbox-checkbox': {
        height: 1,
        left: 0,
        marginBottom: -1,
        marginRight: -1,
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        visibility: 'hidden',
        width: 1,
        zIndex: -1,

      },
      '.the-input-checkbox-icon': {
        color: dominantColor,
        minWidth: '1em',
      },
      '.the-input-checkbox-item': {
        '&.the-input-checkbox-item-disabled': {
          '.the-input-checkbox-icon': {
            color: 'inherit',
          },
          opacity: '0.5',
          pointerEvents: 'none',
        },
        alignItems: 'center',
        boxSizing:
          'border-box',
        display:
          'inline-flex',
        justifyContent:
          'flex-center',
        margin:
          '0 2px',
        overflow:
          'hidden',
        textOverflow:
          'ellipsis',
      },
      '.the-input-checkbox-label':
        {
          '&:active':
            {opacity: activeOpacity}
          ,
          '&:hover':
            {opacity: hoverOpacity}
          ,
          '> *':
            {// https://github.com/ftlabs/fastclick/issues/60
              pointerEvents: 'none',
            }
          ,
          cursor: 'pointer',
          display:
            'inline-block',
          padding:
            '2px 4px',
        }
      ,
      '&':
        {
          borderRadius: '2px',
          boxSizing:
            'border-box',
          display:
            'inline-block',
          margin:
            '0',
          maxWidth:
          contentWidth,
          position:
            'relative',
          verticalAlign:
            'middle',
          width:
            '100%',
        }
      ,
    }),
    asStyleData('.the-input-toggle', {
      '.the-input-toggle-handle': {
        backgroundColor: 'white',
        border: `1px solid ${inputBorderColor}`,
        borderRadius: '50%',
        display: 'inline-block',
        flexGrow: 0,
        flexShrink: 0,
        height: toggleHandleSize,
        position: 'relative',
        width: toggleHandleSize,
        zIndex: 4,
      },
      '.the-input-toggle-inner': {
        alignItems: 'center',
        backgroundColor: backgroundColor,
        border: `1px solid ${inputBorderColor}`,
        borderRadius: (toggleHandleSize / 2 + 1),
        display: 'inline-flex',
        height: toggleHandleSize,
        justifyContent: 'flex-start',
        minWidth: toggleHandleSize * 3 + 2,
        overflow: 'hidden',
        width: '100%',
      },
      '.the-input-toggle-label': {
        boxSizing: 'border-box',
        cursor: 'pointer',
        flexGrow: 1,
        flexShrink: 1,
        fontSize: '14px',
        height: '100%',
        lineHeight: `${toggleHandleSize}px`,
        overflow: 'hidden',
        padding: 0,
        textAlign: 'center',
        textOverflow: 'ellipsis',
        transition: `width ${animationDuration}ms`,
        whiteSpace: 'nowrap',
        width: '100%',
      },
      '.the-input-toggle-label-text': {
        boxSizing: 'border-box',
        display: 'inline-block',
        minWidth: toggleHandleSize * 1.5,
        overflow: 'hidden',
        padding: '0 8px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
      },
      '.the-input-toggle-off-label': {
        background: offLabelBackgroundColor,
        borderRadius: `0 ${toggleHandleSize / 2}px ${toggleHandleSize / 2}px 0`,
        boxShadow: `-2px 0 0 ${toggleHandleSize / 4}px ${offLabelBackgroundColor}`,
        color: '#AAA',
      },
      '.the-input-toggle-on-label': {
        background: dominantColor,
        borderRadius: `${toggleHandleSize / 2}px 0 0 ${toggleHandleSize / 2}px`,
        boxShadow: `2px 0 0 ${toggleHandleSize / 4}px ${dominantColor}`,
        color: 'white',
      },
      '.the-input-toggle-radio': {
        display: 'none',
      },
      '&': {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'inline-flex',
        justifyContent: 'center',
      },
      '&.the-input-toggle-off .the-input-toggle-on-label': {
        width: `0 !important`,
      },
      '&.the-input-toggle-on .the-input-toggle-off-label': {
        width: `0 !important`,
      },

    }),
    asStyleData('.the-input-select', {
      '.the-input-select-display': {
        alignItems: 'center',
        backgroundColor,
        border: `1px solid ${inputBorderColor}`,
        borderRadius: '2px',
        boxSizing: 'border-box',
        color: 'inherit',
        cursor: 'pointer',
        display: 'inline-flex',
        fontSize: 'smaller',
        justifyContent: 'space-between',
        maxWidth: contentWidth,
        minHeight: '28px',
        overflow: 'hidden',
        padding: '4px 2px 4px 8px',
        textOverflow: 'ellipsis',
        verticalAlign: 'middle',
        width: '100%',
      },
      '.the-input-select-display-alt': {
        color: lightTextColor,
        display: 'block',
        textAlign: 'left',
        width: '100%',
      },
      '.the-input-select-display-value': {},
      '.the-input-select-option': {
        '&:hover': {
          backgroundColor: colorAlpha(dominantColor, 0.1),
        },
        '&:last-child': {
          borderBottom: 'none',
        },
        '&.the-input-select-option-selected': {
          backgroundColor: colorAlpha(dominantColor, 0.2),
        },
        alignItems: 'center',
        backgroundColor: backgroundColor,
        borderBottom: `1px solid ${lightBorderColor}`,
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'flex-start',
        minHeight: tappableHeight,
        overflow: 'hidden',
        padding: `${contentPadding}px ${contentPadding * 2}px`,
        textOverflow: 'ellipsis',
      },
      '.the-input-select-options': {
        '.the-input-select-options-back': {
          display: 'none',
        },
        '&.the-input-select-options-full': {
          '.the-input-select-options-back': {
            bottom: 0,
            display: 'block',
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 40,
          },
          '.the-input-select-options-list': {
            '.the-input-select-option': {
              background: 'transparent',
              border: 'none',
              color: dominantColor,
              display: 'inline-block',
              flexGrow: '1',
              padding: '4px',
              textAlign: 'center',
            },
            background: 'white',
            border: '1px solid #FAFAFA',
            borderRadius: '4px',
            boxShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            boxSizing: 'border-box',
            display: 'inline-flex',
            flexWrap: 'wrap',
            margin: '24px',
            maxHeight: 'calc(100% - 48px)',
            maxWidth: '480px',
            overflow: 'scroll',
            padding: '16px',
            zIndex: 45,
          },
          alignItems: 'center',
          background: 'rgba(0,0,0,0.3)',
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          left: 0,
          maxHeight: '100vh',
          maxWidth: '100vw',
          position: 'fixed',
          right: 0,
          top: 0,
          zIndex: 44,
        },
        backgroundColor,
        border: `1px solid ${lightBorderColor}`,
        borderRadius: '0 0 2px 2px',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.33)',
        boxSizing: 'border-box',
        left: 0,
        margin: '-1px 0 0',
        maxHeight: '50vh',
        overflow: 'auto',
        padding: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 8,
      },
      '.the-input-select-options-list': {
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },
      '.the-input-select-select,.the-input-select-input': {
        display: 'block',
        height: '1px',
        opacity: '0',
        overflow: 'hidden',
        position: 'absolute',
        width: '1px',
        zIndex: '-99',
      },
      '&': {
        boxSizing: 'border-box',
        display: 'inline-block',
        maxWidth: contentWidth,
        position: 'relative',
        verticalAlign: 'middle',
        width: '100%',
      },
    }),
    asStyleData('.the-input-warn', {
      '.the-input-select-display': {
        borderColor: warnColor,
      },
      '.the-input-text-input,.the-input-textarea-input,.the-input-date-input': {
        borderColor: warnColor,
      },
      '.the-input-warn-message': {
        color: warnColor,
      },
      '&.the-input-radio,&.the-input-checkbox': {
        border: `1px solid ${warnColor}`,
      },
    }),
    asStyleData('.the-input-error', {
      '.the-input-error-message': {
        color: errorColor,
      },
      '.the-input-select-display': {
        borderColor: errorColor,
      },
      '.the-input-text-input,.the-input-textarea-input,.the-input-date-input': {
        borderColor: errorColor,
      },
      '&.the-input-radio,&.the-input-checkbox': {
        border: `1px solid ${errorColor}`,
      },
    }),
    asStyleData('.the-input-slider', {
      '.the-input-slider-bar': {
        height: `${sliderBarHeight + sliderPadding}px`,
        left: 0,
        position: 'absolute',
        right: 0,
        top: `${sliderHandleSize / 2 - sliderPadding}px`,
      },
      '.the-input-slider-bar-bg': {
        backgroundColor: '#CCC',
        border: '1px solid #BBB',
        borderRadius: sliderBarHeight / 2,
        height: `${sliderBarHeight}px`,
        left: 0,
        position: 'absolute',
        right: 0,
        top: `${sliderPadding}px`,
      },
      '.the-input-slider-bar-highlight': {
        backgroundColor: dominantColor,
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: sliderBarHeight / 2,
        height: sliderBarHeight,
        maxWidth: '100%',
        position: 'absolute',
        top: sliderPadding,
      },
      '.the-input-slider-bar-tap': {
        bottom: -8,
        display: 'block',
        left: 0,
        position: 'absolute',
        right: 0,
        top: -8,
        zIndex: 1,
      },
      '.the-input-slider-bar-wrap': {
        boxSizing: 'border-box',
        display: 'block',
        position: 'relative',
        width: '100%',
      },
      '.the-input-slider-handle': {
        '.the-input-slider-handle-area': {
          bottom: `${handlePaddingRate}%`,
          color: 'transparent',
          display: 'inline-block',
          left: `${handlePaddingRate}%`,
          opacity: 0,
          position: 'absolute',
          right: `${handlePaddingRate}%`,
          top: `${handlePaddingRate}%`,
        },
        '.the-input-slider-handle-icon': {
          '.the-input-slider-label': {
            boxSizing: 'border-box',
            display: 'inline-block',
            fontSize: '14px',
            lineHeight: `${sliderHandleSize}px`,
            minWidth: '24px',
            padding: '2px 4px',
            textAlign: 'right',
          },
          '&:hover': {
            boxShadow: '1px 1px 3px rgba(0,0,0,0.5)',
          },
          backgroundColor: 'white',
          border: '1px solid #DDD',
          borderRadius: '50%',
          boxShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          display: 'inline-block',
          height: `${sliderHandleSize}px`,
          position: 'relative',
          width: `${sliderHandleSize}px`,
          zIndex: 3,
        },
        '&:active': {
          backgroundColor: '#FCFCFC',
          cursor: '-webkit-grabbing',
        },
        borderRadius: '50%',
        cursor: '-webkit-grab',
        display: 'inline-block',
        position: 'relative',
        zIndex: 4,
      },
      '.the-input-slider-inner': {
        display: 'flex',
        margin: '2px 0',
      },
      '&': {
        height: `${sliderHandleSize + 2}px`,
        position: 'relative',
      },
    }),
    asStyleData('.the-input-range', {
      '.the-input-range-bar': {
        height: `${sliderBarHeight + sliderPadding}px`,
        left: 0,
        position: 'absolute',
        right: 0,
        top: `${sliderHandleSize / 2 - sliderPadding}px`,
      },
      '.the-input-range-bar-bg': {
        backgroundColor: '#CCC',
        border: '1px solid #BBB',
        borderRadius: sliderBarHeight / 2,
        height: `${sliderBarHeight}px`,
        left: 0,
        position: 'absolute',
        right: 0,
        top: `${sliderPadding}px`,
      },
      '.the-input-range-bar-highlight': {
        backgroundColor: dominantColor,
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: sliderBarHeight / 2,
        height: sliderBarHeight,
        maxWidth: '100%',
        position: 'absolute',
        top: sliderPadding,
      },
      '.the-input-range-bar-tap': {
        bottom: -8,
        display: 'block',
        left: 0,
        position: 'absolute',
        right: 0,
        top: -8,
        zIndex: 1,
      },
      '.the-input-range-bar-wrap': {
        boxSizing: 'border-box',
        display: 'block',
        position: 'relative',
        width: '100%',
      },
      '.the-input-range-handle': {
        '.the-input-range-handle-area': {
          bottom: `${handlePaddingRate}%`,
          color: 'transparent',
          display: 'inline-block',
          left: `${handlePaddingRate}%`,
          opacity: 0,
          position: 'absolute',
          right: `${handlePaddingRate}%`,
          top: `${handlePaddingRate}%`,
        },
        '.the-input-range-handle-icon': {
          '.the-input-range-label': {
            boxSizing: 'border-box',
            display: 'inline-block',
            fontSize: '14px',
            lineHeight: `${sliderHandleSize}px`,
            minWidth: '24px',
            padding: '2px 4px',
            textAlign: 'right',
          },
          '&:hover': {
            boxShadow: '1px 1px 3px rgba(0,0,0,0.5)',
          },
          backgroundColor: 'white',
          border: '1px solid #DDD',
          borderRadius: '50%',
          boxShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          display: 'inline-block',
          height: `${sliderHandleSize}px`,
          position: 'relative',
          width: `${sliderHandleSize}px`,
          zIndex: 3,
        },
        '&:active': {
          backgroundColor: '#FCFCFC',
          cursor: '-webkit-grabbing',
          zIndex: 5,
        },
        borderRadius: '50%',
        cursor: '-webkit-grab',
        display: 'inline-block',
        left: 0,
        position: 'absolute',
        zIndex: 4,
      },
      '.the-input-range-inner': {
        display: 'flex',
        margin: '2px 0',
      },
      '&': {
        height: `${sliderHandleSize + 2}px`,
        position: 'relative',
      },
    }),
    asStyleData('.the-input-upload', {
      '.the-input-upload-aligner': {
        boxSizing: 'border-box',
        display: 'inline-block',
        height: '100%',
        marginRight: '-1px',
        verticalAlign: 'middle',
        width: '1px',
      },
      '.the-input-upload-close': {
        '&:active': {
          boxShadow: 'none',
          color: '#555',
          opacity: 1,
        },
        '&:hover': {
          boxShadow: 'none',
          color: '#555',
          opacity: 1,
        },
        background: 'rgba(255,255,255,0.2)',
        border: 'none',
        borderRadius: 0,
        color: '#AAA',
        display: 'inline-block',
        fontSize: '24px',
        margin: 0,
        padding: '8px',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 5,
      },
      '.the-input-upload-icon': {
        display: 'block',
        fontSize: '2em',
      },
      '.the-input-upload-input': {
        cursor: 'pointer',
        display: 'inline-block',
        opacity: 0,
        position: 'relative',
        zIndex: 2,
      },
      '.the-input-upload-label': {
        backgroundColor: `${backgroundColor}`,
        border: '1px solid #CCC',
        borderRadius: '2px',
        bottom: 0,
        boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.33)',
        boxSizing: 'border-box',
        left: 0,
        pointerEvents: 'none',
        position: 'absolute',
        right: 0,
        textAlign: 'center',
        top: 0,
        zIndex: 1,
      },
      '.the-input-upload-label-inner': {
        display: 'inline-block',
        verticalAlign: 'middle',
      },
      '.the-input-upload-preview': {
        border: '1px solid #AAA',
        bottom: 0,
        boxSizing: 'border-box',
        display: 'inline-block',
        left: 0,
        pointerEvents: 'none',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 4,
      },
      '.the-input-upload-preview-img': {
        objectFit: 'contain',
      },
      '.the-input-upload-spin': {},
      '.the-input-upload-text': {},
      '&': {
        '&:active': {
          color: '#777',
          opacity: 1,
          textShadow: 'none',
        },
        '&:hover': {
          color: '#555',
        },
        color: '#888',
        display: 'inline-block',
        overflow: 'hidden',
        position: 'relative',
      },
      '&.the-input-upload-read-only': {
        '.the-input-upload-input': {
          pointerEvents: 'none',
        },
      },
    }),
    asStyleData('.the-input-tag', {
      '.the-input-tag-remover': {
        '.the-icon': {
          padding: '0',
        },
        '&:hover': {
          cursor: 'pointer',
        },
        display: 'inline-block',
        padding: '2px',
        verticalAlign: 'middle',
      },
      '.the-input-tag-tag': {
        alignItems: 'center',
        backgroundColor: colorAlpha(dominantColor, 0.2),
        borderRadius: '2px',
        color: dominantColor,
        display: 'inline-flex',
        flexGrow: '1',
        fontSize: 'small',
        justifyContent: 'space-between',
        margin: '2px',
        overflow: 'hidden',
        padding: '0 2px',
        position: 'relative',
        zIndex: '1',
      },
      '.the-input-tag-text': {
        display: 'inline-block',
        overflow: 'hidden',
        padding: '2px',
        textOverflow: 'ellipsis',
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
      },
      '.the-input-text-input': {
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        flexGrow: 1,
        minWidth: '48px',
        outline: 'none',
        width: 'auto',
      },
      '&': {
        alignItems: 'center',
        backgroundColor: backgroundColor,
        border: `1px solid ${inputBorderColor}`,
        boxShadow: `1px 1px 1px ${inputShadowColor} inset`,
        boxSizing: 'border-box',
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        overflow: 'auto',
        padding: '4px',
      },
      '&.the-input-tag-focused': {
        outline: `5px auto ${dominantColor}`,
        outlineOffset: '-2px',
      },
    }),
    asStyleData('.the-input-date', {
      '.the-input-date-input': {
        border: `1px solid ${inputBorderColor}`,
        borderRadius: '2px',
        boxShadow: `1px 1px 1px ${inputShadowColor} inset`,
        boxSizing: 'border-box',
        display: 'block',
        minHeight: '28px',
        outlineColor: dominantColor,
        padding: '4px 8px',
        width: 'auto',
      },
      '&': {
        boxSizing: 'border-box',
        display: 'inline-block',
        margin: '0 4px',
        maxWidth: contentWidth,
        position: 'relative',
        verticalAlign: 'middle',
        width: '100%',
      },
    }),
    asStyleData('.the-input-pin-code', {
      '.the-input-pin-code-display': {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '4px auto',
        maxWidth: contentWidth,
      },
      '.the-input-pin-code-item': {
        '&.the-input-pin-code-item-selected': {
          outline: `5px auto ${dominantColor}`,
        },
        alignItems: 'center',
        background: 'white',
        border: '1px solid #DDD',
        borderRadius: '9px',
        boxSizing: 'border-box',
        display: 'inline-flex',
        fontSize: '36px',
        height: '64px',
        justifyContent: 'center',
        textAlign: 'center',
        width: '48px',
      },
      '.the-input-text-input-wrap': {
        height: '1px',
        left: 0,
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        width: '1px',
      },
      '&': {
        position: 'relative',
      },
    })
  )
}

export default TheInputStyle
