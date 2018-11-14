/**
 * Test for PasswordStyleData.
 * Runs with mocha.
 */
'use strict'

import PasswordStyleData from '../lib/styleData/PasswordStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('password-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <PasswordStyleData />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
