/**
 * Test for UploadStyleData.
 * Runs with mocha.
 */
'use strict'

import UploadStyleData from '../lib/styleData/UploadStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('upload-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <UploadStyleData />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
