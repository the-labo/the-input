'use strict'

import React from 'react'
import { TheInput, TheInputStyle } from 'the-input'

class ExampleComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    const s = this
    s.state = {
      values: {}
    }
  }

  render () {
    const s = this
    let { values } = s.state
    const onUpdate = (values) => s.setState({ values })

    const { Text } = TheInput
    return (
      <div>
        <TheInputStyle/>
        <Text name='value01'
              value={values[ 'value01' ]}
              onUpdate={ onUpdate }
        />
      </div>

    )
  }
}

export default ExampleComponent
