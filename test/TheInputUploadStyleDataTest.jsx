/**
 * Test for TheInputUploadStyleData.
 * Runs with mocha.
 */
'use strict'

import UploadStyleData from '../lib/styleData/TheInputUploadStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-input-upload-style-data', () => {
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
