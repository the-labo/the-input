/**
 * @module helpers
 */
'use strict'

export const normalizeOptions = (options) => [].concat(options)
  .filter(Boolean)
  .reduce((normalized, value) => {
    let isObject = typeof value === 'object'
    return Object.assign(normalized,
      isObject ? value : { [value]: value }
    )
  }, {})
