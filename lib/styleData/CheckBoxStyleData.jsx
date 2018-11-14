'use strict'

import { asStyleData } from 'the-component-util'

function CheckBoxStyleData ({
                                      activeOpacity,
                                      contentWidth,
                                      dominantColor,
                                      hoverOpacity,
                                    }) {
  return asStyleData({
    '.the-input-checkbox': {
      borderRadius: '2px',
      boxSizing: 'border-box',
      display: 'inline-block',
      margin: '0',
      maxWidth: contentWidth,
      position: 'relative',
      verticalAlign: 'middle',
      width: '100%',
    },
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
    '.the-input-checkbox-label': {
      '&:active': { opacity: activeOpacity }
      ,
      '&:hover': { opacity: hoverOpacity }
      ,
      '> *': { // https://github.com/ftlabs/fastclick/issues/60
        pointerEvents: 'none',
      },
      cursor: 'pointer',
      display:
        'inline-block',
      padding:
        '2px 4px',
    },
  })
}

export default CheckBoxStyleData
