/**
 * @module helpers
 */
'use strict'

import React from 'react'

export const normalizeOptions = (options) => [].concat(options)
  .filter(Boolean)
  .reduce((normalized, value) => {
    let isObject = typeof value === 'object'
    return Object.assign(normalized,
      isObject ? value : { [value]: value }
    )
  }, {})

export const normalizeArrayValue = (values, splitter = ',') => [].concat(values)
  .filter(Boolean)
  .reduce((normzlied, value) => {
    if (typeof value === 'string') {
      return normzlied.concat(value.split(splitter))
    }
    return normzlied.concat(value)
  }, [])

export const renderErrorMessage = (error) => {
  if (!error) {
    return null
  }
  if (typeof error === 'string') {
    error = { message: error }
  }
  return (
    <span className='the-input-error-message'>{error.message}</span>
  )
}
