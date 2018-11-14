/**
 * Test for CheckBoxStyleData.
 * Runs with mocha.
 */
'use strict'

import CheckBoxStyleData from '../lib/styleData/CheckBoxStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('check-box-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <CheckBoxStyleData />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
