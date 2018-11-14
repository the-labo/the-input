/**
 * Test for ToggleStyleData.
 * Runs with mocha.
 */
'use strict'

import ToggleStyleData from '../lib/styleData/ToggleStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('toggle-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <ToggleStyleData />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
