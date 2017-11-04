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
    const {values} = s.state
    const onUpdate = (values) => {
      s.setState({
        values: Object.assign({}, s.state.values, values)
      })
    }

    const {
      Text,
      Password,
      Search,
      TextArea,
      Radio,
      Checkbox,
      Select,
      Toggle,
      Slider,
      Range
    } = TheInput
    return (
      <div>
        <TheInputStyle/>

        <h3>Text</h3>

        <Text name='value01'
              value={values['value01']}
              onUpdate={onUpdate}
              placeholder='value01'
              options={['Banana', 'Orange', 'Apple']}
        />

        <h3>Text with hint</h3>

        <Text name='value01'
              value={values['value01']}
              onUpdate={onUpdate}
              placeholder='eg: hoge@example.com'
              pattern={Text.EMAIL_PATTERN}
              patternHint='Needs to be email'
        />

        <br/>

        <Search name='value01'
                value={values['value01']}
                onUpdate={onUpdate}
                placeholder='value01'
        />


        <br/>

        <Password name='value01'
                  value={values['value01']}
                  onUpdate={onUpdate}
                  placeholder='value01'
        />

        <br/>

        <TextArea name='value01'
                  value={values['value01']}
                  onUpdate={onUpdate}
                  placeholder='value01'
        />

        <hr/>

        <h3>Radio</h3>

        <div>
          <Radio name='value02'
                 value={values['value02']}
                 onUpdate={onUpdate}
                 options={['Car', 'Ship', 'Plane']}
          />
        </div>

        <div>

          <Radio name='value02'
                 value={values['value02']}
                 onUpdate={onUpdate}
                 options={['Car', 'Ship', 'Plane']}
                 asButton
          />

        </div>

        <hr/>

        <h3>Checkbox</h3>

        <div>
          <Checkbox name='value03'
                    value={values['value03']}
                    onUpdate={onUpdate}
                    options={['Green', 'Pink', 'Brown']}
          />
        </div>


        <h3>Select</h3>

        <div>
          <Select name='value04'
                  placeholder='Any drink?'
                  value={values['value04']}
                  onUpdate={onUpdate}
                  sorter={(a, b) => a.localeCompare(b)}
                  options={['Tea', 'Coffee', 'Water']}
          />
        </div>

        <h3>Toggle</h3>

        <div>
          <Toggle name='value05'
                  on={Boolean(values['value05'])}
                  onUpdate={onUpdate}
          />
        </div>

        <div>
          <Toggle name='value05'
                  on={Boolean(values['value05'])}
                  onTitle='This is on'
                  offTitle='This is off'
                  onUpdate={onUpdate}
          />
        </div>

        <div>
          <Slider name='value06'
                  value={values['value06'] || 10}
                  min={0}
                  max={100}
                  step={1}
                  onUpdate={onUpdate}
          />
        </div>

        <div>
          <Range name='value07'
                 value={values['value07'] || [10, 80]}
                 min={0}
                 max={100}
                 step={1}
                 onUpdate={onUpdate}
          />
        </div>

        <br/>
        <br/>
        <br/>

        <h3>Error</h3>

        <TheInput name='@'
                  type='hidden'
                  error='This is global error'/>

        <Text name='value01'
              value={values['value01']}
              onUpdate={onUpdate}
              placeholder='value01'
              options={['Banana', 'Orange', 'Apple']}
              error='Something Wrong with This!'
        />

        <Password name='value01'
                  value={values['value01']}
                  onUpdate={onUpdate}
                  placeholder='value01'
                  error='Something Wrong with This!'
        />

        <TextArea name='value01'
                  value={values['value01']}
                  onUpdate={onUpdate}
                  placeholder='value01'
                  error='Something Wrong with This!'
                  onKeyDown={(e) => console.log('key down', e.keyCode)}
        />

        <Select name='value04'
                value={values['value04']}
                onUpdate={onUpdate}
                options={['Tea', 'Coffee', 'Water']}
                error='Something Wrong with This!'
        />

        <Radio name='value02'
               value={values['value02']}
               onUpdate={onUpdate}
               options={['Car', 'Ship', 'Plane']}
               error='Something Wrong with This!'
        />
        <Checkbox name='value03'
                  value={values['value03']}
                  onUpdate={onUpdate}
                  options={['Green', 'Pink', 'Brown']}
                  error='Something Wrong with This!'
        />
      </div>

    )
  }
}

export default ExampleComponent
