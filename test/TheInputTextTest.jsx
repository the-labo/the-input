/**
 * Test for TheInputText.
 * Runs with mocha.
 */
'use strict'

import TheInputText from '../lib/TheInputText'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-input-text', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputText />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
