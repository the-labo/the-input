/**
 * Test for RadioStyleData.
 * Runs with mocha.
 */
'use strict'

import RadioStyleData from '../lib/styleData/RadioStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('radio-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <RadioStyleData />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
