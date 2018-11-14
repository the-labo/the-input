/**
 * Test for PinCodeStyleData.
 * Runs with mocha.
 */
'use strict'

import PinCodeStyleData from '../lib/styleData/PinCodeStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('pin-code-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <PinCodeStyleData />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
