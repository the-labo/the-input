/**
 * Test for SliderStyleData.
 * Runs with mocha.
 */
'use strict'

import SliderStyleData from '../lib/styleData/SliderStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('slider-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <SliderStyleData />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
