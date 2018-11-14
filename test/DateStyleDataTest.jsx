/**
 * Test for DateStyleData.
 * Runs with mocha.
 */
'use strict'

import DateStyleData from '../lib/styleData/DateStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('date-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <DateStyleData />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
