/**
 * Test for SearchStyleData.
 * Runs with mocha.
 */
'use strict'

import SearchStyleData from '../lib/styleData/SearchStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('search-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <SearchStyleData />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
