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
    dominantColor = ThemeValues.dominantColor
  } = options
  return asStyleData('.the-input', {
    '': {}
  })
}

export default TheInputStyle
