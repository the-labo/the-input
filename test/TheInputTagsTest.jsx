/**
 * Test for TheInputTags.
 * Runs with mocha.
 */
'use strict'

import TheInputTags from '../lib/TheInputTags'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-input-tags', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputTags />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
