/**
 * Test for TextStyleData.
 * Runs with mocha.
 */
'use strict'

import TextStyleData from '../lib/styleData/TextStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('text-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TextStyleData />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
