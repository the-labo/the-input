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
      isObject ? value : {[value]: value}
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
    return <span className='the-input-message the-input-message-empty'/>
  }
  if (typeof error === 'string') {
    error = {message: error}
  }
  return (
    <span className='the-input-message the-input-error-message'>{error.message}</span>
  )
}

export const renderWarningMessage = (warning) => {
  if (!warning) {
    return <span className='the-input-message the-input-message-empty'/>
  }
  if (typeof warning === 'string') {
    warning = {message: warning}
  }
  return (
    <span className='the-input-message the-input-warn-message'>{warning.message}</span>
  )
}