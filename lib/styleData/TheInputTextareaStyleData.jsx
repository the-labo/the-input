'use strict'

import { asStyleData } from 'the-component-util'

function TheInputTextareaStyleData ({
                                      contentWidth,
                                      dominantColor,
                                      inputBorderColor,
                                      inputShadowColor,
                                    }) {
  return asStyleData('.the-input-textarea', {
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
  })
}

export default TheInputTextareaStyleData
