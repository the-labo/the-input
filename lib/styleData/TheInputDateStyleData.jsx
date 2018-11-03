/**
 * @function TheInputDateStyleData
 */
'use strict'

import { asStyleData } from 'the-component-util'

/** @lends TheInputDateStyleData */
function TheInputDateStyleData ({
                                  contentWidth,
                                  dominantColor,
                                  inputBorderColor,
                                  inputShadowColor,
                                }) {
  return asStyleData('.the-input-date', {
    '.the-input-date-input': {
      border: `1px solid ${inputBorderColor}`,
      borderRadius: '2px',
      boxShadow: `1px 1px 1px ${inputShadowColor} inset`,
      boxSizing: 'border-box',
      display: 'block',
      lineHeight: '20px',
      maxWidth: '100%',
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
    },
  })
}

export default TheInputDateStyleData
