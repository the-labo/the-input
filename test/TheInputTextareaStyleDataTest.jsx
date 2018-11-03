/**
 * Test for TheInputTextareaStyleData.
 * Runs with mocha.
 */
'use strict'

import TheInputTextareaStyleData from '../lib/styleData/TheInputTextareaStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-input-textarea-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputTextareaStyleData />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
