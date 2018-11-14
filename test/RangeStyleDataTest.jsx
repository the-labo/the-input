/**
 * Test for RangeStyleData.
 * Runs with mocha.
 */
'use strict'

import RangeStyleData from '../lib/styleData/RangeStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('range-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <RangeStyleData />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
