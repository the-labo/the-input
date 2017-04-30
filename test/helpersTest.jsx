/**
 * Test for helpers.
 * Runs with mocha.
 */
'use strict'

import Helpers from '../lib/helpers'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('helpers', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <Helpers />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
