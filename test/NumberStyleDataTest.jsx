/**
 * Test for NumberStyleData.
 * Runs with mocha.
 */
'use strict'

import NumberStyleData from '../lib/styleData/NumberStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('number-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <NumberStyleData />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
