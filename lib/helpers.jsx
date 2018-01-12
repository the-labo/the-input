/**
 * @module helpers
 */
'use strict'

import React from 'react'
import path from 'path'
import { get } from 'the-window'

export const normalizeOptions = (options) => [].concat(options)
  .filter(Boolean)
  .reduce((normalized, value) => {
    let isObject = typeof value === 'object'
    return Object.assign(normalized,
      isObject ? value : {[value]: value}
    )
  }, {})

export function normalizeArrayValue (values, splitter = ',') {
  return [].concat(values)
    .filter(Boolean)
    .reduce((normzlied, value) => {
      if (typeof value === 'string') {
        return normzlied.concat(value.split(splitter))
      }
      return normzlied.concat(value)
    }, [])
}

export function renderErrorMessage (error) {
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

export function renderWarningMessage (warning) {
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

export async function readFile (file) {
  const FileReader = get('FileReader')
  return new Promise((resolve, reject) => {
    const reader = new FileReader
    reader.onerror = (err) => reject(err)
    reader.onload = (ev) => resolve(ev.target.result)
    reader.readAsDataURL(file)
  })
}

export function isImageUrl (url) {
  const imageExtensions = [
    '.jpg',
    '.jpeg',
    '.svg',
    '.gif',
    '.png'
  ]
  return /^data:image/.test(url) || !!~imageExtensions.indexOf(path.extname(url))
}

export default {
  normalizeOptions,
  normalizeArrayValue,
  renderErrorMessage,
  renderWarningMessage,
  readFile,
  isImageUrl
}