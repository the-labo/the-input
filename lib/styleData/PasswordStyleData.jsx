'use strict'

import { asStyleData } from 'the-component-util'

function PasswordStyleData({
                             ToggleIconStyle,
                           }){
  return asStyleData({
    '.the-input-password': {
      position: 'relative',
    },
    '.the-input-password-toggle': ToggleIconStyle({
      color: 'inherit',
      margin: '0 8px',
      textDecoration: 'none',
    }),
  })
}

export default PasswordStyleData
