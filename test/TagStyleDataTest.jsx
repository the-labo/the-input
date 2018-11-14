/**
 * Test for TagStyleData.
 * Runs with mocha.
 */
'use strict'

import TagStyleData from '../lib/styleData/TagStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('tag-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TagStyleData />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
