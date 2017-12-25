'use strict'

import React from 'react'
import c from 'classnames'
import TheInputText from './TheInputText'
import TheIcon from 'the-icon'
import { clone } from 'asobj'

class TheInputSearch extends React.PureComponent {
  constructor (props) {
    super(props)
    const s = this
    let {open = false} = props
    s.state = {
      open
    }
    s._focusTimer = -1
  }

  render () {
    const s = this
    const {props, state} = s
    let {value} = props
    let {open} = state
    return (
      <TheInputText {...props}
                    className={c('the-input-search', {
                      'the-input-search-open': open || !!value
                    })}
                    type={'search'}
                    inputRef={(input) => { s.input = input }}
                    onFocus={(e) => s.handleFocus()}
      >
        {!value && (
          <a className={c('the-input-search-toggle')}
             tabIndex={-1}
             onClick={() => s.toggleOpen()}
          >
            <TheIcon className={TheInputSearch.SEARCH_ICON}/>
          </a>
        )}
      </TheInputText>
    )
  }

  componentWillUnmount () {
    const s = this
    clearTimeout(s._focusTimer)
  }

  toggleOpen (open) {
    const s = this
    if (typeof open === 'undefined') {
      open = !s.state.open
    }
    if (open === s.state.open) {
      return
    }
    s.setState({open})
    clearTimeout(s._focusTimer)
    s._focusTimer = setTimeout(() => {
      if (open && s.input) {
        s.input.focus()
      }
    })
  }

  handleFocus (e) {
    const s = this
    const {props} = s
    let {onFocus} = props
    onFocus && onFocus(e)
    s.toggleOpen(true)
  }
}

TheInputSearch.SEARCH_ICON = 'fa fa-search'
TheInputSearch.propTypes = clone(TheInputText.propTypes, {without: ['type']})
TheInputSearch.defaultProps = clone(TheInputText.defaultProps, {without: ['type']})
TheInputSearch.displayName = 'TheInputSearch'

export default TheInputSearch
