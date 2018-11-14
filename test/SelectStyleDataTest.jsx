/**
 * Test for SelectStyleData.
 * Runs with mocha.
 */
'use strict'

import SelectStyleData from '../lib/styleData/SelectStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('select-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <SelectStyleData />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
